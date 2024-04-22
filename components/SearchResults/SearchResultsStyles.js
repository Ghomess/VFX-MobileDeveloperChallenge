import {StyleSheet} from 'react-native';

export const searchResultsStyles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '90%',
    alignContent: 'center',
    backgroundColor: '#1A237E',

    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
  separator: {
    borderBottomWidth: 2,

    borderColor: '#424242',
  },
  itemContainer: {
    borderRadius: 5,
    padding: 15,
    paddingLeft: 15,
  },
  itemText: {
    color: '#ffffff',
    fontSize: 15,
  },
});
