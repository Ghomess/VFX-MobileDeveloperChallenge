import React from 'react';
import {TextInput, View} from 'react-native';
import {searchbarStyles} from './SearchbarStyles';
import IonicIcons from 'react-native-vector-icons/Ionicons';

export const Searchbar = ({value, setValue, placeHolder, setIsFocused}) => {
  return (
    <View style={searchbarStyles.container}>
      <IonicIcons name="search" color={'#ffffff'} size={20} />
      <TextInput
        style={searchbarStyles.textInput}
        value={value}
        onChangeText={setValue}
        placeholder={placeHolder}
        placeholderTextColor={'#8C8C8C'}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        color={'#ffffff'}
      />
    </View>
  );
};
