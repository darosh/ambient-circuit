import type { SceneConfig } from '../lib/core/scene'

import { scene as sceneTest, floatingScenes } from './scene-test'
import { scene as sceneInstruments } from './scene-instruments'
import { scene as sceneMarbles } from './scene-marbles'
import { scene as sceneRails } from './scene-rails'
import { scene as sceneOrientation } from './scene-orientation'
import { scene as sceneStructure } from './scene-structure'
import { scene as sceneCrossing } from './scene-crossing'
import { scene as sceneLogic } from './scene-logic'
import { scene as sceneCtxTest } from './scene-ctx-test'
import { scene as sceneReverse } from './scene-reverse'
import { scene as sceneGlobalBeat } from './scene-global-beat'
import { scene as sceneActiveVisible } from './scene-active-visible'
import { scene as sceneInactiveRails } from './scene-inactive-rails'
import { scene as sceneRings } from './scene-rings'
import { scene as sceneBeats } from './scene-beats'
import { scene as sceneFont } from './scene-font'
import { scene as sceneEasing } from './scene-easing'
import { scene as sceneRailSwitch } from './scene-rail-switch'
import { scene as sceneCollisions } from './scene-collisions'
import { scene as sceneSnake } from './scene-snake'
import { scene as sceneAudio } from './scene-audio'
import { scene as sceneToneInstruments } from './scene-tone-instruments'
import { scene as sceneCreateDestroy } from './scene-create-destroy'
import { scene as sceneSingleCamera } from './scene-single-camera'
import { scene as sceneMultiCamera } from './scene-multi-camera'
import { scene as sceneMultiRows } from './scene-multi-rows'
import { scene as sceneMultiColumns } from './scene-multi-columns'
import { scene as sceneMultiTest, sceneMulti32 } from './scene-multi-test'
import { scene as sceneRailText } from './scene-rail-text'
import { scene as sceneSampler } from './scene-sampler'
import { scene as sceneSamplerPadDeeper } from './scene-sampler-pad-deeper'
import { scene as sceneSamplerPadAwaits } from './scene-sampler-pad-awaits'
import { scene as sceneSamplerPadAstrid } from './scene-sampler-pad-astrid'
import { scene as sceneFormlines } from './scene-formlines'
import { scene as sceneBranching } from './scene-branching'
import { scene as sceneCtrl } from './scene-ctrl'
import { scene as sceneMidi } from './scene-midi'
import { scene as sceneBumblebee } from './scene-bumblebee'
// import { scene as scene1 } from './scene-1'
import { scene as scene2 } from './scene-2'
import { scene as scenePcb } from './scene-pcb'
// import { scenes as scenesRnbo } from './scene-rnbo'

export const scenes: SceneConfig[] = [
	sceneTest,
	sceneStructure,
	sceneRings,
	sceneInstruments,
	sceneOrientation,
	sceneLogic,
	sceneActiveVisible,
	sceneInactiveRails,
	sceneMarbles,
	sceneCtxTest,
	sceneReverse,
	sceneGlobalBeat,
	sceneRails,
	sceneCrossing,
	sceneBeats,
	sceneFont,
	sceneEasing,
	sceneSnake,
	sceneRailSwitch,
	...floatingScenes,
	sceneSingleCamera,
	sceneMultiCamera,
	sceneMultiRows,
	sceneMultiColumns,
	sceneMultiTest,
	sceneMulti32,
	...sceneRailText,
	sceneFormlines,
	sceneBranching,
	// scene1,
	scene2,
	scenePcb,
	sceneCtrl,
	sceneMidi,
	sceneBumblebee,
	sceneCreateDestroy,
	sceneAudio,
	sceneCollisions,
	sceneToneInstruments,
	sceneSampler,
	sceneSamplerPadDeeper,
	sceneSamplerPadAwaits,
	sceneSamplerPadAstrid
	// ...scenesRnbo
]

export function onUpdate(cb: (scenes: SceneConfig[]) => void) {
	if (import.meta.hot) {
		import.meta.hot.data.cb = cb
	}
}

if (import.meta.hot) {
	import.meta.hot.accept((c) => {
		if (import.meta.hot!.data.cb && c?.scenes) {
			import.meta.hot!.data.cb(c.scenes)
		}
	})
}
