import React, {useCallback, useEffect, useState} from 'react';
import {View, ActivityIndicator} from 'react-native';

import {ItemSelectedLabel} from '../ItemSelectedLabel/ItemSelectedLabel';
import {colors, styles} from '../../styles';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {
  addPairDateSelected,
  addPairPrice,
} from '../../redux/reducers/pairSlice';
import {
  addStockMonthSelected,
  addStockPrice,
} from '../../redux/reducers/stockSlice';
import {changeLoadingChart} from '../../redux/reducers/loadingSlice';

import {LineChartComponent} from '../LineChartComponent/LineChartComponent';
import {lineChartWithDetailsStyles} from './LineChartWithDetailsComponentStyles';

export const LineChartComponentWithDetails = () => {
  const [indexSelected, setIndexSelected] = useState();

  const pair = useSelector(state => state.pair.pair);
  const ticker = useSelector(state => state.ticker.ticker);
  const pairData = useSelector(state => state.pair.pairData);
  const stockData = useSelector(state => state.ticker.stockData);
  const [data, setData] = useState({});
  const [suffix, setSuffix] = useState();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [currentScreen, setCurrentScreen] = useState('');
  const [screenChanged, setScreenChanged] = useState(false);
  const loading = useSelector(state => state.loading.loadingChart);

  const [newData, setNewData] = useState();

  const dispatchSelected = (date, value) => {
    //Function to dispatch the selected value and date depending on the screen the user is in
    if (currentScreen === 'Stocks') {
      dispatch(addStockMonthSelected(date));
      dispatch(addStockPrice(value));
    } else if (currentScreen === 'Currency') {
      dispatch(addPairDateSelected(date));
      dispatch(addPairPrice(value));
    }
  };

  useEffect(() => {
    //UseEffect to update the lineChart when the user returns to the screen
    const navigationState = navigation.getState();
    const currentRoute = navigationState.routes[navigationState.index].name;
    if (currentRoute !== currentScreen) {
      setCurrentScreen(currentRoute);
      console.log('USE EFFECT NAVIGATION: ');
      dispatch(changeLoadingChart(true));
      setScreenChanged(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  useEffect(() => {
    //UseEffect to recieve the data from the fetch, it checks if it's not empty
    // and then stores the data inside a newData variable and selects the last value and date
    if (typeof data === 'object') {
      if (Object.keys(data).length > 0) {
        console.log('data Length: ', Object.keys(data).length);
        console.log('-------------------------------------');
        console.log('data: ', data);
        console.log('-------------------------------------');

        setNewData(data);
        //index of the most recent value
        setIndexSelected(data[0].length - 1);
        //sending to redux the most recent value and date
        dispatchSelected(
          data[0][data[0].length - 1],
          data[1][data[0].length - 1],
        );
      }
      // after setting the new data with the data fetch and selecting the last value and date
      // If the screen has been changed, it will stop loading and display the new data in the line chart if it is not empty.
      if (screenChanged) {
        dispatch(changeLoadingChart(false));
        setScreenChanged(false);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useFocusEffect(
    //Function to check the base currency type to add it as a prefix to the displayed prices displayed on the chart.
    //and updates when the user returns to the screen
    useCallback(() => {
      console.log('USE CALLBACK SUFIX: ');
      dispatch(changeLoadingChart(true));
      if (currentScreen === 'Currency' && pair) {
        setData(pairData);
        const pairSepareted = pair.split('/');
        if (pairSepareted[0] === 'EUR') {
          setSuffix('€');
        } else if (pairSepareted[0] === 'USD') {
          setSuffix('$');
        } else if (pairSepareted[0] === 'GBP') {
          setSuffix('£');
        } else {
          setSuffix('$');
        }
      } else if (currentScreen === 'Stocks' && ticker) {
        setData(stockData);
        setSuffix('$');
      } else {
        setData();
      }
      console.log(currentScreen);
      console.log('USE CALLBACK SUFIX END: ');
      dispatch(changeLoadingChart(false));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentScreen, stockData, pairData]),
  );

  if (!loading) {
    if (newData) {
      return (
        <View style={[styles.container, lineChartWithDetailsStyles.container]}>
          <ItemSelectedLabel />

          <LineChartComponent
            data={newData}
            suffix={suffix}
            indexSelected={indexSelected}
            setIndexSelected={setIndexSelected}
            dataToRedux={dispatchSelected}
            currentScreen={currentScreen}
          />
        </View>
      );
    }
  } else {
    //Loading
    return (
      <ActivityIndicator
        size="large"
        color={colors.blue}
        style={lineChartWithDetailsStyles.loading}
        testID="LineChartWithDetailsComponent.LoadingIndicator"
      />
    );
  }
};
