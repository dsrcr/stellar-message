import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Button,
  Switch,
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { useEffect, useLayoutEffect, useState, useCallback } from 'react';
import { auth, database, db } from '../config/firebaseConfig';
import { Avatar } from '@rneui/base';
import { AntDesign, FontAwesome5, SimpleLineIcons } from '@expo/vector-icons';
import { collection, onSnapshot, query } from 'firebase/firestore';
import tw, { useAppColorScheme, useDeviceContext } from 'twrnc';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

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

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: tw`text-black dark:text-white`,
      },
      headerTitleStyle: {
        color: tw`text-black dark:text-white`,
      },
      headerTintColor: 'black',
      headerLeft: () => {
        return (
          <View style={tw`mr-4`}>
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
              <MenuOptions>
                <MenuOption onSelect={signOut}>
                  <Text style={tw`text-base`}>Logout</Text>
                </MenuOption>
                <MenuOption
                  customStyles={{
                    optionTouchable: { title: 'Button' },
                  }}
                  value={<Switch />}
                />
              </MenuOptions>
            </Menu>
          </View>
        );
      },
      headerRight: () => {
        return (
          <View style={tw`flex-row flex justify-between mr-2 items-center`}>
            <Pressable>
              <AntDesign name="camerao" size={24} color={'black'} />
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

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 80,
    marginRight: 20,
  },
});
