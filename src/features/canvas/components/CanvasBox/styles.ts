import { StyleSheet } from 'react-native';
import { Metrics } from '@/app/theme/metrics';
import { Colors } from '@/app/theme/colors';


export const styles = StyleSheet.create({
  canvas: {
    width: Metrics.canvasSide,
    height: Metrics.canvasSide,
    backgroundColor: Colors.canvasColor,
    borderRadius: Metrics.borderRadius,
    borderWidth: Metrics.borderWidth,
    borderColor: Colors.canvasBorder,
    overflow: 'hidden',
  },
  image:{
    width: Metrics.canvasSide,
    height: Metrics.canvasSide,
    resizeMode:"cover"
  }
});