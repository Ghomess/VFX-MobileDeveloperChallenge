import React, {useEffect} from 'react';
import {FlatList, View} from 'react-native';
import {searchResultsStyles} from './SearchResultsStyles';
import {useDispatch} from 'react-redux';

import {useNavigation} from '@react-navigation/native';
import {changeLoadingSearchResults} from '../../redux/reducers/loadingSlice';
import {ItemComponent} from '../ItemComponent/ItemComponent';
import {ItemSeparatorComponent} from '../ItemSeparatorComponent/ItemSeparatorComponent';

export const SearchResults = ({data, setEnableList}) => {
  const navigation = useNavigation();
  const navigationState = navigation.getState();
  const currentScreen = navigationState.routes[navigationState.index].name;

  const dispatch = useDispatch();

  useEffect(() => {
    //if data from the fetch exists, it will stop loading
    if (data) {
      dispatch(changeLoadingSearchResults(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  function renderItem({item}) {
    return (
      <ItemComponent
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
        testID="SearchResults.FlatList"
      />
    </View>
  );
};
