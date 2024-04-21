import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Story1 = () => {
  return <View style={styles.container}></View>;
};

export default Story1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
});
