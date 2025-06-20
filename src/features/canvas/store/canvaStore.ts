import { create } from 'zustand';

interface CanvasState {
  isInteractingLayer: boolean;
  setIsInteractingLayer: (val: boolean) => void;
}

export const useCanvasStore = create<CanvasState>((set) => ({
  isInteractingLayer: false,
  setIsInteractingLayer: (val) => set({ isInteractingLayer: val }),
}));