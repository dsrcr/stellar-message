import renderer from 'react-test-renderer';
import ChatListItem from '../components/ChatListItem';

describe('ChatListItem', () => {
  const mockEnterChat = jest.fn();

  const testData = {
    id: '1',
    chatName: 'Test Chat',
  };

  test('renders ChatListItem correctly', () => {
    const tree = renderer.create(<ChatListItem {...testData} enterChat={mockEnterChat} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
