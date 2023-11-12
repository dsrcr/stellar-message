import { ListItem, Avatar } from '@rneui/themed';
import tw from 'twrnc';

export default function ChatListItem({ id, chatName, enterChat, url }) {
  return (
    <ListItem key={id} bottomDivider onPress={() => enterChat(id, chatName)}>
      <Avatar
        rounded
        source={{
          uri: 'https://img.favpng.com/22/13/18/stock-photography-businessperson-business-man-advertising-royalty-free-png-favpng-Mb7i3HLqZYr4A0wXwFra78VBU.jpg',
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: '500' }}>{chatName}</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          This is a test subtitle
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
}
