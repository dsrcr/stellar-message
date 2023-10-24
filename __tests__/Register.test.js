import React from 'react';
import renderer from 'react-test-renderer';

import RegisterScreen from '../screens/RegisterScreen';

describe('<RegisterScreen />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<RegisterScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
