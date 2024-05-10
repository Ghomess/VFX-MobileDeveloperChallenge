import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';

import {fireEvent, render, waitFor} from '@testing-library/react-native';

import {ItemComponent} from './ItemComponent';
import stockSlice, {addticker} from '../../redux/reducers/stockSlice';
import {configureStore} from '@reduxjs/toolkit';
import pairSlice, {addPair} from '../../redux/reducers/pairSlice';
import loadingSlice, {
  changeLoadingChart,
} from '../../redux/reducers/loadingSlice';
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    getState: () => ({
      routes: [{name: 'Stocks'}, {name: 'Currency'}],
      index: 0,
    }),
  }),
}));

function createTestStore() {
  const store = configureStore({
    reducer: {
      ticker: stockSlice,
      pair: pairSlice,
      loading: loadingSlice,
    },
  });
  return store;
}

let store;
describe('ItemComponent', () => {
  beforeEach(() => {
    store = createTestStore();
  });
  test('renders correctly in Stocks screen', async () => {
    await waitFor(() => {
      const tree = render(
        <Provider store={store}>
          <NavigationContainer>
            <ItemComponent
              name={'META'}
              screen={'Stocks'}
              setEnableList={jest.fn()}
            />
          </NavigationContainer>
        </Provider>,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  test('renders correctly in Currency screen', async () => {
    await waitFor(() => {
      const tree = render(
        <Provider store={store}>
          <NavigationContainer>
            <ItemComponent
              name={'EUR/USD'}
              screen={'Currency'}
              setEnableList={jest.fn()}
            />
          </NavigationContainer>
        </Provider>,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  test('calls setEnableList on press in Stocks screen', async () => {
    await waitFor(() => {
      const setEnableListMock = jest.fn();

      const {getByTestId} = render(
        <Provider store={store}>
          <NavigationContainer>
            <ItemComponent
              name={'META'}
              screen={'Stocks'}
              setEnableList={setEnableListMock}
            />
          </NavigationContainer>
        </Provider>,
      );
      const touchable = getByTestId('ItemComponent.ToucableOpacity');
      fireEvent.press(touchable);
      expect(setEnableListMock).toHaveBeenCalledTimes(1);
      expect(setEnableListMock).toHaveBeenCalledWith(false);
    });
  });

  test('calls setEnableList on press in Currency screen', async () => {
    await waitFor(() => {
      const setEnableListMock = jest.fn();

      const {getByTestId} = render(
        <Provider store={store}>
          <NavigationContainer>
            <ItemComponent
              name={'EUR/USD'}
              screen={'Currency'}
              setEnableList={setEnableListMock}
            />
          </NavigationContainer>
        </Provider>,
      );
      const touchable = getByTestId('ItemComponent.ToucableOpacity');
      fireEvent.press(touchable);
      expect(setEnableListMock).toHaveBeenCalledTimes(1);
      expect(setEnableListMock).toHaveBeenCalledWith(false);
    });
  });

  //Dispatches

  test('dispatches addticker action in Stocks screen', async () => {
    await waitFor(() => {
      const dispatchMock = jest.spyOn(store, 'dispatch');
      const {getByTestId} = render(
        <Provider store={store}>
          <NavigationContainer>
            <ItemComponent
              name={'META'}
              screen={'Stocks'}
              setEnableList={() => {}}
            />
          </NavigationContainer>
        </Provider>,
      );
      const touchable = getByTestId('ItemComponent.ToucableOpacity');
      fireEvent.press(touchable);
      expect(dispatchMock).toHaveBeenCalledWith(addticker('META'));
    });
  });

  test('dispatches addPair action in Currency screen', async () => {
    await waitFor(() => {
      const dispatchMock = jest.spyOn(store, 'dispatch');
      const {getByTestId} = render(
        <Provider store={store}>
          <NavigationContainer>
            <ItemComponent
              name={'EUR/USD'}
              screen={'Currency'}
              setEnableList={() => {}}
            />
          </NavigationContainer>
        </Provider>,
      );
      const touchable = getByTestId('ItemComponent.ToucableOpacity');
      fireEvent.press(touchable);
      expect(dispatchMock).toHaveBeenCalledWith(addPair('EUR/USD'));
    });
  });

  test('dispatches changeLoadingChart action in Currency screen', async () => {
    await waitFor(() => {
      const dispatchMock = jest.spyOn(store, 'dispatch');
      const {getByTestId} = render(
        <Provider store={store}>
          <NavigationContainer>
            <ItemComponent
              name={'EUR/USD'}
              screen={'Currency'}
              setEnableList={() => {}}
            />
          </NavigationContainer>
        </Provider>,
      );
      const touchable = getByTestId('ItemComponent.ToucableOpacity');
      fireEvent.press(touchable);
      expect(dispatchMock).toHaveBeenCalledWith(changeLoadingChart(true));
    });
  });
  test('dispatches changeLoadingChart action in Stocks screen', async () => {
    await waitFor(() => {
      const dispatchMock = jest.spyOn(store, 'dispatch');
      const {getByTestId} = render(
        <Provider store={store}>
          <NavigationContainer>
            <ItemComponent
              name={'META'}
              screen={'Stocks'}
              setEnableList={() => {}}
            />
          </NavigationContainer>
        </Provider>,
      );
      const touchable = getByTestId('ItemComponent.ToucableOpacity');
      fireEvent.press(touchable);
      expect(dispatchMock).toHaveBeenCalledWith(changeLoadingChart(true));
    });
  });
});
