import React from 'react';
import Stocks from '../screens/Stocks/Stocks';
import Currency from '../screens/Currency/Currency';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Ionicicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {View} from 'react-native';
import {tabBarStyles} from './BottomTabNavigatorStyles';
import {colors} from '../styles';
const Tab = createBottomTabNavigator();

const tabBarIcon = ({focused, size, screen}) => {
  if (screen === 'Stocks') {
    return (
      <Ionicicons
        name="business"
        size={size}
        color={focused ? colors.yellow : colors.white}
      />
    );
  } else if (screen === 'Currency') {
    return (
      <Ionicicons
        name="currency-exchange"
        size={size}
        color={focused ? colors.yellow : colors.white}
      />
    );
  }
};
export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Stocks"
      screenOptions={({route}) => ({
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({focused, size}) => {
          let iconName;
          let color = focused ? colors.yellow : colors.white;
          if (route.name === 'Stocks') {
            iconName = 'business';
            return <Ionicicons name={iconName} size={size} color={color} />;
          }
          if (route.name === 'Currency') {
            iconName = 'currency-exchange';
            return <MaterialIcons name={iconName} size={size} color={color} />;
          }

          // You can return any component that you like here!
          return (
            <Ionicicons
              name={iconName}
              size={size}
              color={focused ? colors.yellow : colors.white}
            />
          );
        },

        tabBarStyle: [tabBarStyles.tabBarStyle],
        tabBarActiveTintColor: colors.yellow,
        tabBarInactiveTintColor: colors.white,
      })}>
      <Tab.Screen name="Stocks" component={Stocks} />
      <Tab.Screen name="Currency" component={Currency} />
    </Tab.Navigator>
  );
};
