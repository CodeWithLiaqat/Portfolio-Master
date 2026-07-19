import { create } from 'zustand';

interface SceneState {
  act: number;
  actProgress: number; // 0 to 1 progress of current act
  globalProgress: number; // 0 to 1 of entire homepage
  pointer: { x: number; y: number };
  hoveredProject: string | null; // slug of portfolio item being hovered
  setAct: (act: number) => void;
  setActProgress: (progress: number) => void;
  setGlobalProgress: (progress: number) => void;
  setPointer: (x: number, y: number) => void;
  setHoveredProject: (slug: string | null) => void;
}

export const useSceneStore = create<SceneState>((set) => ({
  act: 1,
  actProgress: 0,
  globalProgress: 0,
  pointer: { x: 0, y: 0 },
  hoveredProject: null,
  setAct: (act) => set({ act }),
  setActProgress: (actProgress) => set({ actProgress }),
  setGlobalProgress: (globalProgress) => set({ globalProgress }),
  setPointer: (x, y) => set({ pointer: { x, y } }),
  setHoveredProject: (hoveredProject) => set({ hoveredProject }),
}));
