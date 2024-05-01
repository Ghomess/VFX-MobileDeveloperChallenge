import React, {useCallback, useEffect, useState} from 'react';
import {View, Dimensions} from 'react-native';
import {lineChartStyles} from './LineChartComponentStyles';

import {ItemSelectedLabel} from '../ItemSelectedLabel/ItemSelectedLabel';
import {colors, styles} from '../../styles';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {LineChart} from 'react-native-chart-kit';
import {
  addPairDateSelected,
  addPairPrice,
} from '../../redux/reducers/pairSlice';
import {
  addstockMonthSelected,
  addstockPrice,
} from '../../redux/reducers/stockSlice';

export const LineChartComponent = () => {
  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;

  const [indexSelected, setIndexSelected] = useState();

  const pair = useSelector(state => state.pair.pair);
  const ticker = useSelector(state => state.ticker.ticker);
  const pairData = useSelector(state => state.pair.pairData);
  const stockData = useSelector(state => state.ticker.stockData);
  const [data, setData] = useState({});
  const [suffix, setSuffix] = useState();

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const navigationState = navigation.getState();
  const currentScreen = navigationState.routes[navigationState.index].name;

  const [newData, setNewData] = useState();
  const setDatatoRedux = (value, newDateSelected) => {
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
        setDatatoRedux(
          data[1][data[0].length - 1],
          data[0][data[0].length - 1],
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useFocusEffect(
    useCallback(() => {
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
      }
      console.log(currentScreen);

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentScreen, stockData, pairData]),
  );

  return (
    newData && (
      <View style={[styles.container, lineChartStyles.container]}>
        {/* //NEED TO CHANGE THIS COMPONENT BECAUSE ONLY ACCEPTS MONTH */}
        <ItemSelectedLabel />
        {/* End of the Component */}

        {/* CHANGE LINE CHART TO  react-native-chart-kit LINE CHART*/}
        <LineChart
          style={lineChartStyles.linechart}
          height={windowHeight * 0.4}
          width={windowWidth * 0.9}
          yAxisSuffix={suffix}
          data={{
            datasets: [
              {
                data: newData[1],
              },
            ],
          }}
          chartConfig={{
            backgroundColor: colors.white,
            backgroundGradientFrom: colors.white,
            backgroundGradientTo: colors.white,
            decimalPlaces: currentScreen === 'Currency' ? 4 : 2,
            color: (opacity = 1) => colors.blue,
            labelColor: (opacity = 1) => colors.darkgray,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: colors.blue,
            },
          }}
          getDotColor={(dataPoint, dataPointIndex) => {
            if (dataPointIndex === indexSelected) {
              return colors.yellow;
            }
          }}
          onDataPointClick={({value}) => {
            const index = newData[1].findIndex(values => values === value);
            console.log('value: ', value, 'data', newData[0][index]);
            setIndexSelected(index);

            setDatatoRedux(value, newData[0][index]);
          }}
        />
      </View>
    )
  );
};
