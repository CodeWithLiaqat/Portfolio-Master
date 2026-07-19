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

5. **Fix useGSAP scope mismatches** — if the subagent sets `scope: processRef` but the animations target elements *outside* that ref (e.g., `.tool-label` in a sibling section), the targets won't be found. Either expand the scope ref to cover all targeted elements, or use multiple `useGSAP` calls each with the matching scope ref.

6. **Fix `scope: document.body` in useGSAP** — the subagent sometimes writes `scope: document.body` when it can't determine a proper ref. This is invalid for `useGSAP`; replace with a proper React ref wrapping the section.

7. **Replace `window.location.href` in onClick handlers** — subagents often write `onClick={() => window.location.href='/path'}` in MagneticButton handlers. Always replace with `useLocation` from wouter: `const [, setLocation] = useLocation()` then `setLocation('/path')`.

## Launching the Subagent (Brief Format)

**Never use a template literal with markdown code blocks in the `task` field directly in CodeExecution.** The JS parser will misread backtick fence markers as template literal terminators, causing a syntax error. Instead:

1. Write the brief to a file: `WriteFile('.local/tasks/my-brief.md', briefText)`
2. In CodeExecution, read the file inside a `"use impure"` function:
   ```js
   const brief = await (async function() {
     "use impure";
     const fs = await import("node:fs/promises");
     return await fs.readFile(".local/tasks/my-brief.md", "utf-8");
   })();
   const job = subagent({ name: "...", task: brief, config: { $kind: "design", ... } });
   ```

## Multiple R3F Canvas Instances
When a page (e.g., Lab) renders 3+ standalone R3F `<Canvas>` components alongside the persistent `ArtifactCanvas`, the browser logs "THREE.WebGLRenderer: Context Lost" during HMR. This is a development-time artifact from rapid canvas remounting, not a production issue. Browser GPU contexts allow up to ~8-16 simultaneous contexts; 4 total is fine.

## Why
Subagents run in isolation and cannot run `pnpm install` in the host environment. They also generate relative import paths based on logical proximity, which can resolve differently than expected in a deep directory structure.
