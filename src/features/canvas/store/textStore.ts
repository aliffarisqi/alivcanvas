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
  activeLayerId: string | null;
  editingLayerId: string | null;
  updatePosition: (id: string, x: number, y: number) => void;
  duplicateLayer: (id: string) => void;
  deleteLayer: (id: string) => void; 
  setActiveLayer: (id: string | null) => void;
  setEditingLayer: (id: string | null) => void;
  editText: (id: string, newText: string) => void;
}

export const useTextStore = create<TextState>((set, get) => ({
  layers: [],
  activeLayerId: null,
  editingLayerId: null,

  // ADD LAYER TEXT
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

  // UPDATE POSITION
  updatePosition: (id, x, y) =>
    set((state) => ({
      layers: state.layers.map((l) => (l.id === id ? { ...l, x, y } : l)),
    })),

  // DUPLICATE LAYER
  duplicateLayer: (id) => {
    const original = get().layers.find((l) => l.id === id);
    if (!original) return;
    const newId = uuid.v4() as string;
    set((state) => ({
      layers: [
        ...state.layers,
        { ...original, id: newId, x: original.x + 40,y: original.y + 40, },
      ],
      activeLayerId: newId,
      editingLayerId: null,
    }));
  },

  // DELETE LAYER
  deleteLayer: (id) =>
    set((state) => ({
      layers: state.layers.filter((l) => l.id !== id),
    })),

  // UPDATE ACTIVE LAYER
  setActiveLayer: (id) =>
    set({ activeLayerId: id, editingLayerId: null }),

  // SET ACTIVE LAYER
  setEditingLayer: (id) =>
    set({ editingLayerId: id, activeLayerId: id }),

  // SET EDITING LAYER
  editText: (id, newText) =>
    set((state) => ({
      layers: state.layers.map((l) => (l.id === id ? { ...l, text: newText } : l)),
    })),
}));
