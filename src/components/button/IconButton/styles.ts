import { StyleSheet } from 'react-native';
import { Colors } from '@/app/theme/colors';
import { Sizes } from '@/app/theme/siezs';

export const styles = StyleSheet.create({
  fab: {
    padding: Sizes.paddingButtonM,
    borderRadius: Sizes.radiusM,
    backgroundColor: Colors.buttonColor,
    opacity:0.7
  },
  icon: {
    color: Colors.white,
  },
});
