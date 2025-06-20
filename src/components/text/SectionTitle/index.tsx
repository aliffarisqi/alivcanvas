import React from 'react';
import { Text } from 'react-native';
import { styles } from './styles';

interface Props { title: string }
const SectionTitle: React.FC<Props> = ({ title }) => (
  <Text style={styles.title}>{title}</Text>
);
export default SectionTitle;
