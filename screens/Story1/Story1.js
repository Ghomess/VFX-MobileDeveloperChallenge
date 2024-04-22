import React, {useEffect, useState} from 'react';

import {SafeAreaView} from 'react-native-safe-area-context';
import {Searchbar} from '../../components/Searchbar/Searchbar';
import {styles} from '../styles';
import {SearchResults} from '../../components/SearchResults/SearchResults';

export default function Story1() {
  const [ticket, setTicket] = useState('');
  const [data, setData] = useState([
    {id: 1, name: 'META'},
    {id: 2, name: 'AAPL'},
    {id: 3, name: 'NFLX'},
  ]);
  const [filteredData, setFilteredData] = useState([]);

  //To filter the data depending on the text input value and if the data is updated
  useEffect(() => {
    //if value inside input exists, filters the data, otherwise it makes the filteredData empty
    ticket
      ? setFilteredData(
          data.filter(item =>
            item.name.toLowerCase().includes(ticket.toLowerCase()),
          ),
        )
      : setFilteredData([]);
  }, [data, ticket]);

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeHolder={'Search Ticket'}
        setValue={setTicket}
        value={ticket}
      />
      <SearchResults data={filteredData} />
    </SafeAreaView>
  );
}
