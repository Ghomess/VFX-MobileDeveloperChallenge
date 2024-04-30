import {StyleSheet} from 'react-native';

const xAxisHeight = 10;
export const lineChartStyles = StyleSheet.create({
  container: {
    width: '90%',
  },
  yaxisText: {
    color: 'black',
    justifyContent: 'flex-end',
    alignSelf: 'center',
    textAlign: 'right',
  },
  xaxis: {
    marginHorizontal: -10,
    height: xAxisHeight,
  },
  linechartContainer: {
    flex: 1,
    marginLeft: 10,
  },
  linechart: {
    alignSelf: 'center',
  },
});
