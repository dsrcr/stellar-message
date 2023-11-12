import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { View } from 'react-native';
import { Camera } from 'expo-camera';
import { Audio } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';

export default function CameraScreen({ navigation }) {
  const [hasCameraPermissions, setHasCameraPermissions] = useState(false);
  const [hasAudioPermissions, setHasAudioPermissions] = useState(false);
  const [hasGalleryPermissions, setHasGalleryPermissions] = useState(false);
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermissions(cameraStatus.status == 'granted');

      const audioStatus = await Audio.requestPermissionsAsync();
      setHasAudioPermissions(audioStatus.status == 'granted');

      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermissions(galleryStatus.status == 'granted');
    })();
  }, []);
  return (
    <View>
      <Text>Camera Screen</Text>
    </View>
  );
}
