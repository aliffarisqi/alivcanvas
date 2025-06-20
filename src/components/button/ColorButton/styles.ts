import { StyleSheet } from 'react-native';
import { Colors } from '@/app/theme/colors';
import { Sizes } from '@/app/theme/siezs';

export const styles = StyleSheet.create({
  circle: {
    width: 36,
    height: 36,
    borderRadius: Sizes.radius2XL,
    marginHorizontal: 6,
    borderColor: Colors.white,
  },
});
