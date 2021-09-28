import React from 'react';
import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';

export const CustomHeaderButton = ({ name, size = 23, onPress, left }) => {
  const color = Platform.OS === 'android' ? 'white' : Colors.primary;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={left ? { left: 20 } : { right: 20 }}
    >
      <View>
        <Ionicons name={name} size={size} color={color} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // container: { left: 20 },
});
