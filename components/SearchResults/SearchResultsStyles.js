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
});
