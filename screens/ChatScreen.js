import { useCallback, useLayoutEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Actions, GiftedChat } from 'react-native-gifted-chat';
import { auth } from '../config/firebaseConfig';
import { addDoc } from 'firebase/firestore';
import { Avatar } from '@rneui/themed';

export default function ChatScreen({ navigation, route }) {
  return <Text>Chat</Text>;
}
