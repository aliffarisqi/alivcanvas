import { StyleSheet } from 'react-native';
import { Colors } from '@/app/theme/colors';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',   
    alignItems: 'center',        
    overflow: 'hidden',          
    backgroundColor: Colors.background, 
  },
  workspace: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.workspaceBackground,
  },
});
