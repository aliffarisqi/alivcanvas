import React from 'react';
import CanvasEditorScreen from '../features/canvas/screens/CanvasEditorScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CanvasEditor" component={CanvasEditorScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
