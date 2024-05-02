import React from 'react';
import {ActivityIndicator, TextInput, View} from 'react-native';
import {searchbarStyles} from './SearchbarStyles';
import IonicIcons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../styles';
import {useSelector} from 'react-redux';

export const Searchbar = ({value, setValue, placeHolder, setIsFocused}) => {
  const loading = useSelector(state => state.loading.loadingSearchResults);
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
      {loading && <ActivityIndicator size="small" color={colors.white} />}
    </View>
  );
};
