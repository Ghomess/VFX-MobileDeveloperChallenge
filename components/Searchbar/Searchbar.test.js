import React, {useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from '../../redux/store';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import {Searchbar} from './Searchbar';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    getState: () => ({
      routes: [{name: 'Stocks'}],
      index: 0,
    }),
  }),
}));

test('renders correctly', async () => {
  await waitFor(() => {
    const tree = render(
      <Provider store={store}>
        <NavigationContainer>
          <Searchbar
            placeHolder={'Search ticker'}
            setValue={jest.fn()}
            value={jest.fn()}
            setIsFocused={jest.fn()}
          />
        </NavigationContainer>
      </Provider>,
    );
    expect(tree).toMatchSnapshot();
  });
});

//More inside Search.test.js
