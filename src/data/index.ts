import type { SceneConfig } from '../lib/scene'

import { scene as sceneTest } from './scene-test'
import { scene as sceneInstruments } from './scene-instruments'
import { scene as sceneMarbles } from './scene-marbles'
import { scene as sceneRails } from './scene-rails'
import { scene as sceneOrientation } from './scene-orientation'
import { scene as sceneStructure } from './scene-structure'
import { scene as sceneCrossing } from './scene-crossing'
import { scene as sceneLogic } from './scene-logic'

export const scenes: SceneConfig[] = [
	sceneTest,
	sceneStructure,
	sceneInstruments,
	sceneMarbles,
	sceneRails,
	sceneOrientation,
	sceneLogic,
	sceneCrossing
]
