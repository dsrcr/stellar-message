import { ListItem, Avatar } from '@rneui/themed';
import tw from 'twrnc';

export default function UserListItem({ id, username, email, enterChat, url }) {
  return (
    <ListItem key={id} bottomDivider>
      <Avatar
        rounded
        source={{
          uri: url,
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: '600' }}>{username}</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {email}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
}
