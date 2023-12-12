import { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import { auth, database } from '../config/firebaseConfig';

export const getPostsByUserId = (uid = auth.currentUser.uid) =>
  new Promise((resolve) => {
    database
      .collection('memories')
      .where('creator', '==', uid)
      .orderBy('creation', 'desc')
      .onSnapshot((snapshot) => {
        let posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        resolve(posts);
      });
  });

export const getFeed = () =>
  new Promise((resolve) => {
    database
      .collection('memories')
      .get()
      .then((res) => {
        let memories = res.docs.map((value) => {
          const id = value.id;
          const data = value.data();
          return { id, ...data };
        });
        resolve(memories);
      });
  });

export default function MemoryScreen() {
  const { setCurrentUserProfileItemInView, profile } = route.params;
  const [memories, setMemories] = useState([]);
  const mediaRefs = useRef([]);

  useEffect(() => {
    if (profile) {
      getPostsByUserId(auth?.currentUser?.email).then(setMemories);
    }
  }, []);

  const onViewableItemsChanged = useRef(({ changed }) => {
    changed.forEach((element) => {
      const cell = mediaRefs.current[element.key];
      if (cell) {
        if (element.isViewable) {
          if (!profile) {
            setCurrentUserProfileItemInView(element.item.creator);
          }
          cell.play();
        } else {
          cell.stop();
        }
      }
    });
  });

  const feedItemHeight = Dimensions.get('window').height;

  const renderItem = ({ item }) => {
    return (
      <View style={{ height: feedItemHeight, backgroundColor: 'black' }}>
        <Post item={item} ref={(PostRef) => (mediaRefs.current[item.id] = PostRef)} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={memories}
        windowSize={4}
        initialNumToRender={0}
        maxToRenderPerBatch={2}
        removeClippedSubviews
        viewabilityConfig={{
          itemVisiblePercentThreshold: 0,
        }}
        renderItem={renderItem}
        pagingEnabled
        keyExtractor={(item) => item.id}
        decelerationRate={'normal'}
        onViewableItemsChanged={onViewableItemsChanged.current}
      />
    </View>
  );
}
