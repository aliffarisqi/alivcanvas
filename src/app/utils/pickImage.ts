import { launchImageLibrary, ImageLibraryOptions } from 'react-native-image-picker';

export const pickImageFromGallery = async (): Promise<string | null> => {
  const options: ImageLibraryOptions = {
    mediaType: 'photo',
    quality: 0.8,
    selectionLimit: 1,
  };

  const res = await launchImageLibrary(options);
  if (res.didCancel || !res.assets?.[0]?.uri) return null;
  return res.assets[0].uri;
};
