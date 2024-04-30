import {StyleSheet} from 'react-native';
import {colors} from '../../styles';

export const buttonStyles = StyleSheet.create({
  button: {
    backgroundColor: colors.blue,
    padding: 20,
    borderRadius: 10,
  },
  buttonSelected: {
    borderWidth: 2,
    borderColor: colors.blue,
    backgroundColor: colors.white,
  },
  title: {
    color: '#ffff',
    fontSize: 20,
  },
  titleSelected: {
    color: colors.blue,
  },
});
