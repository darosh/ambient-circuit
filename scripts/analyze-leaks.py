#!/usr/bin/env python3
"""Heap leak analysis for Ambient Circuit.
Usage: python3 scripts/analyze-leaks.py [snapshot.heapsnapshot]
Default: .heap-snapshots/LEAKS.heapsnapshot
"""

import sys
import json
import os
from collections import defaultdict, deque

path = sys.argv[1] if len(sys.argv) > 1 else '.heap-snapshots/LEAKS.heapsnapshot'
size_mb = os.path.getsize(path) / 1024 / 1024
print(f'Loading {path} ({size_mb:.1f} MB)...')

with open(path, 'rb') as f:
    data = f.read()
print('Parsing JSON...')
snap = json.loads(data)
del data

nodes = snap['nodes']
edges = snap['edges']
strings = snap['strings']
meta = snap['snapshot']['meta']

# --- Field offsets ---
nf = meta['node_fields']
N = len(nf)
nType = nf.index('type')
nName = nf.index('name')
nSelfSize = nf.index('self_size')
nEdgeCount = nf.index('edge_count')
nodeTypes = meta['node_types'][0]

ef = meta['edge_fields']
E = len(ef)
eType = ef.index('type')
eName = ef.index('name_or_index')
eToNode = ef.index('to_node')
edgeTypes = meta['edge_types'][0]

nodeCount = len(nodes) // N
edgeCount = len(edges) // E
print(f'Nodes: {nodeCount:,}  Edges: {edgeCount:,}  Strings: {len(strings):,}')

def node_name(i): return strings[nodes[i * N + nName]]
def node_type(i): return nodeTypes[nodes[i * N + nType]]
def node_size(i): return nodes[i * N + nSelfSize]

# --- Build edge start index ---
print('Building edge index...')
edge_start = [0] * (nodeCount + 1)
idx = 0
for i in range(nodeCount):
    edge_start[i] = idx
    idx += nodes[i * N + nEdgeCount]
edge_start[nodeCount] = idx

# Determine owning node for edge e (binary search)
def edge_owner(e):
    lo, hi = 0, nodeCount - 1
    while lo < hi:
        mid = (lo + hi + 1) >> 1
        if edge_start[mid] <= e:
            lo = mid
        else:
            hi = mid - 1
    return lo

# --- Build retainer graph ---
print('Building retainer graph...')
retainers = defaultdict(list)  # to_node_idx -> [(from_node_idx, edge_label)]

for e in range(edgeCount):
    base = e * E
    to_idx = edges[base + eToNode] // N
    from_idx = edge_owner(e)
    et = edgeTypes[edges[base + eType]]
    en_raw = edges[base + eName]
    if et in ('element', 'hidden'):
        en = f'[{en_raw}]'
    else:
        en = strings[en_raw] if en_raw < len(strings) else f'[{en_raw}]'
    retainers[to_idx].append((from_idx, f'.{en}({et})'))

# --- Scene IDs ---
ALL_SCENES = [
    'scene-test', 'scene-structure', 'scene-rings', 'scene-instruments',
    'scene-orientation', 'scene-logic', 'scene-easing', 'scene-collisions',
    'scene-create-destroy', 'scene-rail-switch', 'scene-ctx-test',
    'scene-global-beat', 'scene-audio', 'scene-sampler-pad-deeper', 'scene-sampler-pad',
    'scene-multi-columns', 'scene-marbles', 'scene-rails', 'scene-crossing',
    'scene-reverse', 'scene-active-visible', 'scene-inactive-rails',
]
CURRENT = 'scene-sampler-pad-deeper'

import re as _re
_SCENE_RE = _re.compile(r'scene-[a-z0-9]+(?:-[a-z0-9]+)*')

def extract_scene(name):
    # First try known list
    for sid in ALL_SCENES:
        if sid != CURRENT and sid in name:
            return sid
    # Fallback: any scene-* pattern in the name that isn't current
    m = _SCENE_RE.search(name)
    if m:
        sid = m.group(0)
        if sid != CURRENT:
            return sid
    return None

# --- BFS shortest retainer path ---
def is_root(i):
    return i == 0 or not retainers[i] or node_type(i) in ('(GC roots)', 'synthetic')

def shortest_path(target, max_depth=6):
    visited = {target}
    q = deque([(target, [])])
    while q:
        idx, path = q.popleft()
        if is_root(idx) or len(path) >= max_depth:
            return path
        for (fr, label) in retainers[idx]:
            if fr in visited:
                continue
            visited.add(fr)
            step = f'{node_type(fr)}[{node_name(fr)}]{label}'
            q.append((fr, path + [step]))
    return None

# --- Find leaked objects by scene ID in name ---
print('\nSearching for leaked scene objects...')
leaked_by_scene = defaultdict(list)
for i in range(nodeCount):
    name = node_name(i)
    sid = extract_scene(name)
    if sid:
        leaked_by_scene[sid].append({'idx': i, 'name': name, 'type': node_type(i), 'size': node_size(i)})

# --- Broad type counts ---
# node_name() gives constructor name (e.g. 'BufferGeometry')
# node_type() gives V8 category ('object', 'string', etc.) — NOT the constructor
LEAKED_CONSTRUCTORS = {
    'BufferGeometry', '_BufferGeometry', 'Material', 'MeshBasicNodeMaterial', 'MeshStandardMaterial',
    'MeshBasicMaterial', 'MeshPhysicalMaterial', 'ShaderMaterial', 'Texture',
    'RenderObject',  # WebGPU renderer internal
}
broad = defaultdict(lambda: {'count': 0, 'size': 0, 'samples': []})
for i in range(nodeCount):
    constructor = node_name(i)
    if constructor not in LEAKED_CONSTRUCTORS:
        continue
    t = node_type(i)
    key = constructor
    g = broad[key]
    g['count'] += 1
    g['size'] += node_size(i)
    if len(g['samples']) < 2:
        g['samples'].append(i)
    g['_type'] = t
    g['_name'] = constructor

# Also search for BufferGeometry instances by geometry name (scene-* in .name property)
# These are found via object nodes named 'BufferGeometry' — check their children for 'name'
print('Searching for leaked BufferGeometry by geometry name...')
# Build: for each BufferGeometry node, find its .name string child
geo_by_scene = defaultdict(list)
for i in range(nodeCount):
    if node_name(i) not in ('BufferGeometry', '_BufferGeometry'):
        continue
    # scan outgoing edges for 'name' property
    es = edge_start[i]
    ee = edge_start[i + 1]
    for e in range(es, ee):
        base = e * E
        et = edgeTypes[edges[base + eType]]
        en_raw = edges[base + eName]
        en = strings[en_raw] if et not in ('element', 'hidden') and en_raw < len(strings) else None
        if en == 'name':
            to_idx = edges[base + eToNode] // N
            geo_name = node_name(to_idx)
            sid = extract_scene(geo_name)
            if sid:
                geo_by_scene[sid].append({'idx': i, 'geo_name': geo_name, 'size': node_size(i)})
            break

def fmt(n):
    if n >= 1024*1024: return f'{n/1024/1024:.1f} MB'
    if n >= 1024: return f'{n//1024} KB'
    return f'{n} B'

# ─── REPORT ──────────────────────────────────────────────────────────────────

print()
print('═' * 60)
print('LEAKED OBJECTS BY SCENE ID (in node name)')
print('═' * 60)

if not leaked_by_scene:
    print('(none found — geometry names may not embed scene IDs)')
else:
    for sid, items in sorted(leaked_by_scene.items(), key=lambda x: -len(x[1])):
        total = sum(x['size'] for x in items)
        print(f'\n── {sid}  ({len(items)} objects, {fmt(total)}) ──')
        for x in items[:5]:
            print(f'  [{x["type"]}] {x["name"]}')
            path = shortest_path(x['idx'])
            if path:
                for step in path:
                    print(f'    ← {step}')
            else:
                print('    ← (root or no path)')
        if len(items) > 5:
            print(f'  ... and {len(items)-5} more')

print()
print('═' * 60)
print('LEAKED BUFFERGEOMETRY BY .name (scene-* from other scenes)')
print('═' * 60)

if not geo_by_scene:
    print('(none found)')
else:
    for sid, items in sorted(geo_by_scene.items(), key=lambda x: -len(x[1])):
        total = sum(x['size'] for x in items)
        print(f'\n── {sid}  ({len(items)} geometries, {fmt(total)}) ──')
        for x in items[:5]:
            print(f'  BufferGeometry "{x["geo_name"]}" (node #{x["idx"]})')
            path = shortest_path(x['idx'])
            if path:
                for step in path:
                    print(f'    ← {step}')
            else:
                print('    ← (root or no path)')
        if len(items) > 5:
            print(f'  ... and {len(items)-5} more')

print()
print('═' * 60)
print('ALL GEOMETRY/MATERIAL INSTANCES (broad, by count)')
print('═' * 60)

sorted_broad = sorted(broad.values(), key=lambda g: -g['count'])
print('\nTop 20:')
for g in sorted_broad[:20]:
    print(f'  {g["count"]:5d}x  [{g["_type"]}] "{g["_name"]}"  {fmt(g["size"])}')

print()
print('═' * 60)
print('RETAINER CHAINS — top 3 geometry/material groups')
print('═' * 60)

for g in sorted_broad[:3]:
    print(f'\n[{g["_type"]}] "{g["_name"]}" — {g["count"]} instances')
    for idx in g['samples']:
        print(f'  Node #{idx}:')
        path = shortest_path(idx)
        if path:
            for step in path:
                print(f'    ← {step}')
        else:
            print('    ← (root or no path)')

print('\nDone.')
