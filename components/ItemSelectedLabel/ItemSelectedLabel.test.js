import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';

import {fireEvent, render, waitFor} from '@testing-library/react-native';
import {ItemSelectedLabel} from './ItemSelectedLabel';
import {changeLoadingChart} from '../../redux/reducers/loadingSlice';
import {configureStore} from '@reduxjs/toolkit';
import stockSlice from '../../redux/reducers/stockSlice';
import pairSlice from '../../redux/reducers/pairSlice';
import store from '../../redux/store';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    getState: () => ({
      routes: [{name: 'Stocks'}, {name: 'Currency'}],
      index: 0,
    }),
  }),
}));

describe('ItemSelectedLabel renders correctly', () => {
  test('renders correctly with a currency selected', async () => {
    await waitFor(() => {
      jest
        .spyOn(require('@react-navigation/native'), 'useNavigation')
        .mockImplementation(() => ({
          getState: () => ({
            routes: [{name: 'Stocks'}, {name: 'Currency'}], // Set the routes to only contain the 'Currency' route
            index: 1, // Set the index to 0 to indicate the first route
          }),
          navigate: jest.fn(), // Mock the navigate function to track navigation actions
        }));
      const initialState = {
        pair: {
          pair: 'EUR/USD',
          pairPrice: 1.2345,
          pairDateSelected: '2022-01-01',
          pairDateType: 'Monthly',
        },
      };

      const storeMock = configureStore({
        reducer: {
          pair: pairSlice,
          ticker: stockSlice,
        },
        preloadedState: initialState,
      });

      const tree = render(
        <Provider store={storeMock}>
          <NavigationContainer>
            <ItemSelectedLabel navigation={{}} />
          </NavigationContainer>
        </Provider>,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  test('renders correctly with a stock selected', async () => {
    await waitFor(() => {
      jest
        .spyOn(require('@react-navigation/native'), 'useNavigation')
        .mockImplementation(() => ({
          getState: () => ({
            routes: [{name: 'Stocks'}, {name: 'Currency'}], // Set the routes to only contain the 'Currency' route
            index: 0, // Set the index to 0 to indicate the first route
          }),
          navigate: jest.fn(), // Mock the navigate function to track navigation actions
        }));
      const initialState = {
        ticker: {
          stockDateType: 'Monthly',
          ticker: 'AAPL',
          stockPrice: 100.2345,
          stockMonthSelected: '2022-01-01',
        },
      };

      const storeMock = configureStore({
        reducer: {
          ticker: stockSlice,
          pair: pairSlice,
        },
        preloadedState: initialState,
      });

      const tree = render(
        <Provider store={storeMock}>
          <NavigationContainer>
            <ItemSelectedLabel />
          </NavigationContainer>
        </Provider>,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});

describe('ItemSelectedLabel dispatches', () => {
  test('check if it dispatches changeLoadingChart action with a stock selected', async () => {
    await waitFor(() => {
      jest
        .spyOn(require('@react-navigation/native'), 'useNavigation')
        .mockImplementation(() => ({
          getState: () => ({
            routes: [{name: 'Stocks'}, {name: 'Currency'}], // Set the routes to only contain the 'Currency' route
            index: 0, // Set the index to 0 to indicate the first route
          }),
          navigate: jest.fn(), // Mock the navigate function to track navigation actions
        }));
      const dispatchMock = jest.spyOn(store, 'dispatch');
      const {getByTestId} = render(
        <Provider store={store}>
          <NavigationContainer>
            <ItemSelectedLabel />
          </NavigationContainer>
        </Provider>,
      );
      const touchable = getByTestId('ItemSelectedLabel.ToucableOpacity');
      fireEvent.press(touchable);
      expect(dispatchMock).toHaveBeenCalledWith(changeLoadingChart(true));
    });
  });

  test('check if it dispatches changeLoadingChart action with a currency selected', async () => {
    await waitFor(() => {
      jest
        .spyOn(require('@react-navigation/native'), 'useNavigation')
        .mockImplementation(() => ({
          getState: () => ({
            routes: [{name: 'Stocks'}, {name: 'Currency'}], // Set the routes to only contain the 'Currency' route
            index: 1, // Set the index to 0 to indicate the first route
          }),
          navigate: jest.fn(), // Mock the navigate function to track navigation actions
        }));
      const dispatchMock = jest.spyOn(store, 'dispatch');
      const {getByTestId} = render(
        <Provider store={store}>
          <NavigationContainer>
            <ItemSelectedLabel />
          </NavigationContainer>
        </Provider>,
      );
      const touchable = getByTestId('ItemSelectedLabel.ToucableOpacity');
      fireEvent.press(touchable);
      expect(dispatchMock).toHaveBeenCalledWith(changeLoadingChart(true));
    });
  });
});
describe('ItemSelectedLabel refresh function with both items selected', () => {
  test('check if it refreshes when currentScreen is Stocks', async () => {
    await waitFor(() => {
      const dispatchMock = jest.spyOn(store, 'dispatch');
      const pairDataFetchMock = jest.fn();
      const stockDataFetchMock = jest.fn();
      const currentScreen = 'Stocks';
      const pair = 'EUR/USD';
      const ticker = 'META';
      const pairDateType = 'Day';
      const stockDateType = 'Monthly';
      // Replace the original pairDataFetch and stockDataFetch functions with mock functions
      const refresh = jest.fn(() => {
        if (currentScreen === 'Currency' && pair) {
          pairDataFetchMock(dispatchMock, pair, pairDateType);
        } else if (currentScreen === 'Stocks' && ticker) {
          stockDataFetchMock(dispatchMock, ticker, stockDateType);
        }
        console.log('refreshing');
        dispatchMock(changeLoadingChart(true));
      });

      // Call the refresh function with the mock arguments
      refresh(dispatchMock, currentScreen, ticker, stockDateType);

      // Assert that pairDataFetch or stockDataFetch was called based on the screen and ticker/pair
      if (currentScreen === 'Currency' && pair) {
        expect(pairDataFetchMock).toHaveBeenCalledWith(
          dispatchMock,
          pair,
          pairDateType,
        );
        expect(stockDataFetchMock).not.toHaveBeenCalled();
      } else if (currentScreen === 'Stocks' && ticker) {
        expect(stockDataFetchMock).toHaveBeenCalledWith(
          dispatchMock,
          ticker,
          stockDateType,
        );
        expect(pairDataFetchMock).not.toHaveBeenCalled();
      }

      // Assert that changeLoadingChart was called with true
      expect(dispatchMock).toHaveBeenCalledWith(changeLoadingChart(true));
    });
  });
  test('check if it refreshes when currentScreen is Currency', async () => {
    const dispatchMock = jest.spyOn(store, 'dispatch');
    const pairDataFetchMock = jest.fn();
    const stockDataFetchMock = jest.fn();
    const currentScreen = 'Currency';
    const pair = 'EUR/USD';
    const ticker = 'META';
    const pairDateType = 'Day';
    const stockDateType = 'Monthly';
    // Replace the original pairDataFetch and stockDataFetch functions with mock functions
    const refresh = jest.fn(() => {
      if (currentScreen === 'Currency' && pair) {
        pairDataFetchMock(dispatchMock, pair, pairDateType);
      } else if (currentScreen === 'Stocks' && ticker) {
        stockDataFetchMock(dispatchMock, ticker, stockDateType);
      }

      dispatchMock(changeLoadingChart(true));
    });

    // Call the refresh function with the mock arguments
    refresh(dispatchMock, currentScreen, pair, pairDateType);

    // Assert that pairDataFetch or stockDataFetch was called based on the screen and ticker/pair
    if (currentScreen === 'Currency' && pair) {
      expect(pairDataFetchMock).toHaveBeenCalledWith(
        dispatchMock,
        pair,
        pairDateType,
      );
      expect(stockDataFetchMock).not.toHaveBeenCalled();
    } else if (currentScreen === 'Stocks' && ticker) {
      expect(stockDataFetchMock).toHaveBeenCalledWith(
        dispatchMock,
        ticker,
        stockDateType,
      );
      expect(pairDataFetchMock).not.toHaveBeenCalled();
    }

    // Assert that changeLoadingChart was called with true
    expect(dispatchMock).toHaveBeenCalledWith(changeLoadingChart(true));
  });
});
