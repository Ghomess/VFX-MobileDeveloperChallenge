import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {configureStore} from '@reduxjs/toolkit';

import {LineChartComponentWithDetails} from './LineChartWithDetailsComponent';
import stockSlice from '../../redux/reducers/stockSlice';
import pairSlice from '../../redux/reducers/pairSlice';
import loadingSlice from '../../redux/reducers/loadingSlice';

// Mocking the useNavigation hook from react-navigation
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    getState: () => ({
      routes: [{name: 'Stocks'}, {name: 'Currency'}],
      index: 0,
    }),
  }),
}));
// Initial state for the store

// Helper function to create a store with preloaded state
function createTestStore(preloadedState) {
  return configureStore({
    reducer: {
      ticker: stockSlice,
      pair: pairSlice,
      loading: loadingSlice,
    },
    preloadedState,
  });
}

describe('LineChartComponentWithDetails', () => {
  let store;
  const initialState = {
    ticker: {
      stockDateType: 'Monthly',
      ticker: 'AAPL',
      stockPrice: 15.95,
      stockMonthSelected: '2023-06-30',
      stockData: [
        [
          '2023-06-30',
          '2023-07-31',
          '2023-08-31',
          '2023-09-29',
          '2023-10-31',
          '2023-11-30',
          '2023-12-29',
          '2024-01-31',
          '2024-02-29',
          '2024-03-28',
          '2024-04-30',
          '2024-05-07',
        ],
        [
          15.95, 14.52, 14.79, 15.02, 15.4, 16.57, 16.78, 17.69, 16.93, 17.6,
          16.89, 17.08,
        ],
      ],
    },

    pair: {
      pair: 'EUR/USD',
      pairPrice: 1.2345,
      pairDateSelected: '2024-04-30',
      pairDateType: 'Daily',
      pairData: [
        [
          '2024-04-30',
          '2024-05-01',
          '2024-05-02',
          '2024-05-03',
          '2024-05-06',
          '2024-05-07',
          '2024-05-08',
        ],
        [1.24938, 1.25211, 1.25313, 1.25444, 1.25634, 1.25074, 1.24725],
      ],
    },
    loading: {loadingChart: false, loadingSearchResults: false},
  };

  test('renders correctly the stock screen when loading is false and with data', async () => {
    await waitFor(() => {
      store = createTestStore(initialState);
      const {toJSON} = render(
        <Provider store={store}>
          <NavigationContainer>
            <LineChartComponentWithDetails />
          </NavigationContainer>
        </Provider>,
      );

      expect(toJSON()).toMatchSnapshot();
    });
  });

  test('renders correctly the stock screen when loading is true and without data', async () => {
    const loadingState = {
      ticker: {},

      pair: {},
      loading: {loadingChart: true},
    };
    await waitFor(() => {
      store = createTestStore(loadingState);

      const {toJSON} = render(
        <Provider store={store}>
          <NavigationContainer>
            <LineChartComponentWithDetails />
          </NavigationContainer>
        </Provider>,
      );

      expect(toJSON()).toMatchSnapshot();
    });
  });

  test('renders correctly the currency screen when loading is false and with data', async () => {
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
      store = createTestStore(initialState);
      const {toJSON} = render(
        <Provider store={store}>
          <NavigationContainer>
            <LineChartComponentWithDetails />
          </NavigationContainer>
        </Provider>,
      );

      expect(toJSON()).toMatchSnapshot();
    });
  });

  test('renders correctly the currency screen when loading is true and without data', async () => {
    const loadingState = {
      ticker: {},

      pair: {},
      loading: {loadingChart: true},
    };
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
      store = createTestStore(loadingState);

      const {toJSON} = render(
        <Provider store={store}>
          <NavigationContainer>
            <LineChartComponentWithDetails />
          </NavigationContainer>
        </Provider>,
      );

      expect(toJSON()).toMatchSnapshot();
    });
  });
});
