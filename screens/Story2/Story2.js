import React, {useState, useEffect} from 'react';

import {Searchbar} from '../../components/Searchbar/Searchbar';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from '../styles';
import {SearchResults} from '../../components/SearchResults/SearchResults';

export default function Story2() {
  const [pair, setPair] = useState('');
  const [data, setData] = useState([
    {id: 1, name: 'EUR/USD'},
    {id: 2, name: 'GBD/USD'},
    {id: 3, name: 'BTC/USD'},
  ]);
  const [filteredData, setFilteredData] = useState([]);

  //To filter the data depending on the text input value and if the data is updated
  useEffect(() => {
    //if value inside input exists, filters the data, otherwise it makes the filteredData empty
    pair
      ? setFilteredData(
          data.filter(item =>
            item.name.toLowerCase().includes(pair.toLowerCase()),
          ),
        )
      : setFilteredData([]);
  }, [data, pair]);

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeHolder={'Search Currency Pair'}
        setValue={setPair}
        value={pair}
      />
      <SearchResults data={filteredData} />
    </SafeAreaView>
  );
}
