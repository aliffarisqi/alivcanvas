/* Semua fungsi bertanda 'worklet' agar aman dipanggil di UI thread */

export const clamp = (v: number, min: number, max: number) => {
  'worklet';
  return Math.min(max, Math.max(min, v));
};

export const getMinScale = (
  workspace: number,
  screenW: number,
  screenH: number,
): number => {
  'worklet';
  return Math.max(screenW / workspace, screenH / workspace);
};

export const clampScale = (
  rawScale: number,
  workspace: number,
  screenW: number,
  screenH: number,
  maxScale = 3,
): number => {
  'worklet';
  const minScale = getMinScale(workspace, screenW, screenH);
  return clamp(rawScale, minScale, maxScale);
};

export const clampPan = (
  x: number,
  y: number,
  scale: number,
  workspace: number,
  screenW: number,
  screenH: number,
): { x: number; y: number } => {
  'worklet';
  const halfW = (workspace * scale - screenW) / 2;
  const halfH = (workspace * scale - screenH) / 2;

  if (halfW <= 0 && halfH <= 0) {
    return { x: 0, y: 0 };
  }

  const maxX = Math.max(0, halfW);
  const maxY = Math.max(0, halfH);

  return {
    x: clamp(x, -maxX, maxX),
    y: clamp(y, -maxY, maxY),
  };
};
