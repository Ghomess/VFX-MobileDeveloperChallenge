import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from '../../redux/store';
import {render, waitFor} from '@testing-library/react-native';

import {SearchResults} from './SearchResults';
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    getState: () => ({
      routes: [{name: 'Currency'}],
      index: 0,
    }),
  }),
}));

const dataMocked = [
  {id: 0, name: 'T'},
  {id: 1, name: 'T.TRT'},
  {id: 2, name: 'T04.FRK'},
  {id: 3, name: 'T0A.FRK'},
  {id: 4, name: 'T0P.FRK'},
  {id: 5, name: 'T0T.FRK'},
  {id: 6, name: 'T18.FRK'},
  {id: 7, name: 'T1A.FRK'},
  {id: 8, name: 'T10G.LON'},
  {id: 9, name: 'T15B.FRK'},
];

test('renders correctly with data', async () => {
  const {getByTestId} = render(
    <Provider store={store}>
      <NavigationContainer>
        <SearchResults data={dataMocked} />
      </NavigationContainer>
    </Provider>,
  );
  const flatList = getByTestId('SearchResults.FlatList');
  expect(flatList).toBeDefined();
  await waitFor(() => {
    expect(flatList.props.data.length).toBe(dataMocked.length);
  });
});

test('renders correctly snapshot', async () => {
  const tree = render(
    <Provider store={store}>
      <NavigationContainer>
        <SearchResults data={dataMocked} />
      </NavigationContainer>
    </Provider>,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
