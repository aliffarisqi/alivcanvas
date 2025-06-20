import { StyleSheet } from 'react-native';
import { Colors } from '@/app/theme/colors';
import { Sizes } from '@/app/theme/siezs';

export const styles = StyleSheet.create({
  panel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 300,
    backgroundColor: Colors.buttonColor,
    borderTopLeftRadius: Sizes.radiusXL,
    borderTopRightRadius: Sizes.radiusXL,
    padding: Sizes.paddingScreen,
    zIndex:20,
  },
  title: {
    fontSize: Sizes.fontM,
    marginBottom: 16,
    color: Colors.white,
  },
  slider: { width: '100%' },
});
