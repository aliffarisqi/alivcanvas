import { create } from 'zustand';
import uuid from 'react-native-uuid';
import { WORKSPACE_SIZE } from '@/features/canvas/utils/config/dimension';

export interface ImageLayer {
  id: string;
  uri: string;
  x: number;
  y: number;
  scale: number;
}

interface ImageState {
  layers: ImageLayer[];
  addImage: (uri: string) => void;
  updatePosition: (id: string, x: number, y: number) => void;
  updateScale: (id: string, scale: number) => void;
}

export const useImageStore = create<ImageState>((set) => ({
  layers: [],
  addImage: (uri) =>
    set((state) => ({
      layers: [
        ...state.layers,
        {
          id: uuid.v4() as string,
          uri,
          x: WORKSPACE_SIZE / 2,
          y: WORKSPACE_SIZE / 2,
          scale: 1,
        },
      ],
    })),
  updatePosition: (id, x, y) =>
    set((state) => ({
      layers: state.layers.map((l) =>
        l.id === id ? { ...l, x, y } : l,
      ),
    })),
  updateScale: (id, scale) =>
    set((state) => ({
      layers: state.layers.map((l) =>
        l.id === id ? { ...l, scale } : l,
      ),
    })),
}));
