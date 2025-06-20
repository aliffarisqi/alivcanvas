import React, { useRef } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import WorkspaceView, { WorkspaceViewHandle } from '@/features/canvas/components/WorkspaceView';
import { Colors } from '@/app/theme/colors';
import CanvasBox from '../components/CanvasBox';
import TopToolbar from '../components/ToolBar/TopToolbar';
import BottomToolbar from '../components/ToolBar/BottomToolbar';
import { useTextStore } from '../store/textStore';
import TextLayer from '../components/Text/TextLayer';
import FontAdjustPanel from '../components/Text/PanelEdit';
import { useImageStore } from '../store/imageStore';
import { pickImageFromGallery } from '@/app/utils/pickImage';
import ImageLayer from '../components/Image/ImageLayer';

const CanvasEditorScreen: React.FC = () => {
  const workspaceRef = useRef<WorkspaceViewHandle>(null);
  const { layers, addLayer } = useTextStore();
  const { layers: imageLayers } = useImageStore();

  const { addImage } = useImageStore();

  const handleAddImage = async () => {
    const uri = await pickImageFromGallery();
    if (uri) addImage(uri);
  };

  return (
    <SafeAreaView style={styles.container}>
      <WorkspaceView ref={workspaceRef}>
        <CanvasBox />
       {layers.map((l) => (
          <TextLayer key={l.id} layer={l} />
        ))}
        {imageLayers.map((img) => <ImageLayer key={img.id} layer={img} />)}
      </WorkspaceView>
      <TopToolbar
        onAddText={addLayer}
        onAddImage={handleAddImage}
        onExport={() => {/* TODO */}}
      />
      <BottomToolbar onFocus={() => workspaceRef.current?.reset()}/>
      <FontAdjustPanel />
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
