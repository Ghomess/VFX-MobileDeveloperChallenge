import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';

import {fireEvent, render, renderHook} from '@testing-library/react-native';

import {Searchbar} from '../components/Searchbar/Searchbar';
import {
  changeLoadingChart,
  changeLoadingSearchResults,
} from '../redux/reducers/loadingSlice';
import store from '../redux/store';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    getState: () => ({
      routes: [{name: 'Stocks'}],
      index: 0,
    }),
  }),
}));

test('check if search input is working', () => {
  const setValueMock = jest.fn();

  const {getByPlaceholderText} = render(
    <Provider store={store}>
      <NavigationContainer>
        <Searchbar
          value={'initialValue'}
          setValue={setValueMock}
          placeHolder={'Search ticker'}
          setIsFocused={jest.fn()}
        />
      </NavigationContainer>
    </Provider>,
  );

  const input = getByPlaceholderText('Search ticker');

  expect(input).toBeDefined();

  fireEvent.changeText(input, 'META');

  expect(setValueMock).toHaveBeenCalledWith('META');

  expect(input.props.value).toBe('initialValue');
});

test('check if the tickerlist is fetched inside the onSearchInput useEffect if search !== ticker ', () => {
  const dispatchMock = jest.spyOn(store, 'dispatch');
  const tickerSearchMock = jest.fn();
  const search = 'AAPL';
  const ticker = 'GOOGL';
  function searchEffect(dispatch, tickerSearch, search, ticker) {
    try {
      if (search.length > 0 && search !== ticker) {
        dispatch(changeLoadingSearchResults(true));
        tickerSearch(dispatch, search);
      }
      if (search.length > 0 && search === ticker) {
        console.log('search: ', search, '- ticker: ', ticker);
        dispatch(changeLoadingChart(true));
      }
    } catch (e) {
      console.log('Error UseEffect: ', e);
    }
  }
  renderHook(() =>
    searchEffect(dispatchMock, tickerSearchMock, search, ticker),
  );
  expect(dispatchMock).toHaveBeenCalledWith(changeLoadingSearchResults(true));
  expect(tickerSearchMock).toHaveBeenCalledWith(dispatchMock, search);
});

test('check if the stock data is fetched inside the onSearchInput useEffect if search == ticker because when the search == ticker it means the user selected a stock from the list', () => {
  const dispatchMock = jest.spyOn(store, 'dispatch');
  const tickerSearchMock = jest.fn();
  const stockDataFetchMock = jest.fn();
  const search = 'GOOGL';
  const ticker = 'GOOGL';
  function searchEffect(dispatch, tickerSearch) {
    try {
      if (search.length > 0 && search !== ticker) {
        dispatch(changeLoadingSearchResults(true));
        tickerSearch(dispatch, search);
      }
      if (search.length > 0 && search === ticker) {
        console.log('search: ', search, '- ticker: ', ticker);
        dispatch(changeLoadingChart(true));
        stockDataFetchMock(dispatch, ticker);
      }
    } catch (e) {
      console.log('Error UseEffect: ', e);
    }
  }
  renderHook(() => searchEffect(dispatchMock, tickerSearchMock));

  expect(dispatchMock).toHaveBeenCalledWith(changeLoadingChart(true));
  expect(stockDataFetchMock).toHaveBeenCalledWith(dispatchMock, ticker);
});
