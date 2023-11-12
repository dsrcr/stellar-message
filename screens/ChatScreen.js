import { useCallback, useLayoutEffect, useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { GiftedChat, Actions, openEmojiPicker } from 'react-native-gifted-chat';
import { auth, database } from '../config/firebaseConfig';
import { addDoc, collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { Avatar } from '@rneui/themed';
import tw from 'twrnc';

export default function ChatScreen({ navigation, route }) {
  const [messages, setMessages] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Chat',
      headerBackTitleVisible: false,
      headerTitleAlign: 'left',
      headerTitle: () => (
        <View style={tw`flex flex-row items-center gap-2`}>
          <Avatar
            rounded
            source={{
              uri: 'https://img.favpng.com/22/13/18/stock-photography-businessperson-business-man-advertising-royalty-free-png-favpng-Mb7i3HLqZYr4A0wXwFra78VBU.jpg',
            }}
          />
          <Text>{route.params.chatName}</Text>
        </View>
      ),
    });
  }, [navigation]);
  console.log(route.params.chatName);

  useLayoutEffect(() => {
    const reference = collection(database, 'chats');
    const chatQuery = query(
      reference,
      where('name', '==', route.params.chatName),
      orderBy('createdAt', 'desc'),
    );
    const unsubscribe = onSnapshot(chatQuery, (snapshot) => {
      snapshot.docs.map((doc) => console.log(doc.data()));
    });
  }, []);
  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
  }, []);
  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      placeholder="Text message"
      renderActions={() => (
        <Actions
          onPressActionButton={openEmojiPicker}
          icon={() => <AntDesign name="smile-circle" size={24} color={'#1976D2'} />}
        />
      )}
      user={{
        _id: auth?.currentUser.email,
        avatar: auth?.currentUser.photoURL,
      }}
      messagesContainerStyle={{
        backgroundColor: '#fff',
      }}
    />
  );
}
