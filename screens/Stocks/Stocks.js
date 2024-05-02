import React, {useEffect, useState} from 'react';

import {SafeAreaView} from 'react-native-safe-area-context';
import {Searchbar} from '../../components/Searchbar/Searchbar';
import {styles} from '../../styles';
import {SearchResults} from '../../components/SearchResults/SearchResults';
import {LineChartComponent} from '../../components/LineChartComponent/LineChartComponent';
import {useDispatch, useSelector} from 'react-redux';

import {stockDataFetch, tickerSearch} from '../../utils/apiFunctions';
import {
  changeLoadingChart,
  changeLoadingSearchResults,
} from '../../redux/reducers/loadingSlice';

export default function Stocks() {
  const tickerSearchResults = useSelector(
    state => state.ticker.tickerSearchResults,
  );
  const ticker = useSelector(state => state.ticker.ticker);
  const [search, setSearch] = useState('');
  const stockdata = useSelector(state => state.ticker.stockData);
  const [filteredData, setFilteredData] = useState([]);

  const dispatch = useDispatch();
  const [enableList, setEnableList] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  //Use Effect to check if the user inputed on the searchbar
  //if yes it fetches the api data
  useEffect(() => {
    try {
      if (search.length > 0 && search !== ticker) {
        dispatch(changeLoadingSearchResults(true));
        tickerSearch(dispatch, search);
      }
      if (search.length > 0 && search === ticker) {
        console.log('search: ', search, '- ticker: ', ticker);
        dispatch(changeLoadingChart(true));
        stockDataFetch(dispatch, ticker);
      }
    } catch (e) {
      console.log('Error UseEffect: ', e);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  //Update the search value when the ticker is selected
  useEffect(() => {
    if (ticker) {
      setSearch(ticker);
    }
  }, [ticker, enableList]);

  //Update FilteredData with the redux search result state
  useEffect(() => {
    if (tickerSearchResults) {
      setFilteredData(tickerSearchResults);
    }
  }, [tickerSearchResults]);

  useEffect(() => {
    if (filteredData?.length > 0 && isFocused) {
      setEnableList(true);
    }
  }, [filteredData, isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeHolder={'Search ticker'}
        setValue={setSearch}
        value={search}
        setIsFocused={setIsFocused}
      />
      {enableList && (
        <SearchResults data={filteredData} setEnableList={setEnableList} />
      )}
      <LineChartComponent data={stockdata} />
    </SafeAreaView>
  );
}
