import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

import {useDispatch} from 'react-redux';
import {addTicker} from '../../redux/reducers/stockSlice';
import {addPair} from '../../redux/reducers/pairSlice';

import {changeLoadingChart} from '../../redux/reducers/loadingSlice';
import {itemComponentStyles} from './ItemComponentStyles';

export const ItemComponent = ({name, setEnableList, screen}) => {
  const dispatch = useDispatch();
  const handlePress = () => {
    if (screen === 'Stocks') {
      dispatch(addTicker(name));
    } else if (screen === 'Currency') {
      dispatch(addPair(name));
    }
    dispatch(changeLoadingChart(true));
    setEnableList(false);
  };
  return (
    <TouchableOpacity
      style={itemComponentStyles.container}
      onPress={handlePress}
      testID="ItemComponent.ToucableOpacity">
      <Text style={itemComponentStyles.text}>{name}</Text>
    </TouchableOpacity>
  );
};
