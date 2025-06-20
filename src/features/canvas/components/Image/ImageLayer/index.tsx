import React from 'react';
import { Image, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, runOnJS } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { ImageLayer as ILayer, useImageStore } from '@/features/canvas/store/imageStore';

interface Props { layer: ILayer }

const ImageLayer: React.FC<Props> = ({ layer }) => {
  const { updatePosition } = useImageStore();
  const x = useSharedValue(layer.x);
  const y = useSharedValue(layer.y);
  const startX = useSharedValue(layer.x);
  const startY = useSharedValue(layer.y);

  const pan = Gesture.Pan()
    .onBegin(() => {
      startX.value = x.value;
      startY.value = y.value;
    })
    .onUpdate((e) => {
      x.value = startX.value + e.translationX;
      y.value = startY.value + e.translationY;
    })
    .onEnd(() => runOnJS(updatePosition)(layer.id, x.value, y.value));

  const styled = useAnimatedStyle(() => ({
    position: 'absolute',
    left: x.value,
    top: y.value,
    transform: [{ translateX: -70 }, { translateY: -70 }, { scale: layer.scale }],
  }));

  return (
    <GestureDetector gesture={pan}>
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
