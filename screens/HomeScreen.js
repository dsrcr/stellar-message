import { StyleSheet, SafeAreaView, ScrollView, View, Text, Pressable } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { useEffect, useLayoutEffect, useState, useCallback } from 'react';
import { auth, database, db } from '../config/firebaseConfig';
import { Avatar } from '@rneui/base';
import { AntDesign, FontAwesome5, SimpleLineIcons } from '@expo/vector-icons';
import { collection, onSnapshot, query } from 'firebase/firestore';
import tw from 'twrnc';

export default function HomeScreen({ navigation }) {
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
        backgroundColor: 'white',
      },
      headerTitleStyle: {
        color: 'black',
      },
      headerTintColor: 'black',
      headerLeft: () => {
        return (
          <View style={tw`mr-4`}>
            <Pressable activeOpacity={0.5} onPress={signOut}>
              <Avatar
                rounded
                source={{
                  uri:
                    auth?.currentUser?.photoURL ||
                    'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
                }}
              />
            </Pressable>
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
  return <Text>Home</Text>;
}

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 80,
    marginRight: 20,
  },
});
