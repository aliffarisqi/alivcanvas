import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

export interface TextButtonProps {
  text: String;
  onPress: () => void;
  accessibilityLabel: string;
}

const TextButton: React.FC<TextButtonProps> = ({
  text,
  onPress,
  accessibilityLabel,
}) => (
  <TouchableOpacity
    style={styles.fab}
    onPress={onPress}
    accessibilityRole="button"
    accessibilityLabel={accessibilityLabel}
  >
   <Text>{text}</Text>
  </TouchableOpacity>
);

export default TextButton;
