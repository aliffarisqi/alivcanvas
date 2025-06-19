import React, { useRef } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import WorkspaceView, { WorkspaceViewHandle } from '@/features/canvas/components/WorkspaceView';
import { Colors } from '@/app/theme/colors';
import CanvasBox from '../components/CanvasBox';
import TopToolbar from '../components/TopToolbar';
import BottomToolbar from '../components/BottomToolbar';

const CanvasEditorScreen: React.FC = () => {
  const workspaceRef = useRef<WorkspaceViewHandle>(null);

  return (
    <SafeAreaView style={styles.container}>
      <WorkspaceView ref={workspaceRef}>
        <CanvasBox />
      </WorkspaceView>
      <TopToolbar
        onAddText={() => {/* TODO */}}
        onAddImage={() => {/* TODO */}}
        onExport={() => {/* TODO */}}
      />
      <BottomToolbar onFocus={() => workspaceRef.current?.reset()}/>
    </SafeAreaView>
  );
};

export default CanvasEditorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
