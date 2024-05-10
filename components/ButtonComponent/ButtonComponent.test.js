import React from 'react';

import ButtonComponent from './ButtonComponent';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from '../../redux/store';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import {changeLoadingChart} from '../../redux/reducers/loadingSlice';
import {addPairDateType} from '../../redux/reducers/pairSlice';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    getState: () => ({
      routes: [{name: 'Currency'}],
      index: 0,
    }),
  }),
}));

describe('ButtonComponent', () => {
  test('renders correctly', async () => {
    await waitFor(() => {
      const tree = render(
        <Provider store={store}>
          <NavigationContainer>
            <ButtonComponent title={'Daily'} />
          </NavigationContainer>
        </Provider>,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  test('dispatches addPairDateType action of the title on press', async () => {
    await waitFor(() => {
      const dispatchMock = jest.spyOn(store, 'dispatch');
      const title = 'Daily';
      const {getByTestId} = render(
        <Provider store={store}>
          <NavigationContainer>
            <ButtonComponent title={title} />
          </NavigationContainer>
        </Provider>,
      );
      const touchable = getByTestId('ButtonComponent.ToucableOpacity');
      fireEvent.press(touchable);
      expect(dispatchMock).toHaveBeenCalledWith(addPairDateType(title));
    });
  });

  test('dispatches changeLoadingChart action on press', async () => {
    await waitFor(() => {
      const dispatchMock = jest.spyOn(store, 'dispatch');
      const {getByTestId} = render(
        <Provider store={store}>
          <NavigationContainer>
            <ButtonComponent title={'Daily'} />
          </NavigationContainer>
        </Provider>,
      );
      const touchable = getByTestId('ButtonComponent.ToucableOpacity');
      fireEvent.press(touchable);
      expect(dispatchMock).toHaveBeenCalledWith(changeLoadingChart(true));
    });
  });
});
