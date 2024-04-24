import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {buttonStyles} from './ButtonComponentStyles';

const ButtonComponent = ({title}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log('dispatch(currencyPair(', title, '))');
      }}
      style={buttonStyles.button}>
      <Text style={buttonStyles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;
