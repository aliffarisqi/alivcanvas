import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import {
  TextLayer as TLayer,
  useTextStore,
} from '@/features/canvas/store/textStore';
import { Colors } from '@/app/theme/colors';
import { Sizes } from '@/app/theme/siezs';

interface Props {
  layer: TLayer;
}

const TextLayer: React.FC<Props> = ({ layer }) => {
  const { updatePosition } = useTextStore();

  // current position of the text layer
  const x = useSharedValue(layer.x);
  const y = useSharedValue(layer.y);

  // save the initial position when gesture starts
  const startX = useSharedValue(layer.x);
  const startY = useSharedValue(layer.y);

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      startX.value = x.value;
      startY.value = y.value;
    })
    .onUpdate((e) => {
      x.value = startX.value + e.translationX;
      y.value = startY.value + e.translationY;
    })
    .onEnd(() => {
      // save to store Zustand in JS thread
      runOnJS(updatePosition)(layer.id, x.value, y.value);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    left: x.value,
    top: y.value,
    transform: [
      { translateX: -50 }, 
      { translateY: -20 },
    ],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={animatedStyle}>
        <Text style={styles.text}>{layer.text}</Text>
      </Animated.View>
    </GestureDetector>
  );
};

export default TextLayer;

const styles = StyleSheet.create({
  text: {
    color: Colors.dark,
    fontSize: Sizes.fontXL,
    fontWeight: '600',
  },
});
