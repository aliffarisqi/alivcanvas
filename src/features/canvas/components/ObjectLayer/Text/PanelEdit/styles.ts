import { StyleSheet } from 'react-native';
import { Colors } from '@/app/theme/colors';
import { Sizes } from '@/app/theme/siezs';
import { Metrics } from '@/app/theme/metrics';

export const styles = StyleSheet.create({
  panel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: Metrics.panelHeight,
    backgroundColor: Colors.buttonColor,
    borderTopLeftRadius: Sizes.radiusXL,
    borderTopRightRadius: Sizes.radiusXL,
    padding: Sizes.paddingScreen,
    paddingTop: Sizes.paddingScreen,
    zIndex:20,
  },
  title: {
    fontSize: Sizes.fontM,
    marginBottom: 16,
    color: Colors.white,
  },
  slider: { width: '100%',marginBottom: Sizes.spaceXL*2, },
  doneBtn: {
    alignSelf: 'flex-end',
    marginBottom: Sizes.spaceXL,
    paddingHorizontal: Sizes.paddingButtonMH,
    paddingVertical: Sizes.paddingButtonMV,
    backgroundColor: Colors.white,
    borderRadius: Sizes.radiusM,
  },
    buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
