import { useEffect, useState } from 'react';
import { Pressable, Text, Image } from 'react-native';
import { View } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { Audio } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { useIsFocused } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import tw from 'twrnc';

export default function CameraScreen({ navigation }) {
  const [hasCameraPermissions, setHasCameraPermissions] = useState(false);
  const [hasAudioPermissions, setHasAudioPermissions] = useState(false);
  const [hasGalleryPermissions, setHasGalleryPermissions] = useState(false);
  const [hasMediaLibraryPermissions, setHasMediaLibraryPermissions] = useState(false);
  const [ref, setRef] = useState();
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [isReady, setIsReady] = useState(false);

  const [gallery, setGallery] = useState();
  const focused = useIsFocused();

  const recordVideo = async () => {
    if (ref) {
      try {
        const options = { maxDuration: 60, quality: Camera.Constants.VideoQuality['480'] };
        const videoRecord = ref.recordAsync(options);
        if (videoRecord) {
          const data = await videoRecord;
          const source = data.uri;
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const stopRecording = async () => {
    if (ref) {
      ref.stopRecording();
    }
  };

  const pickItem = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing,
      aspect: [16, 9],
      quality: 1,
    });
    if (!result.canceled) {
      // add to database
    }
  };

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermissions(cameraStatus.status == 'granted');

      const audioStatus = await Audio.requestPermissionsAsync();
      setHasAudioPermissions(audioStatus.status == 'granted');

      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermissions(galleryStatus.status == 'granted');

      if (galleryStatus.status == 'granted') {
        const useGalleryContent = await MediaLibrary.getAssetsAsync({
          sortBy: ['creationTime'],
          mediaType: ['video'],
        });
        setGallery(useGalleryContent.assets);
      }
    })();
  }, []);

  if (!hasCameraPermissions || !hasAudioPermissions) {
    return <View></View>;
  } else {
    return (
      <View style={{}}>
        {focused ? (
          <Camera
            ref={(ref) => setRef(ref)}
            ratio={'16:9'}
            flashMode={flash}
            type={type}
            onCameraReady={() => setIsReady(true)}
            style={{ flex: 1, backgroundColor: 'black', aspectRatio: 9 / 16 }}
          />
        ) : null}
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            flexDirection: 'row',
            marginBottom: 30,
            alignItems: 'center',
          }}>
          <View style={{ top: 60, marginHorizontal: 20, right: 0, position: 'absolute' }}>
            <Pressable
              style={{ alignItems: 'center', marginBottom: 25 }}
              onPress={() =>
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back,
                )
              }>
              <Feather name="refresh-ccw" size={24} color={'white'}></Feather>
              <Text style={{ fontSize: 12, color: 'white', marginTop: 5 }}>Flip</Text>
            </Pressable>
            <Pressable
              style={tw`self-center mb-16`}
              onPress={() =>
                setFlash(
                  type === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.off
                    : Camera.Constants.FlashMode.on,
                )
              }>
              <Feather name="zap" size={24} color={'white'}></Feather>
              <Text style={tw`mt-2 font-white`}>Flash</Text>
            </Pressable>
          </View>
          <View style={tw`flex-1 mx-8`}>
            <Pressable
              onLongPress={() => recordVideo()}
              onPressOut={() => stopRecording()}
              style={tw`border-8 h-16 border-white self-center rounded`}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Pressable
              onPress={() => pickItem()}
              style={tw`w-16 h-16 hidden border-white rounded border-2 overflow-hidden`}>
              {gallery[0] == undefined ? (
                <></>
              ) : (
                <Image style={tw`w-16 h-16`} source={{ uri: gallery[0] }} />
              )}
            </Pressable>
          </View>
        </View>
      </View>
    );
  }
}
