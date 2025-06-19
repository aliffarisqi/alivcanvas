import React from 'react';
import { TouchableOpacity } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { styles } from './styles';

export interface IconButtonProps {
  icon: LucideIcon;
  onPress: () => void;
  accessibilityLabel: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  onPress,
  accessibilityLabel,
}) => (
  <TouchableOpacity
    style={styles.fab}
    onPress={onPress}
    accessibilityRole="button"
    accessibilityLabel={accessibilityLabel}
  >
    <Icon size={20} color={styles.icon.color} />
  </TouchableOpacity>
);

export default IconButton;
