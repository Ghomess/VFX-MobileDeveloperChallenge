import {StyleSheet} from 'react-native';
import {colors} from '../../styles';

export const searchResultsStyles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '90%',
    alignContent: 'center',
    backgroundColor: colors.blue,

    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
  separator: {
    borderBottomWidth: 2,

    borderColor: colors.darkgray,
  },
  itemContainer: {
    borderRadius: 5,
    padding: 15,
    paddingLeft: 15,
  },
  itemText: {
    color: colors.white,
    fontSize: 15,
  },
});
