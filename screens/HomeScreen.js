import { View, Text, Pressable, ScrollView, SafeAreaView } from 'react-native';
import { useEffect, useLayoutEffect, useState, useCallback } from 'react';
import { auth, database, db } from '../config/firebaseConfig';
import { Avatar } from '@rneui/base';
import { AntDesign, FontAwesome, FontAwesome5, SimpleLineIcons } from '@expo/vector-icons';
import tw, { useAppColorScheme, useDeviceContext } from 'twrnc';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { Button, Switch } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage, getLanguage } from '../features/settingsSlice';
import ChatListItem from '../components/ChatListItem';
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function HomeScreen({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [chats, setChats] = useState([]);
  const [recipientChats, setRecipientChats] = useState([]);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  useDeviceContext(tw, { withDeviceColorScheme: false });
  const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw);
  const signOut = () => {
    auth.signOut().then(() => {
      navigation.replace('Login');
    });
  };

  console.log(auth.currentUser);
  console.log('chats', chats);

  useEffect(() => {
    const q = query(collection(database, 'chats'));
    const reference = collection(database, 'chats');
    const chatQuery = query(reference, where('owner', '==', auth.currentUser.email));
    const unsubscribe = onSnapshot(chatQuery, (snapshot) => {
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        })),
      );
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const q = query(collection(database, 'chats'));
    const reference = collection(database, 'chats');
    const chatQuery = query(reference, where('recipient', '==', auth.currentUser.email));
    const unsubscribe = onSnapshot(chatQuery, (snapshot) => {
      setRecipientChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        })),
      );
    });
    return unsubscribe;
  }, []);

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
          <View style={tw`flex-row flex justify-between mr-2 items-center gap-4`}>
            <Pressable>
              <FontAwesome name="camera" size={24} color={'gray'} />
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Memory')}>
              <FontAwesome name="tv" size={24} color={'gray'} />
            </Pressable>
          </View>
        );
      },
    });
  }, [navigation]);
  return (
    <GestureHandlerRootView style={tw`flex flex-1`}>
      <ScrollView>
        {chats.map((chat) => (
          <ChatListItem chatName={chat.chatName} key={chat.id} id={chat.id} />
        ))}
        {recipientChats.map((chat) => (
          <ChatListItem chatName={chat.chatName} key={chat.id} id={chat.id} />
        ))}
      </ScrollView>
      <View style={tw`justify-end items-end flex`}>
        <Pressable
          onPress={() => navigation.navigate('CreateChat')}
          style={tw`w-16 h-16 rounded-full items-center mr-8 mb-8 justify-center bg-[#808080]`}>
          <FontAwesome name="envelope" color={'white'} size={24} />
        </Pressable>
      </View>
    </GestureHandlerRootView>
  );
}
