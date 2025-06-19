import React from 'react';
import { View } from 'react-native';
import { Text, Image, Download } from 'lucide-react-native';
import { styles } from './styles';
import IconButton from '@/components/button/IconButton';

export interface TopToolbarProps {
  onAddText: () => void;
  onAddImage: () => void;
  onExport: () => void;
}

const TopToolbar: React.FC<TopToolbarProps> = ({
  onAddText,
  onAddImage,
  onExport,
}) => (
  <View style={styles.container}>
    <View style={styles.leftGroup}>
      <IconButton
        icon={Text}
        onPress={onAddText}
        accessibilityLabel="Add text"
      />
      <IconButton
        icon={Image}
        onPress={onAddImage}
        accessibilityLabel="Add image"
      />
    </View>

    <IconButton
      icon={Download}
      onPress={onExport}
      accessibilityLabel="Export"
    />
  </View>
);

export default TopToolbar;
