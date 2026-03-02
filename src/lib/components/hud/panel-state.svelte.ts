// Module-level shared state between ParamPanel (HUD scene) and Wrap (main scene)
// Used to disable OrbitControls when pointer is over the panel
export const panelState = $state({ pointerLock: false })
