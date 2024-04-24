import React, {useState, useEffect} from 'react';

import {Searchbar} from '../../components/Searchbar/Searchbar';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from '../../styles';
import {SearchResults} from '../../components/SearchResults/SearchResults';
import {LineChartComponent} from '../../components/LineChartComponent/LineChartComponent';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import {story2styles} from './Story2Styles';
import {View} from 'react-native';

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
      <View style={story2styles.buttonContainer}>
        <ButtonComponent title="Daily" />
        <ButtonComponent title="Weekly" />
        <ButtonComponent title="Monthly" />
      </View>
      <LineChartComponent />
    </SafeAreaView>
  );
}
