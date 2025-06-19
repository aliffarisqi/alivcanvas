import { screenWidth, screenHeight } from '@/app/utils/device/dimension';
import { Metrics } from '@/app/theme/metrics';

export const WORKSPACE_SIZE =
  Math.max(screenWidth, screenHeight) * Metrics.workspaceMultiplier;
