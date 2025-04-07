import React from 'react';
import { View, Text } from 'react-native';
import { AnimatedTabBarNavigator } from 'react-native-animated-nav-tab-bar';
import { Ionicons } from '@expo/vector-icons';
import TransactionsScreen from '../screens/TransactionsScreen';
import { colors } from 'theme/colors';

const Tab = AnimatedTabBarNavigator();

const PlaceholderScreen = () => (
  <View style={{ flex: 1, backgroundColor: '#121212', alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{ color: 'white', fontSize: 24 }}>Coming Soon</Text>
  </View>
);

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Transactions"
      tabBarOptions={{
        activeTintColor: colors.text.primary,
        inactiveTintColor: colors.text.secondary,
      }}
      appearance={{
        floating: true,
        dotCornerRadius: 10,
        tabBarBackground: 'black',
        whenActiveShow: 'both',
        whenInactiveShow: 'icon-only',
        dotSize: 'small',
      }}
    >
      <Tab.Screen
        name="Tab1"
        component={PlaceholderScreen}
        options={{
          tabBarIcon: ({ focused, color }: { focused: boolean; color: string }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Transactions"
        component={TransactionsScreen}
        options={{
          tabBarIcon: ({ focused, color }: { focused: boolean; color: string }) => (
            <Ionicons name="wallet-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Tab3"
        component={PlaceholderScreen}
        options={{
          tabBarIcon: ({ focused, color }: { focused: boolean; color: string }) => (
            <Ionicons name="settings-outline" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}; 