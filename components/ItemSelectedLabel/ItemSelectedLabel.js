import React from 'react';
import {Text, View} from 'react-native';
import {itemSelectedLabelStyles} from './ItemSelectedLabelStyles';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

export function ItemSelectedLabel({price, date}) {
  //add current price when we have real data using redux
  const navigation = useNavigation();
  const navigationState = navigation.getState();
  const currentScreen = navigationState.routes[navigationState.index].name;

  const pair = useSelector(state => state.pair.pair);

  const ticketDateSelected = useSelector(
    state => state.ticket.ticketDateSelected,
  );
  const pairDateSelected = useSelector(state => state.pair.pairDateSelected);
  const pairDateType = useSelector(state => state.pair.pairDateType);
  const ticketDateType = useSelector(state => state.ticket.ticketDateType);
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const checkDataType = () => {
    let screenDateSelected;
    let screenDateType;
    if (currentScreen === 'Stocks') {
      screenDateSelected = ticketDateSelected;
      screenDateType = ticketDateType;
    } else if (currentScreen === 'Currency') {
      screenDateSelected = pairDateSelected;
      screenDateType = pairDateType;
    }

    if (screenDateType === 'Monthly') {
      return monthNames[new Date(screenDateSelected).getMonth()];
    } else {
      return screenDateSelected;
    }
  };
  const priceSuffix = () => {
    if (pair) {
      const pairSepareted = pair.split('/');
      if (pairSepareted[0] === 'EUR') {
        return price + '€';
      } else if (pairSepareted[0] === 'USD') {
        return price + '$';
      } else if (pairSepareted[0] === 'GBP') {
        return price + '£';
      } else {
        return price;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  //SHOW WEEK NUMBER AND DAY
  return (
    <View style={itemSelectedLabelStyles.container}>
      <Text style={itemSelectedLabelStyles.itemMonth}>{checkDataType()}</Text>
      <Text style={itemSelectedLabelStyles.itemPrice}>{priceSuffix()}</Text>
    </View>
  );
}
