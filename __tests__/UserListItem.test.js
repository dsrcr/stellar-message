import React from 'react';
import renderer from 'react-test-renderer';
import UserListItem from '../components/UserListItem';

describe('ChatListItem', () => {
  const mockEnterChat = jest.fn();

  const testData = {
    id: '1',
    chatName: 'Test Chat',
  };

  test('renders UserListItem correctly', () => {
    const tree = renderer.create(<UserListItem {...testData} enterChat={mockEnterChat} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
