import React from 'react';
import {  Text } from 'react-native';
import Slider from '@react-native-community/slider';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { useTextStore } from '@/features/canvas/store/textStore';
import { styles } from './styles';
import { Colors } from '@/app/theme/colors';

const FontAdjustPanel: React.FC = () => {
  const { activeLayerId, layers, editFontSize } = useTextStore();

  const layer = layers.find((l) => l.id === activeLayerId);
  if (!layer) return null; 

  return (
    <Animated.View
      entering={FadeInUp}
      exiting={FadeOutDown}
      style={styles.panel}
    >
      <Text style={styles.title}>Font Size</Text>
      <Slider
        minimumValue={4}
        maximumValue={52}
        value={layer.fontSize}
        onValueChange={(val) => editFontSize(layer.id, val)}
        style={styles.slider}
        maximumTrackTintColor={Colors.white}
        minimumTrackTintColor={Colors.white}
        thumbTintColor={Colors.white}
      />
      {/* Title Color */}
      {/* Slider color 10 color yang populer */}
    </Animated.View>
  );
};

export default FontAdjustPanel;
