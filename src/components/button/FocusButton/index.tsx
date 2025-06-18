import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Focus } from 'lucide-react-native';
import { styles } from './styles';
import { Sizes } from '@/app/theme/siezs';

export interface FocusButtonProps {
  onPress: () => void;
}

const FocusButton: React.FC<FocusButtonProps> = ({ onPress }) => (
  <TouchableOpacity
    style={styles.fab}
    onPress={onPress}
    accessibilityRole="button"
    accessibilityLabel="Reset view"
  >
    <Focus size={Sizes.iconL} color={styles.icon.color} />
  </TouchableOpacity>
);

export default FocusButton;
