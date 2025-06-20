import { Sizes } from '@/app/theme/siezs';
import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Sizes.paddingScreen,
    paddingVertical:Sizes.paddingScreen,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Sizes.spaceXL,
  },
});
