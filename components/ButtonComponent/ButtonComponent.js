import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {buttonStyles} from './ButtonComponentStyles';
import {useDispatch, useSelector} from 'react-redux';
import {addPairDateType} from '../../redux/reducers/pairSlice';
import {colors} from '../../styles';
import {useNavigation} from '@react-navigation/native';

const ButtonComponent = ({title}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const navigationState = navigation.getState();
  const currentScreen = navigationState.routes[navigationState.index].name;
  const pairDateType = useSelector(state => state.pair.pairDateType);
  const ticketDateType = useSelector(state => state.ticket.ticketDateType);
  const checkDataType = () => {
    if (currentScreen === 'Stocks') {
      return ticketDateType;
    } else if (currentScreen === 'Currency') {
      return pairDateType;
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
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
