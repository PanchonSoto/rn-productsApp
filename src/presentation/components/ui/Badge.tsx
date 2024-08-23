import { useTheme } from '@ui-kitten/components';
import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';



interface Props {
    value: string;
}


const Badge = ({ value }:Props) => {

    const theme = useTheme();
    const colorScheme = useColorScheme();
    const backgroundColor = colorScheme === 'dark'
    ? theme['color-basic-600']
    : theme['color-basic-900'];

  return (
    <View style={[styles.badge, {backgroundColor: backgroundColor}]}>
      <Text style={styles.badgeText}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width:50,
    marginTop:20,
    marginHorizontal:30
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Badge;
