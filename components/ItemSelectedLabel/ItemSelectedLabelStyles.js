import {StyleSheet} from 'react-native';
import {colors} from '../../styles';

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
    color: colors.darkgray,
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemPrice: {
    color: colors.blue,
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemMonth: {
    color: colors.darkgray,
    fontSize: 20,
    fontWeight: 'bold',
  },
  pricerefreshContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  refreshButton: {
    marginLeft: 10,
    padding: 5,
    backgroundColor: colors.blue,
    borderRadius: 15,
  },
});
