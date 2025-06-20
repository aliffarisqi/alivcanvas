import React, { useRef } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import WorkspaceView, { WorkspaceViewHandle } from '@/features/canvas/components/WorkspaceView';
import { Colors } from '@/app/theme/colors';
import CanvasBox from '../components/CanvasBox';
import TopToolbar from '../components/ToolBar/TopToolbar';
import BottomToolbar from '../components/ToolBar/BottomToolbar';
import { useTextStore } from '../store/textStore';
import TextLayer from '../components/ObjectLayer/Text/TextLayer';
import FontAdjustPanel from '../components/ObjectLayer/Text/PanelEdit';
import { useImageStore } from '../store/imageStore';
import { pickImageFromGallery } from '@/app/utils/pickImage';
import ImageLayer from '../components/ObjectLayer/ImageLayer';
import { useCanvasStore } from '../store/canvasStore';
import TemplatePanel from '../components/CanvasBox/TemplateImage';

const CanvasEditorScreen: React.FC = () => {
  const workspaceRef = useRef<WorkspaceViewHandle>(null);

  //----TEXT AND IMAGE LAYERS----
  const { layers, addLayer } = useTextStore();
  const { layers: imageLayers } = useImageStore();

  //----CANVAS STORE----
  const isTemplatePanelVisible = useCanvasStore((s) => s.isTemplatePanelVisible);
  const setIsTemplatePanelVisible = useCanvasStore((s) => s.setIsTemplatePanelVisible);

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
        onTemplate={() => setIsTemplatePanelVisible(true)}
        onExport={() => {
        }}
      />
      <BottomToolbar onFocus={() => workspaceRef.current?.reset()}/>
      <FontAdjustPanel />
      {isTemplatePanelVisible && (
        <TemplatePanel/>
      )}
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
