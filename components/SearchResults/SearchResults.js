import React, {useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {searchResultsStyles} from './SearchResultsStyles';
import {useDispatch} from 'react-redux';
import {addticker} from '../../redux/reducers/stockSlice';
import {addPair} from '../../redux/reducers/pairSlice';
import {useNavigation} from '@react-navigation/native';
import {
  changeLoadingChart,
  changeLoadingSearchResults,
} from '../../redux/reducers/loadingSlice';

function Item({name, setEnableList, screen}) {
  const dispatch = useDispatch();
  const handlePress = () => {
    if (screen === 'Stocks') {
      dispatch(addticker(name));
    } else if (screen === 'Currency') {
      dispatch(addPair(name));
    }
    dispatch(changeLoadingChart(true));
    setEnableList(false);
  };
  return (
    <TouchableOpacity
      style={searchResultsStyles.itemContainer}
      onPress={handlePress}>
      <Text style={searchResultsStyles.itemText}>{name}</Text>
    </TouchableOpacity>
  );
}

function ItemSeparatorComponent() {
  return <View style={searchResultsStyles.separator} />;
}

export const SearchResults = ({data, setEnableList}) => {
  const navigation = useNavigation();
  const navigationState = navigation.getState();
  const currentScreen = navigationState.routes[navigationState.index].name;

  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(changeLoadingSearchResults(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  function renderItem({item}) {
    return (
      <Item
        name={item.name}
        setEnableList={setEnableList}
        screen={currentScreen}
      />
    );
  }

  return (
    <View style={searchResultsStyles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </View>
  );
};
