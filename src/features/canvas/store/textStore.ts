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
}

export const useTextStore = create<TextState>((set) => ({
  layers: [],
  addLayer: () =>
    set((state) => ({
      layers: [
        ...state.layers,
        {
          id: uuid.v4(),
          text: 'Text Baru',
          x: WORKSPACE_SIZE / 2,
          y: WORKSPACE_SIZE / 2,
        },
      ],
    })),
  updatePosition: (id, x, y) =>
    set((state) => ({
      layers: state.layers.map((l) =>
        l.id === id ? { ...l, x, y } : l
      ),
    })),
}));
