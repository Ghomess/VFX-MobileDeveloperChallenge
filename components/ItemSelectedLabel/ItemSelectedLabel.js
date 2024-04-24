import React from 'react';
import {Text, View} from 'react-native';
import {itemSelectedLabelStyles} from './ItemSelectedLabelStyles';

export function ItemSelectedLabel({name, price, date}) {
  //add current price when we have real data using redux
  const priceSuffix = price && price + '€';
  return (
    <View style={itemSelectedLabelStyles.container}>
      <Text style={itemSelectedLabelStyles.itemName}>{name}</Text>
      <Text style={itemSelectedLabelStyles.itemPrice}>{priceSuffix}</Text>
      <Text style={itemSelectedLabelStyles.itemMonth}>{date}</Text>
    </View>
  );
}
