import React, { PropsWithChildren, forwardRef, useImperativeHandle } from 'react';
import { Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { styles } from './styles';
import { Metrics } from '@/app/theme/metrics';
import { clampPan, clampScale } from '../../utils/math/canvasMath';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');
const WORKSPACE = Metrics.canvasSide * Metrics.workspaceMultiplier;

export interface WorkspaceViewHandle {
  reset: () => void;
}
export interface WorkspaceViewProps extends PropsWithChildren {}

const WorkspaceView = forwardRef<WorkspaceViewHandle, WorkspaceViewProps>(
  ({ children }, ref) => {
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const startScale = useSharedValue(1);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  /* ----- Pinch (dengan clamp scale) ----- */
  const pinch = Gesture.Pinch()
    .onBegin(() => {
      startScale.value = scale.value;
    })
    .onUpdate((e) => {
      scale.value = clampScale(
        startScale.value * e.scale,
        WORKSPACE,
        SCREEN_W,
        SCREEN_H,
      );
    });

  /* ----- Pan (dengan clamp pan) ----- */
  const pan = Gesture.Pan()
    .onBegin(() => {
      startX.value = translateX.value;
      startY.value = translateY.value;
    })
    .onUpdate((e) => {
      const rawX = startX.value + e.translationX;
      const rawY = startY.value + e.translationY;

      const clamped = clampPan(
        rawX,
        rawY,
        scale.value,
        WORKSPACE,
        SCREEN_W,
        SCREEN_H,
      );
      translateX.value = clamped.x;
      translateY.value = clamped.y;
    });

  const gesture = Gesture.Simultaneous(pan, pinch);
  useImperativeHandle(ref, () => ({
        reset: () => {
          'worklet';
          scale.value = withTiming(1);
          translateX.value = withTiming(0);
          translateY.value = withTiming(0);
          startX.value = 0;
          startY.value = 0;
        },
      }));
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
      <GestureDetector gesture={gesture}>
        <Animated.View style={styles.wrapper}>
          <Animated.View
            style={[
              styles.workspace,
              { width: WORKSPACE, height: WORKSPACE },
              animatedStyle,
            ]}
          >
            {children}
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    );
  },
);

export default WorkspaceView;
