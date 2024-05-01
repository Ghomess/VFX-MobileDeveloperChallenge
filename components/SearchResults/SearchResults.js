import React, {useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {searchResultsStyles} from './SearchResultsStyles';
import {useDispatch} from 'react-redux';
import {addticker} from '../../redux/reducers/stockSlice';
import {addPair} from '../../redux/reducers/pairSlice';
import {useNavigation} from '@react-navigation/native';

function Item({name, setEnableList, screen}) {
  const dispatch = useDispatch();
  const handlePress = () => {
    screen === 'Stocks' && dispatch(addticker(name));
    screen === 'Currency' && dispatch(addPair(name));
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
