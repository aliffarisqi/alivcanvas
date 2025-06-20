import { Platform, PermissionsAndroid } from 'react-native';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';

async function hasAndroidPermission(): Promise<boolean> {
  const targetSdkVersion = Platform.Version; 

  const checkPerm = async () => {
    if (targetSdkVersion >= "33") {
      const [readImages, readVideos, writeStorage] = await Promise.all([
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES),
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO),
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE), 
      ]);
     
      if (targetSdkVersion >= "33") {
        return readImages && readVideos; 
      } else {
        return writeStorage; 
      }
    } else {
      return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
    }
  };

  if (await checkPerm()) {
    return true;
  }

  const requestPerm = async () => {
    if (targetSdkVersion >= "33") {
      const statuses = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
      ]);
      return (
        statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] === PermissionsAndroid.RESULTS.GRANTED &&
        statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] === PermissionsAndroid.RESULTS.GRANTED
      );
    } else {
      const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      return status === PermissionsAndroid.RESULTS.GRANTED;
    }
  };

  return requestPerm();
}

export const saveToGallery = async (
  filePath: string,
  album: string = 'Pictures',
) => {
  if (Platform.OS === 'android') {
    const hasPermission = await hasAndroidPermission();
    if (!hasPermission) {
      throw new Error('Izin penyimpanan ditolak.');
    }
  }

  await CameraRoll.saveAsset(filePath, { album });
};