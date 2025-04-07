import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

type BadgeProps = {
  children: React.ReactNode;
  color: string;
};

export const Badge = ({ children, color }: BadgeProps) => (
  <View
    style={[
      styles.badge,
      {
        backgroundColor: `${color}20`,
        borderColor: `${color}40`
      }
    ]}
  >
    <Text
      style={[
        styles.badgeText,
        { color }
      ]}
    >
      {children}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
}); 