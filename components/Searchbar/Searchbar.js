import React from 'react';
import {TextInput, View} from 'react-native';
import {searchbarStyles} from './SearchbarStyles';
import IonicIcons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../styles';

export const Searchbar = ({value, setValue, placeHolder, setIsFocused}) => {
  return (
    <View style={searchbarStyles.container}>
      <IonicIcons name="search" color={colors.white} size={20} />
      <TextInput
        style={searchbarStyles.textInput}
        value={value}
        onChangeText={setValue}
        placeholder={placeHolder}
        placeholderTextColor={colors.lightgray}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        color={colors.white}
      />
    </View>
  );
};
