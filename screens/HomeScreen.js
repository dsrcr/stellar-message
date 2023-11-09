import { View, Text, Pressable } from 'react-native';
import { useEffect, useLayoutEffect, useState, useCallback } from 'react';
import { auth, database, db } from '../config/firebaseConfig';
import { Avatar } from '@rneui/base';
import { AntDesign, FontAwesome, FontAwesome5, SimpleLineIcons } from '@expo/vector-icons';
import tw, { useAppColorScheme, useDeviceContext } from 'twrnc';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { Switch } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage, getLanguage } from '../features/settingsSlice';

export default function HomeScreen({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  useDeviceContext(tw, { withDeviceColorScheme: false });
  const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw);
  const signOut = () => {
    auth.signOut().then(() => {
      navigation.replace('Login');
    });
  };

  const dispatch = useDispatch();
  console.log(getLanguage);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        // backgroundColor: tw`text-black dark:text-white`,
      },
      headerTitleStyle: {
        // color: tw`text-black dark:text-white`,
      },
      headerTintColor: 'black',
      headerLeft: () => {
        return (
          <View style={tw`m-4`}>
            <Menu>
              <MenuTrigger>
                <Avatar
                  rounded
                  source={{
                    uri:
                      auth?.currentUser?.photoURL ||
                      'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
                  }}
                />
              </MenuTrigger>
              <MenuOptions customStyles={tw`flex flex-row`}>
                <MenuOption onSelect={signOut}>
                  <View style={tw`flex flex-row items-center justify-center`}>
                    <Text style={tw`text-base items-center`}>Logout</Text>
                  </View>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
        );
      },
      headerRight: () => {
        return (
          <View style={tw`flex-row flex justify-between mr-2 items-center`}>
            <Pressable>
              <FontAwesome name="camera" size={24} color={'gray'} />
            </Pressable>
          </View>
        );
      },
    });
  }, [navigation]);
  return (
    <View>
      <Text>Hello world!</Text>
    </View>
  );
}
