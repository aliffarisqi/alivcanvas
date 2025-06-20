import React from 'react';
import { Pressable, View } from 'react-native';
import { styles } from './styles';

interface Props {
  color: string;
  selected: boolean;
  onSelect: (hex: string) => void;
}

const ColorSwatch: React.FC<Props> = ({ color, selected, onSelect }) => (
  <Pressable onPress={() => onSelect(color)}>
    <View
      style={[
        styles.circle,
        { backgroundColor: color, borderWidth: selected ? 3 : 0 },
      ]}
    />
  </Pressable>
);

export default ColorSwatch;
