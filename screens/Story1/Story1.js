import React, {useState} from 'react';

import {SafeAreaView} from 'react-native-safe-area-context';
import {Searchbar} from '../../components/Searchbar/Searchbar';
import {styles} from '../styles';

export default function Story1() {
  const [ticket, setTicket] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeHolder={'Search Ticket'}
        setValue={setTicket}
        value={ticket}
      />
    </SafeAreaView>
  );
}
