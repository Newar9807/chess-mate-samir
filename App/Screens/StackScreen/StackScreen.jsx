import React from 'react'
import BoardScreen from '../BoardScreen/BoardScreen';
import HistoryBoard from '../BoardScreen/Design/HistoryBoard';
import TabNavigation from '../../Navigations/TabNavigation';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function StackScreen() {
  return (
  <Stack.Navigator screenOptions={{
    headerShown: false
  }}>
    <Stack.Screen name="tabNavigation" component={TabNavigation} />
    <Stack.Screen name="board" component={BoardScreen} />
    <Stack.Screen name="historyboard" component={HistoryBoard} />
  </Stack.Navigator>
  )
}