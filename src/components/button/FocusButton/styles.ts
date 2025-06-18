import { StyleSheet } from 'react-native';
import { Colors } from '@/app/theme/colors';
import { Sizes } from '@/app/theme/siezs';

export const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    top: 50,
    right: 24,
    backgroundColor: Colors.buttonColor,
    padding: Sizes.paddingButtonM,
    borderRadius: Sizes.radiusM,
  },
  icon: {
    color: Colors.white, 
  },
});
