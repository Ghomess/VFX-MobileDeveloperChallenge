import {StyleSheet} from 'react-native';

export const searchbarStyles = StyleSheet.create({
  container: {
    width: '90%',
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor: '#1A237E',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderBottomColor: '#424242',
    borderBottomWidth: 2,
  },
  textInput: {
    width: '90%',
    fontSize: 15,
  },
});
