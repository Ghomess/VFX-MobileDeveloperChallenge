import React, {useCallback, useState} from 'react';
import {Text, View} from 'react-native';
import {itemSelectedLabelStyles} from './ItemSelectedLabelStyles';
import {useSelector} from 'react-redux';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

export function ItemSelectedLabel() {
  //add current price when we have real data using redux
  const navigation = useNavigation();
  const navigationState = navigation.getState();
  const currentScreen = navigationState.routes[navigationState.index].name;

  const pair = useSelector(state => state.pair.pair);
  const ticker = useSelector(state => state.ticker.ticker);
  const tickerDateSelected = useSelector(
    state => state.ticker.stockMonthSelected,
  );
  const pairDateSelected = useSelector(state => state.pair.pairDateSelected);
  const pairDateType = useSelector(state => state.pair.pairDateType);
  const stockDateType = useSelector(state => state.ticker.stockDateType);
  const pairPrice = useSelector(state => state.pair.pairPrice);
  const stockPrice = useSelector(state => state.ticker.stockPrice);

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

  const [priceSuffix, setPriceSuffix] = useState();
  const checkDataType = () => {
    let screenDateSelected;
    let screenDateType;
    if (currentScreen === 'Stocks') {
      screenDateSelected = tickerDateSelected;
      screenDateType = stockDateType;
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
  function PriceSuffixFunction() {
    let price;
    if (currentScreen === 'Currency' && pair) {
      price = pairPrice;
      const pairSepareted = pair.split('/');
      if (pairSepareted[0] === 'EUR') {
        console.log('€');
        setPriceSuffix(price + '€');
      } else if (pairSepareted[0] === 'USD') {
        console.log('$');
        setPriceSuffix(price + '$');
      } else if (pairSepareted[0] === 'GBP') {
        console.log('£');
        setPriceSuffix(price + '£');
      } else {
        console.log('$');
        setPriceSuffix(price + '$');
      }
    } else if (currentScreen === 'Stocks' && ticker) {
      price = stockPrice;
      console.log('$');
      setPriceSuffix(price + '$');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }
  useFocusEffect(
    useCallback(() => {
      PriceSuffixFunction();

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentScreen, pairPrice, stockPrice]),
  );
  //SHOW WEEK NUMBER AND DAY
  return (
    <View style={itemSelectedLabelStyles.container}>
      <Text style={itemSelectedLabelStyles.itemMonth}>{checkDataType()}</Text>
      <Text style={itemSelectedLabelStyles.itemPrice}>{priceSuffix}</Text>
    </View>
  );
}
