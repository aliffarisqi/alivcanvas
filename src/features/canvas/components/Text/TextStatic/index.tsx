import React, { useCallback } from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
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
import { CircleX, Copy, } from 'lucide-react-native';

interface Props {
  layer: TLayer;
}

const TextLayer: React.FC<Props> = ({ layer }) => {
  const { updatePosition, duplicateLayer, deleteLayer } = useTextStore();

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
  const handleCopy = useCallback(() => duplicateLayer(layer.id), [duplicateLayer, layer.id]);
  const handleDelete = useCallback(() => deleteLayer(layer.id), [deleteLayer, layer.id]);
  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={animatedStyle}>
        <Pressable style={styles.copyBtn} onPress={handleCopy}>
          <Copy size={12} color={Colors.gray} />
        </Pressable>
         <Pressable style={styles.deleteBtn} onPress={handleDelete}>
          <CircleX size={12} color={Colors.red} />
        </Pressable>
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
  copyBtn: {
    position: 'absolute',
    top: Sizes.minusOffsetSm,
    left: Sizes.minusOffset2XL,  
  },
  deleteBtn: {
    position: 'absolute',
    top: Sizes.minusOffsetSm,
    right: Sizes.minusOffset2XL,
  },
});
