import React from 'react';
import { View } from 'react-native';
import { Focus } from 'lucide-react-native';
import { styles } from './styles';
import IconButton from '@/components/button/IconButton';

export interface BottomToolbarProps {
  onFocus: () => void;
}

const BottomToolbar: React.FC<BottomToolbarProps> = ({
  onFocus,
  
}) => (
  <View style={styles.container}>
    <IconButton
      icon={Focus}
      onPress={onFocus}
      accessibilityLabel="Export"
    />
  </View>
);

export default BottomToolbar;
