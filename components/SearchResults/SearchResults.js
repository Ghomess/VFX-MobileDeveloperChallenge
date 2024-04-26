import React, {useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {searchResultsStyles} from './SearchResultsStyles';
import {useDispatch} from 'react-redux';
import {addTicket} from '../../redux/reducers/ticketSlice';

function Item({name, setEnableList}) {
  const dispatch = useDispatch();
  const handlePress = () => {
    dispatch(addTicket(name));
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

export const SearchResults = ({data}) => {
  const [enableList, setEnableList] = useState(false);

  useEffect(() => {
    if (data?.length > 0) {
      setEnableList(true);
    } else {
      setEnableList(false);
    }
  }, [data]);
  function renderItem({item}) {
    return <Item name={item.name} setEnableList={setEnableList} />;
  }

  return (
    enableList && (
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
