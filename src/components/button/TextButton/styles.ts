import { StyleSheet } from 'react-native';
import { Colors } from '@/app/theme/colors';
import { Sizes } from '@/app/theme/siezs';

export const styles = StyleSheet.create({
  fab: {
    alignSelf: 'flex-end',
    marginBottom: Sizes.spaceXL,
    paddingHorizontal: Sizes.paddingButtonMH,
    paddingVertical: Sizes.paddingButtonMV,
    backgroundColor: Colors.white,
    borderRadius: Sizes.radiusM,
  },
  icon: {
    color: Colors.white,
  },
});
