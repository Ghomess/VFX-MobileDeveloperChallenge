import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {buttonStyles} from './ButtonComponentStyles';
import {useDispatch, useSelector} from 'react-redux';
import {addPairDateType} from '../../redux/reducers/pairSlice';

import {useNavigation} from '@react-navigation/native';
import {changeLoadingChart} from '../../redux/reducers/loadingSlice';

const ButtonComponent = ({title}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const navigationState = navigation.getState();
  const currentScreen = navigationState.routes[navigationState.index].name;
  const pairDateType = useSelector(state => state.pair.pairDateType);
  const stockDateType = useSelector(state => state.ticker.stockDateType);
  const checkDataType = () => {
    if (currentScreen === 'Stocks') {
      return stockDateType;
    } else if (currentScreen === 'Currency') {
      return pairDateType;
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(changeLoadingChart(true));
        dispatch(addPairDateType(title));
      }}
      style={[
        buttonStyles.button,
        checkDataType() === title && buttonStyles.buttonSelected,
      ]}>
      <Text
        style={[
          buttonStyles.title,
          checkDataType() === title && buttonStyles.titleSelected,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;
