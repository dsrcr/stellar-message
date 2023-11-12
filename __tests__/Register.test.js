import React from 'react';
import renderer from 'react-test-renderer';

import RegisterScreen from '../screens/RegisterScreen';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

describe('<RegisterScreen />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<RegisterScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
