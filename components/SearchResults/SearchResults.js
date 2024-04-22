import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {searchResultsStyles} from './SearchResultsStyles';

function Item({name}) {
  return (
    <TouchableOpacity
      style={searchResultsStyles.itemContainer}
      onPress={() => console.log('dispatch(selectedStock(name))')}>
      <Text style={searchResultsStyles.itemText}>{name}</Text>
    </TouchableOpacity>
  );
}

function ItemSeparatorComponent() {
  return <View style={searchResultsStyles.separator} />;
}

export const SearchResults = ({data}) => {
  function renderItem({item}) {
    return <Item name={item.name} />;
  }

  return (
    data.length > 0 && (
      <View style={searchResultsStyles.container}>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          ItemSeparatorComponent={ItemSeparatorComponent}
        />
      </View>
    )
  );
};
