import React, {useState, useEffect} from 'react';

import {Searchbar} from '../../components/Searchbar/Searchbar';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from '../../styles';
import {SearchResults} from '../../components/SearchResults/SearchResults';

import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import {currencystyles} from './CurrencyStyles';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {pairDataFetch} from '../../utils/apiFunctions';
import {LineChartComponentWithDetails} from '../../components/LineChartWithDetailsComponent/LineChartWithDetailsComponent';

export default function Currency() {
  const pair = useSelector(state => state.pair.pair);
  const pairdata = useSelector(state => state.pair.pairData);
  const pairDateType = useSelector(state => state.pair.pairDateType);
  const dispatch = useDispatch();
  const [isFocused, setIsFocused] = useState(false);
  const [search, setSearch] = useState('');
  const pairs = [
    {id: 1, name: 'EUR/USD'},
    {id: 2, name: 'GBP/USD'},
    {id: 3, name: 'GBP/EUR'},
  ];
  const [filteredSearch, setFilteredSearch] = useState([]);
  const [enableList, setEnableList] = useState(false);

  //To filter the data depending on the text input value and if the data is updated
  useEffect(() => {
    //if value inside input exists, filters the data, otherwise it makes the filteredData empty
    search
      ? setFilteredSearch(
          pairs.filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase()),
          ),
        )
      : setFilteredSearch(pairs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    try {
      if (search.length > 0 && search === pair) {
        console.log(
          'search: ',
          search,
          '- pair: ',
          pair,
          '- pairDateType: ',
          pairDateType,
        );
        pairDataFetch(dispatch, pair, pairDateType);
      }
    } catch (e) {
      console.log('Error UseEffect: ', e);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, pairDateType]);

  //Update the search value when the ticker is selected
  useEffect(() => {
    if (pair) {
      setSearch(pair);
    }
  }, [pair, enableList]);

  useEffect(() => {
    if (isFocused) {
      setEnableList(true);
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeHolder={'Search Currency Pair'}
        setValue={setSearch}
        value={search}
        setIsFocused={setIsFocused}
      />
      {enableList && (
        <SearchResults data={filteredSearch} setEnableList={setEnableList} />
      )}
      <View style={currencystyles.buttonContainer}>
        <ButtonComponent title="Daily" />
        <ButtonComponent title="Weekly" />
        <ButtonComponent title="Monthly" />
      </View>
      <LineChartComponentWithDetails />
    </SafeAreaView>
  );
}
