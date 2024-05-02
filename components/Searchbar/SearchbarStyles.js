import {StyleSheet} from 'react-native';
import {colors} from '../../styles';

export const searchbarStyles = StyleSheet.create({
  container: {
    width: '90%',
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor: colors.blue,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderBottomColor: colors.darkgray,
    borderBottomWidth: 2,
  },
  textInput: {
    width: '88%',
    fontSize: 15,
  },
});
