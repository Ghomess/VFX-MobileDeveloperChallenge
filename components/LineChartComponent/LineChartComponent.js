import React, {useEffect, useState} from 'react';
import {View, Dimensions} from 'react-native';
import {lineChartStyles} from './LineChartComponentStyles';

import {ItemSelectedLabel} from '../ItemSelectedLabel/ItemSelectedLabel';
import {colors, styles} from '../../styles';

import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {LineChart} from 'react-native-chart-kit';
import {addPairDateSelected} from '../../redux/reducers/pairSlice';
import {
  addTicketMonth,
  addTicketMonthSelected,
} from '../../redux/reducers/ticketSlice';

export const LineChartComponent = ({data}) => {
  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;
  const [dateSelected, setDateSelected] = useState('');
  const [priceSelected, setPriceSelected] = useState('');
  const [indexSelected, setIndexSelected] = useState();

  const pair = useSelector(state => state.pair.pair);

  const [suffix, setSuffix] = useState();

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const navigationState = navigation.getState();
  const currentScreen = navigationState.routes[navigationState.index].name;

  const [newData, setNewData] = useState();
  const setData = (value, newDateSelected) => {
    console.log('newDateSelected: ', newDateSelected);
    dispatchDateSelected(newDateSelected);
    setDateSelected(newDateSelected);
    setPriceSelected(value);
  };

  const dispatchDateSelected = date => {
    currentScreen === 'Stocks' && dispatch(addTicketMonthSelected(date));
    currentScreen === 'Currency' && dispatch(addPairDateSelected(date));
  };

  useEffect(() => {
    if (typeof data === 'object') {
      if (Object.keys(data).length > 0) {
        console.log('data Length: ', Object.keys(data).length);
        console.log('-------------------------------------');
        console.log('data: ', data);
        console.log('-------------------------------------');

        setNewData(data);
        setIndexSelected(data[0].length - 1);
        setData(data[1][data[0].length - 1], data[0][data[0].length - 1]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (pair) {
      const pairSepareted = pair.split('/');
      if (pairSepareted[0] === 'EUR') {
        setSuffix('€');
      } else if (pairSepareted[0] === 'USD') {
        setSuffix('$');
      } else if (pairSepareted[0] === 'GBP') {
        setSuffix('£');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pair]);

  return (
    newData && (
      <View style={[styles.container, lineChartStyles.container]}>
        {/* //NEED TO CHANGE THIS COMPONENT BECAUSE ONLY ACCEPTS MONTH */}
        <ItemSelectedLabel date={dateSelected} price={priceSelected} />
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
            decimalPlaces: 4, // optional, defaults to 2dp
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

            setIndexSelected(index);

            setData(value, newData[0][index]);
          }}
        />
      </View>
    )
  );
};
