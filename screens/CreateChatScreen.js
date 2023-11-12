import { useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { database } from '../config/firebaseConfig';
import UserListItem from '../components/UserListItem';

export default function CreateChatScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const userQuery = query(collection(database, 'users'));
    const unsubscribe = onSnapshot(userQuery, (snapshot) => {
      setUsers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        })),
      );
    });
    return unsubscribe;
  }, []);

  console.log(users);

  return (
    <SafeAreaView>
      <ScrollView>
        {users.map((user) => (
          <UserListItem
            username={user.data.name}
            email={user.data.email}
            key={user.id}
            id={user.id}
            url={user.data.url}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
