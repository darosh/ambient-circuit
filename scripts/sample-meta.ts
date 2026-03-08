#!/usr/bin/env tsx

import { updateSidecars } from './lib/sidecars'

const samplesDir = new URL('../public/samples', import.meta.url).pathname

await updateSidecars(samplesDir)
