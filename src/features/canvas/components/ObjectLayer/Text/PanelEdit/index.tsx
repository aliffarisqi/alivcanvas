import React from 'react';
import { ScrollView, View } from 'react-native';
import Slider from '@react-native-community/slider';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { useTextStore } from '@/features/canvas/store/textStore';
import { styles } from './styles';
import { Colors, FontColors } from '@/app/theme/colors';
import SectionTitle from '@/components/text/SectionTitle';
import ColorSwatch from '@/components/button/ColorButton';
import TextButton from '@/components/button/TextButton';

const FontAdjustPanel: React.FC = () => {
  const { activeLayerId, layers, editFontSize, editColor, setActiveLayer, setEditingLayer } = useTextStore();

  const layer = layers.find((l) => l.id === activeLayerId);
  if (!layer) return null; 
  const handleDone = () => {
    setActiveLayer(null);   
    setEditingLayer(null);   
  };

  return (
    <Animated.View
      entering={FadeInUp}
      exiting={FadeOutDown}
      style={styles.panel}
    >
       <View style={styles.buttonRow}>
       <TextButton
          text="Done"
          onPress={handleDone}
          accessibilityLabel="Set font adjustments"
        />
       </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        pointerEvents="auto"
      >
        {/* --------- FONT SIZE EDIT---------- */}
        <SectionTitle title="Font Size" />
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
        {/* --------- COLOR EDIT ---------- */}
        <SectionTitle title="Font Color" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {FontColors.map((c) => (
            <ColorSwatch
              key={c}
              color={c}
              selected={c === layer.color}
              onSelect={(hex) => editColor(layer.id, hex)}
            />
          ))}
        </ScrollView>
      </ScrollView>

    </Animated.View>
  );
};

export default FontAdjustPanel;
