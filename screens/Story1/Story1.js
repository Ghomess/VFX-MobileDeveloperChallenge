import React, {useEffect, useState} from 'react';

import {SafeAreaView} from 'react-native-safe-area-context';
import {Searchbar} from '../../components/Searchbar/Searchbar';
import {styles} from '../../styles';
import {SearchResults} from '../../components/SearchResults/SearchResults';
import {LineChartComponent} from '../../components/LineChartComponent/LineChartComponent';
import {useDispatch, useSelector} from 'react-redux';

import {tickerSearch} from '../../utils/apiFunctions';

export default function Story1() {
  const ticketSearchResults = useSelector(
    state => state.ticket.ticketSearchResults,
  );
  const ticket = useSelector(state => state.ticket.ticket);
  const [search, setSearch] = useState('');

  const [filteredData, setFilteredData] = useState([]);

  const dispatch = useDispatch();

  //Use Effect to check if the user inputed on the searchbar
  //if yes it fetches the api data
  useEffect(() => {
    try {
      if (search.length > 0 && search !== ticket) {
        tickerSearch(dispatch, search);
      }
    } catch (e) {
      console.log('Error UseEffect: ', e);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  //Update the search value when the ticket is selected
  useEffect(() => {
    if (ticket) {
      setSearch(ticket);
    }
  }, [ticket]);

  //Update FilteredData with the redux search result state
  useEffect(() => {
    if (ticketSearchResults) {
      setFilteredData(ticketSearchResults);
    }
  }, [ticketSearchResults]);

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeHolder={'Search Ticket'}
        setValue={setSearch}
        value={search}
      />
      <SearchResults data={filteredData} />
      <LineChartComponent />
    </SafeAreaView>
  );
}
