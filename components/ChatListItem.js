import { ListItem, Avatar } from '@rneui/themed';
import tw from 'twrnc';

export default function ChatListItem({ id, chatName, enterChat, chatImage }) {
  return (
    <ListItem key={id} bottomDivider onPress={() => enterChat(id, chatName)}>
      <Avatar
        rounded
        source={{
          uri: 'https://exhibitdev.files.wordpress.com/2014/01/bch8ogfcyaadpji-jpg-large.jpeg',
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: '800' }}>{chatName}</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          This is a test subtitle
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
}
