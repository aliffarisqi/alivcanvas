import { Dimensions, ScaledSize } from 'react-native';
import { useState, useEffect } from 'react';

// FOR STATIC
export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;


// FOR DINAMIS
export const useScreenDimensions = (): ScaledSize => {
  const [screenDimensions, setScreenDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  return screenDimensions;
};