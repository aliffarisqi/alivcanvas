import React from 'react';
import { Image, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, runOnJS } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { ImageLayer as ILayer, useImageStore } from '@/features/canvas/store/imageStore';
import { clamp } from '@/features/canvas/utils/math/canvasMath';
import { useCanvasStore } from '@/features/canvas/store/canvaStore';

interface Props { layer: ILayer }

const MIN_SCALE = 0.3;
const MAX_SCALE = 4;

const ImageLayer: React.FC<Props> = ({ layer }) => {
  const { updatePosition, updateScale } = useImageStore();
  const setIsInteractingLayer = useCanvasStore((s) => s.setIsInteractingLayer);

  const x = useSharedValue(layer.x);
  const y = useSharedValue(layer.y);
  const scale = useSharedValue(layer.scale);

  const startX = useSharedValue(layer.x);
  const startY = useSharedValue(layer.y);
  const startScale = useSharedValue(layer.scale);

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      startX.value = x.value;
      startY.value = y.value;
    })
    .onUpdate((e) => {
      x.value = startX.value + e.translationX;
      y.value = startY.value + e.translationY;
    })
    .onEnd(() => runOnJS(updatePosition)(layer.id, x.value, y.value));

  const pinchGesture = Gesture.Pinch()
    .onBegin(() => {
      runOnJS(setIsInteractingLayer)(true);
      startScale.value = scale.value;
    })
    .onUpdate((e) => {
      scale.value = clamp(startScale.value * e.scale, MIN_SCALE, MAX_SCALE);
    })
    .onEnd(() => {
      runOnJS(updateScale)(layer.id, scale.value);
      runOnJS(setIsInteractingLayer)(false);
    });

  const composed = Gesture.Simultaneous(panGesture, pinchGesture);
  const styled = useAnimatedStyle(() => ({
    position: 'absolute',
    left: x.value,
    top: y.value,
    transform: [
      { translateX: -70 }, 
      { translateY: -70 },
      { scale: scale.value },
    ],
  }));

  return (
    <GestureDetector gesture={composed}>
      <Animated.View style={styled}>
        <Image source={{ uri: layer.uri }} style={styles.img} />
      </Animated.View>
    </GestureDetector>
  );
};

export default ImageLayer;

const styles = StyleSheet.create({
  img: { width: 140, height: 140, borderRadius: 8 },
});
