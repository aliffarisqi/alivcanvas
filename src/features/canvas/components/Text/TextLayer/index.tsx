import React, { useCallback, useState } from 'react';
import { Text, StyleSheet, Pressable, TextInput } from 'react-native';
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
    const {
    activeLayerId,
    editingLayerId,
    setActiveLayer,
    setEditingLayer,
    duplicateLayer,
    deleteLayer,
    updatePosition,
    editText,
  } = useTextStore();

  const isActive = activeLayerId === layer.id;
  const isEditing = editingLayerId === layer.id;

  //---------- DRAG SHARED VALUE ----------//
  const x = useSharedValue(layer.x);
  const y = useSharedValue(layer.y);
  const startX = useSharedValue(layer.x);
  const startY = useSharedValue(layer.y);

  //---------- GESTURE HANDLER ----------//
  const panGesture = Gesture.Pan()
    .onBegin(() => {
      startX.value = x.value;
      startY.value = y.value;
      runOnJS(setActiveLayer)(layer.id);
    })
    .onUpdate((e) => {
      x.value = startX.value + e.translationX;
      y.value = startY.value + e.translationY;
    })
    .onEnd(() => {
      runOnJS(updatePosition)(layer.id, x.value, y.value);
    });

  //---------- SINGLE & DOUBLE TAP GESTURE ----------//
  const singleTap = Gesture.Tap()
    .numberOfTaps(1)
    .maxDelay(500)
    .onEnd(() => {
    const id = layer.id;
      if (activeLayerId === id) {
        runOnJS(setActiveLayer)(null);
        runOnJS(setEditingLayer)(null);
      } else {
        runOnJS(setActiveLayer)(id);
        runOnJS(setEditingLayer)(id);
      }
    });
  const gesture = Gesture.Simultaneous( singleTap, panGesture);

  //---------- TEXT EDITING ----------//
  const [temp, setTemp] = useState(layer.text);
  const handleSubmit = () => {
    editText(layer.id, temp);
    setEditingLayer(null);
    setActiveLayer(null);
  };


  //---------- ANIMATED STYLE ----------//
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
    <GestureDetector gesture={gesture}>
      <Animated.View style={animatedStyle}>
        {isActive && (
          <>
            <Pressable style={styles.copyBtn} onPress={handleCopy}>
              <Copy size={Sizes.iconM} color={Colors.gray} />
            </Pressable>
            <Pressable style={styles.deleteBtn} onPress={handleDelete}>
              <CircleX size={Sizes.iconM} color={Colors.red} />
            </Pressable>
          </>
        )}
        {isEditing ? (
          <TextInput
            value={temp}
            onChangeText={setTemp}
            onBlur={handleSubmit}
            onSubmitEditing={handleSubmit}
            style={[styles.input, {fontSize: layer.fontSize }]}
            autoFocus
          />
        ) : (
          <Text style={[styles.text, {fontSize: layer.fontSize }]}>{layer.text}</Text>
        )}
      </Animated.View>
    </GestureDetector>
  );
};

export default TextLayer;

const styles = StyleSheet.create({
  text: {
    color: Colors.dark,
    // fontSize: Sizes.fontXL,
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
  input: {
    color: Colors.dark,
    // fontSize: Sizes.fontXL,
    fontWeight: '600',
    padding: 0,
    margin: 0,
    borderBottomWidth: 1,
    borderColor: Colors.gray,
  },
});
