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
  addstockMonthSelected,
  addstockPrice,
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
  const dataToRedux = (value, newDateSelected) => {
    console.log('newDateSelected: ', newDateSelected);
    dispatchSelected(newDateSelected, value);
  };

  const dispatchSelected = (date, value) => {
    if (currentScreen === 'Stocks') {
      dispatch(addstockMonthSelected(date));
      dispatch(addstockPrice(value));
    } else if (currentScreen === 'Currency') {
      dispatch(addPairDateSelected(date));
      dispatch(addPairPrice(value));
    }
  };

  useEffect(() => {
    const navigationState = navigation.getState();
    const currentRoute = navigationState.routes[navigationState.index].name;
    setCurrentScreen(currentRoute);
    console.log('USE EFFECT NAVIGATION: ');
    dispatch(changeLoadingChart(true));

    setScreenChanged(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  useEffect(() => {
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
        dataToRedux(data[1][data[0].length - 1], data[0][data[0].length - 1]);
      }
      if (screenChanged) {
        dispatch(changeLoadingChart(false));
        setScreenChanged(false);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useFocusEffect(
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
            dataToRedux={dataToRedux}
            currentScreen={currentScreen}
          />
        </View>
      );
    }
  } else {
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
