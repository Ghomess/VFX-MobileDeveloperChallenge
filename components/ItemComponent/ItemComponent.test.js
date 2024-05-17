import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';

import {fireEvent, render, waitFor} from '@testing-library/react-native';

import {ItemComponent} from './ItemComponent';
import stockSlice, {addTicker} from '../../redux/reducers/stockSlice';
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
  test('renders correctly in stock screen', async () => {
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
  test('renders correctly in the currency screen', async () => {
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

  test('check if it calls setEnableList and changes it to false on press in stock screen', async () => {
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

  test('check if it calls setEnableList and changes it to false on press in currency screen', async () => {
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

  test('check if it dispatches addTicker action in stocks screen', async () => {
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
      expect(dispatchMock).toHaveBeenCalledWith(addTicker('META'));
    });
  });

  test('check if it dispatches addPair action in currency screen', async () => {
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

  test('check if it dispatches changeLoadingChart action in currency screen', async () => {
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
  test('check if it dispatches changeLoadingChart action in stock screen', async () => {
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
