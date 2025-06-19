import { Metrics } from '@/app/theme/metrics';
import { Sizes } from '@/app/theme/siezs';
import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Sizes.paddingScreen,
    paddingVertical: Metrics.appBar,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 10,
  },
});
