import React from 'react';

import {StatusBar} from 'react-native';

import {BottomTabNavigator} from './stack/BottomTabNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {API_KEY} from '@env';
import store from './redux/store';

function App() {
  console.log('-ENV: ', API_KEY);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <BottomTabNavigator />
        <StatusBar translucent={true} />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
