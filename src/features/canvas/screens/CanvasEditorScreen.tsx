import React, { useRef } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import WorkspaceView, { WorkspaceViewHandle } from '@/features/canvas/components/WorkspaceView';
import { Colors } from '@/app/theme/colors';
import CanvasBox, { CanvasBoxHandle } from '../components/CanvasBox';
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
import { saveToGallery } from '../utils/config/saveImage';


const CanvasEditorScreen: React.FC = () => {
  const workspaceRef = useRef<WorkspaceViewHandle>(null);

  //----TEXT AND IMAGE LAYERS----
  const { layers, addLayer } = useTextStore();
  const { layers: imageLayers } = useImageStore();

  //----CANVAS STORE----
  const activePanel       = useCanvasStore((s) => s.activePanel);
  const setActivePanel    = useCanvasStore((s) => s.setActivePanel);
  const canvasRef = useRef<CanvasBoxHandle>(null);


  const { addImage } = useImageStore();

  const handleAddImage = async () => {
    const uri = await pickImageFromGallery();
    if (uri) addImage(uri);
  };
  const handleExport = async () => {
  try {
    const path = await canvasRef.current?.export();
    if (!path) return;
    await saveToGallery(path, 'MyCanvas'); 
    Alert.alert('Berhasil', 'Gambar tersimpan di galeri');
  } catch (e: any) {
    Alert.alert('Gagal', e.message ?? 'Export gagal');
  }
};

  return (
    <View style={styles.container}>
      <WorkspaceView ref={workspaceRef}>
        <CanvasBox ref={canvasRef}/>
        {layers.map((l) => (
            <TextLayer key={l.id} layer={l} />
          ))}
          {imageLayers.map((img) => <ImageLayer key={img.id} layer={img} />
        )}
      </WorkspaceView>
      <TopToolbar
        onAddText={addLayer}
        onAddImage={handleAddImage}
        onTemplate={() => setActivePanel('template')}
        onExport={handleExport}
      />
      <BottomToolbar onFocus={() => workspaceRef.current?.reset()}/>

      {activePanel === 'font' && <FontAdjustPanel />}
      {activePanel === 'template' && <TemplatePanel />}
    </View>
  );
};

export default CanvasEditorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
