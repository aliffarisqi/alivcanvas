import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { styles } from './styles';


export interface CanvasBoxProps extends PropsWithChildren {
}

const CanvasBox: React.FC<CanvasBoxProps> = ({ children }) => (
  <View style={styles.canvas}>{children}</View>
);

export default CanvasBox;