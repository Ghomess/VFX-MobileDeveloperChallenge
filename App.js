import React from 'react';

import {StatusBar, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {BottomTabNavigator} from './stack/BottomTabNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';

import store from './redux/store';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <BottomTabNavigator />
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
