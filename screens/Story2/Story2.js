import React, {useState} from 'react';

import {Searchbar} from '../../components/Searchbar/Searchbar';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from '../styles';

export default function Story2() {
  const [pair, setPair] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeHolder={'Search Currency Pair'}
        setValue={setPair}
        value={pair}
      />
    </SafeAreaView>
  );
}
