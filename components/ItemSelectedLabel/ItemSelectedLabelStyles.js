import {StyleSheet} from 'react-native';

export const itemSelectedLabelStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignContent: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },

  itemName: {
    color: '#424242',
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemPrice: {
    color: '#1A237E',
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemMonth: {
    color: '#424242',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
