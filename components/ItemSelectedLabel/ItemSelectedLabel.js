import React, {useCallback, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {itemSelectedLabelStyles} from './ItemSelectedLabelStyles';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../styles';
import {pairDataFetch, stockDataFetch} from '../../utils/apiFunctions';
import {changeLoadingChart} from '../../redux/reducers/loadingSlice';

export function ItemSelectedLabel() {
  //add current price when we have real data using redux
  const navigation = useNavigation();
  const navigationState = navigation.getState();
  const currentScreen = navigationState.routes[navigationState.index].name;
  const dispatch = useDispatch();
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

  const [priceWithSuffix, setPriceWithSuffix] = useState();
  const [date, setDate] = useState();
  function CheckDataType() {
    let screenDateSelected;
    let screenDateType;
    if (currentScreen === 'Stocks' && ticker) {
      screenDateSelected = tickerDateSelected;
      screenDateType = stockDateType;
    } else if (currentScreen === 'Currency' && pair) {
      screenDateSelected = pairDateSelected;
      screenDateType = pairDateType;
    }

    if (screenDateType === 'Monthly') {
      setDate(monthNames[new Date(screenDateSelected).getMonth()]);
    } else {
      setDate(screenDateSelected);
    }
  }
  function PriceSuffixFunction() {
    let price;
    if (currentScreen === 'Currency' && pair) {
      price = pairPrice;
      const pairSepareted = pair.split('/');
      if (pairSepareted[0] === 'EUR') {
        setPriceWithSuffix(price + '€');
      } else if (pairSepareted[0] === 'USD') {
        setPriceWithSuffix(price + '$');
      } else if (pairSepareted[0] === 'GBP') {
        setPriceWithSuffix(price + '£');
      } else {
        setPriceWithSuffix(price + '$');
      }
    } else if (currentScreen === 'Stocks' && ticker) {
      price = stockPrice;

      setPriceWithSuffix(price + '$');
    }
  }

  function refresh() {
    if (currentScreen === 'Currency' && pair) {
      pairDataFetch(dispatch, pair, pairDateType);
    } else if (currentScreen === 'Stocks' && ticker) {
      stockDataFetch(dispatch, ticker, stockDateType);
    }

    dispatch(changeLoadingChart(true));
  }
  useFocusEffect(
    useCallback(() => {
      PriceSuffixFunction();
      CheckDataType();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentScreen, pairPrice, stockPrice]),
  );

  return (
    <View style={itemSelectedLabelStyles.container}>
      <Text style={itemSelectedLabelStyles.itemMonth}>{date}</Text>
      <View style={itemSelectedLabelStyles.pricerefreshContainer}>
        <Text style={itemSelectedLabelStyles.itemPrice}>{priceWithSuffix}</Text>
        <TouchableOpacity
          style={itemSelectedLabelStyles.refreshButton}
          onPress={() => refresh()}
          testID="ItemSelectedLabel.ToucableOpacity">
          <FontAwesome name={'refresh'} size={20} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
