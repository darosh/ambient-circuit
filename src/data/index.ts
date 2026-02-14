import type { SceneConfig } from '../lib/scene'

import { scene as sceneTest } from './scene-test'
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
import { scene as sceneRings } from './scene-rings'
import { scene as sceneBeats } from './scene-beats'
import { scene as sceneFont } from './scene-font'
import { scene as sceneEasing } from './scene-easing'
import { scene as sceneRailSwitch } from './scene-rail-switch'
import { scene as sceneCollisions } from './scene-collisions'

export const scenes: SceneConfig[] = [
	sceneTest,
	sceneStructure,
	sceneRings,
	sceneInstruments,
	sceneOrientation,
	sceneLogic,
	sceneActiveVisible,
	sceneMarbles,
	sceneCtxTest,
	sceneReverse,
	sceneGlobalBeat,
	sceneRails,
	sceneCrossing,
	sceneBeats,
	sceneFont,
	sceneEasing,
	sceneRailSwitch,
	sceneCollisions
]
