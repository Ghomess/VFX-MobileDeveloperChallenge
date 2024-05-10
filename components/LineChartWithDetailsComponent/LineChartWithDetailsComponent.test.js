import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';

import {render} from '@testing-library/react-native';

import pairSlice from '../../redux/reducers/pairSlice';
import stockSlice from '../../redux/reducers/stockSlice';
import loadingSlice from '../../redux/reducers/loadingSlice';
import {LineChartComponentWithDetails} from './LineChartWithDetailsComponent';
import {configureStore} from '@reduxjs/toolkit';
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    getState: () => ({
      routes: [{name: 'Stocks'}, {name: 'Currency'}],
      index: 0,
    }),
  }),
}));

test('Initial Render Test', () => {
  const initialState = {
    pair: {
      pair: 'EUR/USD',
      pairPrice: 1.2345,
      pairDateSelected: '2022-01-01',
      pairDateType: 'Monthly',
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
    loading: {
      loadingChart: true, // Set loading to true to render the loading indicator
    },
  };

  const storeMock = configureStore({
    reducer: {
      pair: pairSlice,
      ticker: stockSlice,
      loading: loadingSlice,
    },
    preloadedState: initialState,
  });

  const tree = render(
    <Provider store={storeMock}>
      <NavigationContainer>
        <LineChartComponentWithDetails />
      </NavigationContainer>
    </Provider>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
  // Log the rendered output of the component
});
