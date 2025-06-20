import React from 'react';
import { View, Image } from 'react-native';
import { styles } from './styles';
import { useCanvasStore } from '@/features/canvas/store/canvasStore';

const CanvasBox: React.FC<React.PropsWithChildren> = ({ children }) => {
  const backgroundImage = useCanvasStore((s) => s.backgroundImage);

  return (
    <View style={styles.canvas}>
      {backgroundImage && (
        <Image
          source={backgroundImage}
          style={styles.image}
        />
      )}
      {children}
    </View>
  );
};

export default CanvasBox;
