declare const __APP_VERSION__: string

// tsl-textures: procedural TSL texture functions
// All functions return a TSL vec3 node (color) unless noted
// All accept an optional params object; unspecified params use defaults
declare module 'tsl-textures' {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	type TslNode = any

	interface PositionParam {
		position?: TslNode
	}
	interface SeedParam {
		seed?: TslNode | number
	}
	interface TimeParam {
		time?: TslNode
	}

	// --- Procedural textures (return vec3 color node) ---

	interface BrainParams extends PositionParam, SeedParam, TimeParam {
		scale?: TslNode | number // default 2
		smooth?: TslNode | number // default 0.5
		wave?: TslNode | number // default 0.5
		speed?: TslNode | number // default 2.5
		color?: TslNode // default 0xFFD0D0
		background?: TslNode // default 0x500000
	}
	export function brain(params?: BrainParams): TslNode

	interface BricksParams extends PositionParam, SeedParam {
		scale?: TslNode | number
		brickSize?: TslNode // Vector3(2,1,2)
		brickShift?: TslNode | number // default 2
		jointSize?: TslNode | number // default 0.05
		jointSpan?: TslNode | number // default 0.5
		jointJitter?: TslNode | number // default 0.5
		jointBlur?: TslNode | number // default 0.03
		noiseSize?: TslNode | number // default 0.5
		noiseStrength?: TslNode | number // default 0.2
		colorShade?: TslNode | number // default 0.5
		color?: TslNode // default 0xFF4000
		additional?: TslNode // default 0xD0A030
		background?: TslNode // default 0xAAAAAA
	}
	export function bricks(params?: BricksParams): TslNode

	interface CamouflageParams extends PositionParam, SeedParam {
		scale?: TslNode | number
		colorA?: TslNode // default 0xc2bea8
		colorB?: TslNode // default 0x9c895e
		colorC?: TslNode // default 0x92a375
		colorD?: TslNode // default 0x717561
	}
	export function camouflage(params?: CamouflageParams): TslNode

	interface CausticsParams extends PositionParam, SeedParam, TimeParam {
		scale?: TslNode | number
		speed?: TslNode | number // default 0
		color?: TslNode // default 0x50A8C0
	}
	export function caustics(params?: CausticsParams): TslNode

	interface CaveArtParams extends PositionParam, SeedParam {
		scale?: TslNode | number
		thinness?: TslNode | number // default 2
		noise?: TslNode | number // default 0.3
		color?: TslNode // default 0xD34545
		background?: TslNode // default 0xFFF8F0
	}
	export function caveArt(params?: CaveArtParams): TslNode

	interface CircleDecorParams extends PositionParam, SeedParam {
		scale?: TslNode | number
		grains?: TslNode | number // default 0.2
		complexity?: TslNode | number // default 1
		blur?: TslNode | number // default 0.2
		color?: TslNode // default 0x000000
		background?: TslNode // default 0xFFFFFF
	}
	export function circleDecor(params?: CircleDecorParams): TslNode

	interface CirclesParams extends PositionParam, SeedParam {
		scale?: TslNode | number
		variety?: TslNode | number // default 1
		color?: TslNode // default 0xF0E0D0
	}
	export function circles(params?: CirclesParams): TslNode

	interface CloudsParams extends PositionParam, SeedParam {
		scale?: TslNode | number
		density?: TslNode | number // default 0.5
		opacity?: TslNode | number // default 1
		color?: TslNode // default 0xFFFFFF
		subcolor?: TslNode // default 0xA0A0B0
	}
	export function clouds(params?: CloudsParams): TslNode

	interface ConcreteParams extends PositionParam, SeedParam {
		scale?: TslNode | number
		density?: TslNode | number // default 0.5
		bump?: TslNode | number // default 0.5
	}
	/** Returns a normalNode (not color) */
	export function concrete(params?: ConcreteParams): TslNode

	interface CorkParams extends PositionParam, SeedParam {
		scale?: TslNode | number
		straight?: TslNode | number // default 1
		noise?: TslNode | number // default 0.3
		color?: TslNode // default 0xfff0c0
		background?: TslNode // default 0xd08060
	}
	export function cork(params?: CorkParams): TslNode

	interface CrumpledFabricParams extends PositionParam, SeedParam {
		scale?: TslNode | number
		pinch?: TslNode | number // default 0.5
		color?: TslNode // default 0xB0F0FF
		subcolor?: TslNode // default 0x4040F0
		background?: TslNode // default 0x003000
	}
	export function crumpledFabric(params?: CrumpledFabricParams): TslNode

	interface DalmatianSpotsParams extends PositionParam, SeedParam {
		scale?: TslNode | number
		density?: TslNode | number // default 0.6
		color?: TslNode // default 0xFFFFFF
		background?: TslNode // default 0x000000
	}
	export function dalmatianSpots(params?: DalmatianSpotsParams): TslNode

	interface DarthMaulParams extends PositionParam, SeedParam {
		scale?: TslNode | number
		shift?: TslNode // Vector3(0,0,0)
		complexity?: TslNode | number // default 0
		angle?: TslNode | number // default 60
		distance?: TslNode | number // default 1.9
		color?: TslNode // default 0xF04040
		background?: TslNode // default 0x000000
		balance?: TslNode | number // default 0
	}
	export function darthMaul(params?: DarthMaulParams): TslNode

	interface DysonSphereParams extends PositionParam, SeedParam {
		scale?: TslNode | number
		complexity?: TslNode | number // default 2
		variation?: TslNode | number // default 0
		color?: TslNode // default 0xc0d0ff
		background?: TslNode // default 0x000000
	}
	export function dysonSphere(params?: DysonSphereParams): TslNode

	interface EntangledParams extends PositionParam, SeedParam {
		scale?: TslNode | number
		density?: TslNode | number // default 10
		color?: TslNode // default 0x002040
		background?: TslNode // default 0xFFFFFF
	}
	export function entangled(params?: EntangledParams): TslNode

	interface ForditeParams extends PositionParam, SeedParam {
		scale?: TslNode | number
		color?: TslNode // default 0x000000
	}
	export function fordite(params?: ForditeParams): TslNode

	interface GasGiantParams extends PositionParam, SeedParam {
		scale?: TslNode | number
		turbulence?: TslNode | number // default 0.3
		blur?: TslNode | number // default 0.6
		colorA?: TslNode // default 0xFFF8F0
		colorB?: TslNode // default 0xF0E8B0
		colorC?: TslNode // default 0xAFA0D0
	}
	export function gasGiant(params?: GasGiantParams): TslNode

	interface GridParams {
		uvs?: TslNode
		countU?: TslNode | number // default 32
		countV?: TslNode | number // default 16
		aspect?: TslNode | number // default 1
		thinness?: TslNode | number // default 0.8
		equirectangular?: boolean // default true
		color?: TslNode // default 0x000000
		background?: TslNode // default 0xFFFFFF
	}
	export function grid(params?: GridParams): TslNode

	interface IsolayersParams extends PositionParam, SeedParam {
		scale?: TslNode | number
		layers?: TslNode | number // default 10
		edge?: TslNode | number // default 0.5
		darkness?: TslNode | number // default 0
		color?: TslNode // default 0xFFFFF0
		background?: TslNode // default 0xFF4040
	}
	export function isolayers(params?: IsolayersParams): TslNode

	interface IsolinesParams extends PositionParam, SeedParam {
		scale?: TslNode | number
		density?: TslNode | number // default 40
		blur?: TslNode | number // default 0.3
		thinness?: TslNode | number // default 0.6
		color?: TslNode // default 0xFFFFFF
		background?: TslNode // default 0x000000
	}
	export function isolines(params?: IsolinesParams): TslNode

	interface KarstRockParams extends PositionParam, SeedParam {
		scale?: TslNode | number
		color?: TslNode // default 0xFFF4F0
		background?: TslNode // default 0xD0D0D0
	}
	export function karstRock(params?: KarstRockParams): TslNode

	interface MarbleParams extends PositionParam, SeedParam {
		scale?: TslNode | number
		thinness?: TslNode | number // default 5
		noise?: TslNode | number // default 0.3
		color?: TslNode // default 0x4545D3
		background?: TslNode // default 0xF0F8FF
	}
	export function marble(params?: MarbleParams): TslNode

	interface NeonLightsParams extends PositionParam, SeedParam {
		scale?: TslNode | number
		thinness?: TslNode | number // default 0.8
		node?: TslNode | number // default 0 (0=additive, 1=subtractive)
		colorA?: TslNode // default 0xFF0000
		colorB?: TslNode // default 0x00FF00
		colorC?: TslNode // default 0x0000FF
		background?: TslNode // default 0x000000
	}
	export function neonLights(params?: NeonLightsParams): TslNode

	interface PerlinNoiseParams extends PositionParam, SeedParam {
		scale?: TslNode | number // default 2
		balance?: TslNode | number // default 0
		contrast?: TslNode | number // default 0
		color?: TslNode // default 0xFFFFFF
		background?: TslNode // default 0x000000
	}
	export function perlinNoise(params?: PerlinNoiseParams): TslNode

	interface PhotosphereParams extends PositionParam, SeedParam {
		scale?: TslNode | number
		color?: TslNode // default 0xFFFF00
		background?: TslNode // default 0xFF0000
	}
	export function photosphere(params?: PhotosphereParams): TslNode

	interface PlanetParams extends PositionParam, SeedParam {
		scale?: TslNode | number
		iterations?: TslNode | number // default 5
		levelSea?: TslNode | number // default 0.3
		levelMountain?: TslNode | number // default 0.7
		balanceWater?: TslNode | number // default 0.3
		balanceSand?: TslNode | number // default 0.2
		balanceSnow?: TslNode | number // default 0.8
		colorDeep?: TslNode
		colorShallow?: TslNode
		colorBeach?: TslNode
		colorGrass?: TslNode
		colorForest?: TslNode
		colorSnow?: TslNode
	}
	export function planet(params?: PlanetParams): TslNode

	interface PolkaDotsParams extends PositionParam {
		count?: TslNode | number // default 2
		size?: TslNode | number // default 0.5
		blur?: TslNode | number // default 0.25
		flat?: TslNode | number // default 0
		color?: TslNode // default 0x000000
		background?: TslNode // default 0xFFFFFF
	}
	export function polkaDots(params?: PolkaDotsParams): TslNode

	interface ProcessedWoodParams extends PositionParam, SeedParam {
		scale?: TslNode | number
		lengths?: TslNode | number // default 4
		strength?: TslNode | number // default 0.3
		angle?: TslNode | number // default 0
		color?: TslNode // default 0x702020
		background?: TslNode // default 0xF0D0A0
	}
	export function processedWood(params?: ProcessedWoodParams): TslNode

	interface ProtozoaParams extends PositionParam, SeedParam {
		matcap?: TslNode
		scale?: TslNode | number // default 1.5
		fat?: TslNode | number // default 0.7
		amount?: TslNode | number // default 0.4
		color?: TslNode // default 0xA0A0A0
		subcolor?: TslNode // default 0xE0E8FF
		background?: TslNode // default 0xF0F8FF
	}
	export function protozoa(params?: ProtozoaParams): TslNode

	interface ReticularVeinsParams extends PositionParam, SeedParam {
		scale?: TslNode | number
		reticulation?: TslNode | number // default 5
		strength?: TslNode | number // default 0.2
		organelles?: TslNode | number // default 0.2
		color?: TslNode // default 0xFFFFF0
		background?: TslNode // default 0x208020
	}
	export function reticularVeins(params?: ReticularVeinsParams): TslNode

	interface RomanPavingParams extends PositionParam, SeedParam {
		scale?: TslNode | number
		depth?: TslNode | number // default 0.5
	}
	export function romanPaving(params?: RomanPavingParams): TslNode

	interface RoughClayParams extends PositionParam, SeedParam {
		scale?: TslNode | number
		bump?: TslNode | number // default 0.5
		curvature?: TslNode | number // default 0.2
	}
	/** Returns a normalNode (not color) */
	export function roughClay(params?: RoughClayParams): TslNode

	interface RunnyEggsParams extends PositionParam, SeedParam {
		scale?: TslNode | number
		sizeYolk?: TslNode | number // default 0.2
		sizeWhite?: TslNode | number // default 0.7
		colorYolk?: TslNode
		colorWhite?: TslNode
		colorBackground?: TslNode
	}
	export function runnyEggs(params?: RunnyEggsParams): TslNode

	interface RustParams extends PositionParam, SeedParam {
		scale?: TslNode | number
		iterations?: TslNode | number // default 8
		amount?: TslNode | number // default -0.3
		opacity?: TslNode | number // default 0.5
		noise?: TslNode | number // default 0.5
		noiseScale?: TslNode | number // default 0.5
		color?: TslNode // default 0xC08000
		background?: TslNode // default 0x000020
	}
	export function rust(params?: RustParams): TslNode

	interface SatinParams extends PositionParam, SeedParam {
		scale?: TslNode | number
		color?: TslNode // default 0x7080FF
		background?: TslNode // default 0x000050
	}
	export function satin(params?: SatinParams): TslNode

	interface ScepterHeadParams extends PositionParam {
		xFactor?: TslNode | number // default 10
		yFactor?: TslNode | number // default 22
		zFactor?: TslNode | number // default 10
		colorRim?: TslNode // default 0xFFFFFF
		colorA?: TslNode // default 0x70E0FF
		colorB?: TslNode // default 0x3000FF
	}
	export function scepterHead(params?: ScepterHeadParams): TslNode

	interface ScreamParams extends PositionParam, SeedParam {
		scale?: TslNode | number
		variety?: TslNode | number // default 1
		color?: TslNode // default 0xF0F060
		background?: TslNode // default 0xD09090
	}
	export function scream(params?: ScreamParams): TslNode

	interface StarsParams extends PositionParam, SeedParam {
		scale?: TslNode | number
		density?: TslNode | number // default 2
		variation?: TslNode | number // default 0
		color?: TslNode // default 0xfff5f0
		background?: TslNode // default 0x000060
	}
	export function stars(params?: StarsParams): TslNode

	interface StaticNoiseParams extends SeedParam, TimeParam {
		position?: TslNode // default screenCoordinate
		scale?: TslNode | number // default 2
		balance?: TslNode | number // default 0
		contrast?: TslNode | number // default 0
		delay?: TslNode | number // default 0
	}
	export function staticNoise(params?: StaticNoiseParams): TslNode

	interface TigerFurParams extends PositionParam, SeedParam {
		scale?: TslNode | number
		lengths?: TslNode | number // default 4
		blur?: TslNode | number // default 0.3
		strength?: TslNode | number // default 0.3
		hairs?: TslNode | number // default 0.5
		color?: TslNode // default 0xFFAA00
		bottomColor?: TslNode // default 0xFFFFEE
	}
	export function tigerFur(params?: TigerFurParams): TslNode

	interface TurbulentSmokeParams extends PositionParam, SeedParam, TimeParam {
		scale?: TslNode | number
		speed?: TslNode | number // default 0
		details?: TslNode | number // default 5
	}
	export function turbulentSmoke(params?: TurbulentSmokeParams): TslNode

	interface VoronoiCellsParams extends PositionParam, SeedParam {
		scale?: TslNode | number
		variation?: TslNode | number // default 0
		facet?: TslNode | number // default 0
		color?: TslNode // default 0x000000
		background?: TslNode // default 0xc0d0ff
	}
	export function voronoiCells(params?: VoronoiCellsParams): TslNode

	interface WaterDropsParams extends PositionParam, SeedParam {
		scale?: TslNode | number
		density?: TslNode | number // default 0.5
		bump?: TslNode | number // default 0.6
	}
	/** Returns a normalNode (not color) */
	export function waterDrops(params?: WaterDropsParams): TslNode

	interface WatermelonParams extends PositionParam, SeedParam {
		uvs?: TslNode
		scale?: TslNode | number
		stripes?: TslNode | number // default 12
		variation?: TslNode | number // default 0.5
		noise?: TslNode | number // default 0.25
		color?: TslNode
		background?: TslNode
	}
	export function watermelon(params?: WatermelonParams): TslNode

	interface WoodParams extends PositionParam, SeedParam {
		scale?: TslNode | number
		rings?: TslNode | number // default 4.5
		lengths?: TslNode | number // default 1
		angle?: TslNode | number // default 0
		fibers?: TslNode | number // default 0.3
		fibersDensity?: TslNode | number // default 10
		color?: TslNode
		background?: TslNode
	}
	export function wood(params?: WoodParams): TslNode

	interface ZebraLinesParams extends PositionParam {
		scale?: TslNode | number
		thinness?: TslNode | number // default 0.5
		phi?: TslNode | number // default 0
		theta?: TslNode | number // default 0
		flat?: TslNode | number // default 0
		color?: TslNode // default 0x000000
		background?: TslNode // default 0xFFFFFF
	}
	export function zebraLines(params?: ZebraLinesParams): TslNode

	// --- Position modifiers (return positionNode, not color) ---

	interface MelterParams {
		distance?: TslNode // Vector3(0,-0.5,0)
		selectorCenter?: TslNode // Vector3(0,0,0)
		selectorAngles?: TslNode // Vector2(0,0)
		selectorWidth?: TslNode | number // default 1.7
	}
	export function melter(params?: MelterParams): TslNode

	interface RotatorParams {
		angles?: TslNode // Vector3(-0.2,0.7,0)
		center?: TslNode // Vector3(0,0,0)
		selectorCenter?: TslNode // Vector3(0,0,0)
		selectorAngles?: TslNode // Vector2(0,0)
		selectorWidth?: TslNode | number // default 2
	}
	export function rotator(params?: RotatorParams): TslNode

	interface ScalerParams {
		scales?: TslNode // Vector3(0.01,0.9,1.7)
		center?: TslNode // Vector3(0,0,0)
		selectorCenter?: TslNode // Vector3(0,0,0)
		selectorAngles?: TslNode // Vector2(0,0)
		selectorWidth?: TslNode | number // default 2
	}
	export function scaler(params?: ScalerParams): TslNode

	interface SupersphereParams {
		exponent?: TslNode | number // default 3
	}
	export function supersphere(params?: SupersphereParams): TslNode

	interface TranslatorParams {
		distance?: TslNode // Vector3(-0.5,0,0.2)
		selectorCenter?: TslNode // Vector3(0,0,0)
		selectorAngles?: TslNode // Vector2(0,0)
		selectorWidth?: TslNode | number // default 0.7
	}
	export function translator(params?: TranslatorParams): TslNode
}
