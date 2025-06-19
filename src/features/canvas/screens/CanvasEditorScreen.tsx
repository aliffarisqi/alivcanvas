import React, { useRef } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import WorkspaceView, { WorkspaceViewHandle } from '@/features/canvas/components/WorkspaceView';
import { Colors } from '@/app/theme/colors';
import CanvasBox from '../components/CanvasBox';
import TopToolbar from '../components/ToolBar/TopToolbar';
import BottomToolbar from '../components/ToolBar/BottomToolbar';
import { useTextStore } from '../store/textStore';
import TextLayer from '../components/Text/TextStatic';

const CanvasEditorScreen: React.FC = () => {
  const workspaceRef = useRef<WorkspaceViewHandle>(null);
  const { layers, addLayer } = useTextStore();

  return (
    <SafeAreaView style={styles.container}>
      <WorkspaceView ref={workspaceRef}>
        <CanvasBox />
       {layers.map((l) => (
          <TextLayer key={l.id} layer={l} />
        ))}
      </WorkspaceView>
      <TopToolbar
        onAddText={addLayer}
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
