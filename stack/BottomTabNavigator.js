import React from 'react';
import Story1 from '../screens/Story1/Story1';
import Story2 from '../screens/Story2/Story2';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Ionicicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {View} from 'react-native';
import {tabBarStyles} from './BottomTabNavigatorStyles';
const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Stocks"
      screenOptions={{
        tabBarStyle: [tabBarStyles.tabBarStyle],
        tabBarActiveTintColor: '#FFD700',
        tabBarInactiveTintColor: '#FFFFFF',
      }}>
      <Tab.Screen
        name="Stocks"
        component={Story1}
        options={{
          tabBarIcon: ({focused, size}) => (
            <Ionicicons
              name="business"
              size={size}
              color={focused ? '#FFD700' : '#FFFFFF'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Currency"
        component={Story2}
        options={{
          tabBarIcon: ({focused, size}) => (
            <View style={tabBarStyles.container}>
              <MaterialIcons
                name="currency-exchange"
                size={size}
                color={focused ? '#FFD700' : '#FFFFFF'}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
