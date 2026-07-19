---
name: NEXA Design Subagent Pattern
description: After a design subagent builds a complex React+R3F+GSAP app, the main agent must install missing packages and fix import path issues before the app runs.
---

# Post-Subagent Integration Checklist for NEXA-style Apps

## The Pattern
Design subagents produce correct component logic but cannot install packages or verify import paths resolve correctly. After `waitForJob` completes, the main agent must:

1. **Install missing packages** — the subagent writes imports for packages not yet in package.json. Common ones for NEXA-style apps:
   - `gsap @gsap/react lenis @react-three/fiber @react-three/drei @react-three/postprocessing three zustand detect-gpu maath`
   - `@types/three` as a devDependency

2. **Fix relative import paths** — components nested under `sections/home/` that import `../common/X` resolve to `sections/common/X`, NOT `components/common/X`. Always use `@/components/common/X` for cross-directory common imports.

3. **Register GSAP plugins globally** — see `gsap-plugin-registration.md`.

4. **Fix zod import** — the API server's esbuild cannot resolve `zod/v4`; use `import { z } from 'zod'` and add `zod` as a direct dependency.

## Why
Subagents run in isolation and cannot run `pnpm install` in the host environment. They also generate relative import paths based on logical proximity, which can resolve differently than expected in a deep directory structure.
