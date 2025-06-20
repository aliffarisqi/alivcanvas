import React, { forwardRef } from 'react';
import { Image } from 'react-native';
import { styles } from './styles';
import { useCanvasStore } from '@/features/canvas/store/canvasStore';
import ViewShot, { captureRef } from 'react-native-view-shot';

export interface CanvasBoxHandle {
  export: () => Promise<string>;      
}

const CanvasBox = forwardRef<CanvasBoxHandle, React.PropsWithChildren>(
  ({ children }, ref) => {
  const backgroundImage = useCanvasStore((s) => s.backgroundImage);
  const shotRef = React.useRef<ViewShot>(null);

  const exportPNG = async () => {
      if (!shotRef.current) throw new Error('No ref');
      return await captureRef(shotRef.current, {
        format: 'png',
        quality: 1,
      });
    };

  React.useImperativeHandle(ref, () => ({ export: exportPNG }));

  return (
      <ViewShot ref={shotRef} style={styles.canvas}>
        {backgroundImage && (
          <Image
            source={backgroundImage}
            style={styles.image}
          />
        )}
        {children}
      </ViewShot>
    );
  },
);

export default CanvasBox;
