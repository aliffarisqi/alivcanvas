import { ImageSourcePropType } from 'react-native';
import { create } from 'zustand';

interface CanvasState {
  isInteractingLayer: boolean;
  setIsInteractingLayer: (val: boolean) => void;
  
  backgroundImage: ImageSourcePropType | null;
  setBackgroundImage: (img: ImageSourcePropType | null) => void;

  activePanel: PanelType;
  setActivePanel: (p: PanelType) => void;
}
export const useCanvasStore = create<CanvasState>((set) => ({
  isInteractingLayer: false,
  setIsInteractingLayer: (val) => set({ isInteractingLayer: val }),
  
  backgroundImage: null,
  setBackgroundImage: (img) => set({ backgroundImage: img }),

  activePanel: null,
  setActivePanel: (p) => set({ activePanel: p }),
}));

export type PanelType = 'font' | 'template' | null;