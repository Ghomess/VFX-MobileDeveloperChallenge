import React, {useState} from 'react';
import {View, Dimensions} from 'react-native';
import {lineChartStyles} from './LineChartComponentStyles';
import {LineChart} from 'react-native-gifted-charts';
import {ItemSelectedLabel} from '../ItemSelectedLabel/ItemSelectedLabel';
import {styles} from '../../styles';
export const LineChartComponent = data => {
  const windowHeight = Dimensions.get('window').height;

  const [monthSelected, setMonthSelected] = useState('');
  const [priceSelected, setPriceSelected] = useState('');
  const currentDate = new Date();
  const monthsArray = [
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

  const setData = item => {
    setMonthSelected(item.id);
    setPriceSelected(item.value);
  };

  const customDataPoint = month => {
    return (
      <View
        style={[
          lineChartStyles.datapoint,
          monthSelected === month && [lineChartStyles.datapointSelected],
        ]}
      />
    );
  };

  //This data below will be inside Redux
  //HARD CODED DATA
  const nameSelected = 'META';
  const hardcodedData = [
    {
      id: 0,
      value: 100,

      customDataPoint: () => customDataPoint(0),
    },
    {
      id: 1,
      value: 140,

      customDataPoint: () => customDataPoint(1),
    },
    {
      id: 2,
      value: 250,
      customDataPoint: () => customDataPoint(2),
    },
    {
      id: 3,
      value: 290,

      customDataPoint: () => customDataPoint(3),
    },
    {
      id: 4,
      value: 410,

      customDataPoint: () => customDataPoint(4),
    },
    {
      id: 5,
      value: 440,

      customDataPoint: () => customDataPoint(5),
    },
    {
      id: 6,
      value: 440,

      customDataPoint: () => customDataPoint(6),
    },
    {
      id: 7,
      value: 300,

      customDataPoint: () => customDataPoint(7),
    },
    {
      id: 8,
      value: 280,

      customDataPoint: () => customDataPoint(8),
    },
    {
      id: 9,
      value: 180,

      customDataPoint: () => customDataPoint(9),
    },
    {
      id: 10,
      value: 150,

      customDataPoint: () => customDataPoint(10),
    },
    {
      id: 11,
      value: 150,

      customDataPoint: () => customDataPoint(11),
    },
  ];
  //

  return (
    hardcodedData.length > 0 && (
      <View style={[styles.container, lineChartStyles.container]}>
        <ItemSelectedLabel
          name={nameSelected}
          date={
            !monthSelected
              ? monthsArray[currentDate.getMonth()]
              : monthsArray[monthSelected]
          }
          price={priceSelected}
        />

        <LineChart
          style={lineChartStyles.linechart}
          adjustToWidth={true}
          height={windowHeight * 0.4}
          thickness={3}
          color="#1A237E"
          yAxisTextStyle={lineChartStyles.yaxisText}
          yAxisLabelSuffix="€"
          data={hardcodedData}
          spacing={25}
          rulesColor="black"
          rulesType="solid"
          initialSpacing={10}
          yAxisColor="black"
          xAxisColor="black"
          focusEnabled
          onFocus={item => setData(item)}
        />
      </View>
    )
  );
};
