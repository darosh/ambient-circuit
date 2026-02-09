import type { SceneConfig } from '../lib/scene'
import { scene as sceneTest } from './scene-test'
import { scene as sceneInstruments } from './scene-instruments'
import { scene as sceneMarbles } from './scene-marbles'
import { scene as sceneRails } from './scene-rails'

export const scenes: SceneConfig[] = [sceneTest, sceneInstruments, sceneMarbles, sceneRails]
