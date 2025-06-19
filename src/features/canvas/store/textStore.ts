import { create } from 'zustand';
import uuid from 'react-native-uuid';
import { WORKSPACE_SIZE } from '../utils/config/dimension';

export interface TextLayer {
  id: string;
  text: string;
  x: number;
  y: number;
}

interface TextState {
  layers: TextLayer[];
  addLayer: () => void;
  updatePosition: (id: string, x: number, y: number) => void;
  duplicateLayer: (id: string) => void;
  deleteLayer: (id: string) => void; 
}

export const useTextStore = create<TextState>((set, get) => ({
  layers: [],
  addLayer: () =>
    set((state) => ({
      layers: [
        ...state.layers,
        {
          id: uuid.v4() as string,
          text: 'Text Baru',
          x: WORKSPACE_SIZE / 2,
          y: WORKSPACE_SIZE / 2,
        },
      ],
    })),
  updatePosition: (id, x, y) =>
    set((state) => ({
      layers: state.layers.map((l) => (l.id === id ? { ...l, x, y } : l)),
    })),
  duplicateLayer: (id) => {
    const original = get().layers.find((l) => l.id === id);
    if (!original) return;
    set((state) => ({
      layers: [
        ...state.layers,
        {
          ...original,
          id: uuid.v4() as string,
          x: original.x + 40,
          y: original.y + 40,
        },
      ],
    }));
  },
  deleteLayer: (id) =>
    set((state) => ({
      layers: state.layers.filter((l) => l.id !== id),
    })),
}));
