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
  datapoint: {
    width: 15,
    height: 15,
    backgroundColor: '#1A237E',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#1A237E',
  },
  datapointSelected: {
    backgroundColor: '#FFD700',
  },
  customlabelContainer: {width: 70, marginLeft: 7},
  customlabelText: {color: 'black', fontWeight: 'bold'},
});
