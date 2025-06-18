import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { styles } from './styles';


export interface CanvasBoxProps extends PropsWithChildren {
  // Properti nanti (pada langkah zoom) bisa ditambah di sini
}

const CanvasBox: React.FC<CanvasBoxProps> = ({ children }) => (
  // Kotak kerja; children = layer teks/gambar yang akan kita tambahkan nanti
  <View style={styles.canvas}>{children}</View>
);

export default CanvasBox;