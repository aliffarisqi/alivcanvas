import React from 'react';
import { Image, ScrollView, Pressable, View } from 'react-native';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { useCanvasStore } from '@/features/canvas/store/canvasStore';
import { styles } from './styles';
import IconButton from '@/components/button/IconButton';
import { RotateCcw } from 'lucide-react-native';
import TextButton from '@/components/button/TextButton';
import { useTextStore } from '@/features/canvas/store/textStore';

const templateImages = [
  require('@/assets/templates/template1.jpg'),
  require('@/assets/templates/template2.jpg'),
  require('@/assets/templates/template3.jpg'),
  require('@/assets/templates/template4.jpg'),
  require('@/assets/templates/template5.jpg'),
];

const TemplatePanel: React.FC = () => {
  const setBackgroundImage = useCanvasStore(s => s.setBackgroundImage);
  const backgroundImage = useCanvasStore(s => s.backgroundImage);
  const setActivePanel = useCanvasStore((s) => s.setActivePanel);
  const {setEditingLayer } = useTextStore();
  
  const handleDone = () => {
    setActivePanel(null)   
    setEditingLayer(null);   
  };

  return (
    <Animated.View
      entering={FadeInUp}
      exiting={FadeOutDown}
      style={styles.panel}
    >
        <View style={styles.buttonRow}>
          <IconButton
            icon={RotateCcw}
            onPress={()=>setBackgroundImage(null)}
            accessibilityLabel="Reset background image"
          />
          <TextButton
            text="Done"
            onPress={handleDone}
            accessibilityLabel="Set background image"
          />
        </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {templateImages.map((img, index) => {
          const isSelected = backgroundImage === img;

          return (
            <Pressable
              key={index}
              onPress={() => setBackgroundImage(img)}
              style={styles.press}
            >
              <Image source={img} style={[styles.image,  isSelected && styles.selectedBorder]} />
            </Pressable>
          );
        })}

      </ScrollView>
    </Animated.View>
  );
};

export default TemplatePanel;
