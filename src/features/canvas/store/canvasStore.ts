import { ImageSourcePropType } from 'react-native';
import { create } from 'zustand';

interface CanvasState {
  isInteractingLayer: boolean;
  setIsInteractingLayer: (val: boolean) => void;

  isTemplatePanelVisible: boolean;
  setIsTemplatePanelVisible: (visible: boolean) => void;
  
  backgroundImage: ImageSourcePropType | null;
  setBackgroundImage: (img: ImageSourcePropType | null) => void;
}

export const useCanvasStore = create<CanvasState>((set) => ({
  isInteractingLayer: false,
  setIsInteractingLayer: (val) => set({ isInteractingLayer: val }),

  isTemplatePanelVisible: false,
  setIsTemplatePanelVisible: (visible) => set({ isTemplatePanelVisible: visible }),

  backgroundImage: null,
  setBackgroundImage: (img) => set({ backgroundImage: img }),
}));