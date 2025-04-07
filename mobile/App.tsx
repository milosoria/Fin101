import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TabNavigator } from './navigation/TabNavigator';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <TabNavigator />
        <StatusBar style="light" />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
