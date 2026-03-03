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
import { scene as sceneMultiTest } from './scene-multi-test'
import { scenes as scenesRnbo } from './scene-rnbo'

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
	sceneCreateDestroy,
	sceneAudio,
	sceneCollisions,
	sceneToneInstruments,
	...scenesRnbo
]
