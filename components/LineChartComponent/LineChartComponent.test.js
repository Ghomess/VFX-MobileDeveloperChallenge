import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from '../../redux/store';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import {LineChartComponent} from './LineChartComponent';
import {pairDataFetch} from '../../utils/apiFunctions';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    getState: () => ({
      routes: [{name: 'Stocks'}, {name: 'Currency'}],
      index: 0,
    }),
  }),
}));

const stockDataMock = [
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
    15.95, 14.52, 14.79, 15.02, 15.4, 16.57, 16.78, 17.69, 16.93, 17.6, 16.89,
    17.08,
  ],
];

const currencyDailyDataMock = [
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
];

const currencyWeeklyDataMock = [
  ['2024-04-19', '2024-04-26', '2024-05-03', '2024-05-08'],
  [1.23695, 1.24918, 1.25444, 1.24736],
];

const currencyMonthlyDataMock = [
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
    '2024-03-29',
    '2024-04-30',
    '2024-05-08',
  ],
  [
    1.26928, 1.28352, 1.26715, 1.2197, 1.21482, 1.26217, 1.273, 1.26863,
    1.26231, 1.2623, 1.24938, 1.24745,
  ],
];

describe('LineChartComponent renders correctly', () => {
  test('renders correctly the currency screen when pairDateType is Daily', async () => {
    await waitFor(() => {
      const suffix = '€';
      const indexSelected = 0;
      const setIndexSelected = jest.fn();
      const dataToRedux = jest.fn();
      const currentScreen = 'Currency';
      const tree = render(
        <Provider store={store}>
          <NavigationContainer>
            <LineChartComponent
              currentScreen={currentScreen}
              data={currencyDailyDataMock}
              dataToRedux={dataToRedux}
              indexSelected={indexSelected}
              setIndexSelected={setIndexSelected}
              suffix={suffix}
            />
          </NavigationContainer>
        </Provider>,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  test('renders correctly the currency screen when pairDateType is weekly', async () => {
    await waitFor(() => {
      const suffix = '£';
      const indexSelected = 0;
      const setIndexSelected = jest.fn();
      const dataToRedux = jest.fn();
      const currentScreen = 'Currency';
      const tree = render(
        <Provider store={store}>
          <NavigationContainer>
            <LineChartComponent
              currentScreen={currentScreen}
              data={currencyWeeklyDataMock}
              dataToRedux={dataToRedux}
              indexSelected={indexSelected}
              setIndexSelected={setIndexSelected}
              suffix={suffix}
            />
          </NavigationContainer>
        </Provider>,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  test('renders correctly the currency screen when pairDateType is monthly', async () => {
    await waitFor(() => {
      const suffix = '$';
      const indexSelected = 0;
      const setIndexSelected = jest.fn();
      const dataToRedux = jest.fn();
      const currentScreen = 'Currency';
      const tree = render(
        <Provider store={store}>
          <NavigationContainer>
            <LineChartComponent
              currentScreen={currentScreen}
              data={currencyMonthlyDataMock}
              dataToRedux={dataToRedux}
              indexSelected={indexSelected}
              setIndexSelected={setIndexSelected}
              suffix={suffix}
            />
          </NavigationContainer>
        </Provider>,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  test('renders correctly the stocks screen ', async () => {
    await waitFor(() => {
      const suffix = '€';
      const indexSelected = 0;
      const setIndexSelected = jest.fn();
      const dataToRedux = jest.fn();
      const currentScreen = 'Stocks';
      const tree = render(
        <Provider store={store}>
          <NavigationContainer>
            <LineChartComponent
              currentScreen={currentScreen}
              data={stockDataMock}
              dataToRedux={dataToRedux}
              indexSelected={indexSelected}
              setIndexSelected={setIndexSelected}
              suffix={suffix}
            />
          </NavigationContainer>
        </Provider>,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
