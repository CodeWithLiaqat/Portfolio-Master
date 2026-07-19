---
name: GSAP Plugin Registration
description: All GSAP plugins must be registered once globally in main.tsx; per-component registerPlugin calls are unreliable.
---

# GSAP Plugin Registration in Vite/React

## The Rule
Register all GSAP plugins (ScrollTrigger, SplitText, CustomEase, useGSAP) **once in main.tsx** before `createRoot()`. Per-component calls to `gsap.registerPlugin()` can execute too late and cause "X is not defined" runtime errors.

**Why:** In a Vite dev environment with HMR, components can be evaluated before the file that calls `registerPlugin` completes — especially when using `useGSAP` hook scopes. Components that call `ScrollTrigger.create()` inside a `useGSAP` callback fail with "ScrollTrigger is not defined" if the plugin hasn't been registered by the time the hook fires.

## How to Apply
In `main.tsx` (or the app entry point), add before `createRoot`:

```ts
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, useGSAP);
```

Components can still import `ScrollTrigger` for TypeScript types, but registration must happen in the entry file.

## Related Files
- Entry point: `artifacts/nexa-portfolio/src/main.tsx`
- Affected components: any component using `ScrollTrigger.create()` directly inside `useGSAP`
