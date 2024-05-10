import React from 'react';
import {Dimensions} from 'react-native';
import {lineChartStyles} from './LineChartComponentStyles';

import {colors} from '../../styles';

import {LineChart} from 'react-native-chart-kit';

export const LineChartComponent = ({
  data,
  suffix,
  indexSelected,
  setIndexSelected,
  dataToRedux,
  currentScreen,
}) => {
  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;

  console.log('data::_ ', data);

  return (
    <LineChart
      style={lineChartStyles.linechart}
      height={windowHeight * 0.4}
      width={windowWidth * 0.9}
      yAxisSuffix={suffix}
      data={{
        datasets: [
          {
            data: data[1],
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
        const index = data[1].findIndex(values => values === value);

        setIndexSelected(index);

        dataToRedux(value, data[0][index]);
      }}
    />
  );
};
