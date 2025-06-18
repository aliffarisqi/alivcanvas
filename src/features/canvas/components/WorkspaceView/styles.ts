import { StyleSheet } from 'react-native';
import { Metrics } from '@/app/theme/metrics';
import { Colors } from '@/app/theme/colors';

const WORKSPACE_SIZE = Metrics.canvasSide * Metrics.workspaceMultiplier;

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',   
    alignItems: 'center',        
    overflow: 'hidden',          
    backgroundColor: Colors.background, 
  },
  workspace: {
    width: WORKSPACE_SIZE,
    height: WORKSPACE_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.workspaceBackground,
  },
});
