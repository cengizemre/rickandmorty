import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Component includes
import Home from './components/Home';
import MovieDetail from './components/MovieDetail';
import CharacterDetail from './components/CharacterDetail';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false, contentStyle: { backgroundColor: '#FFFFFF' } }} />
        <Stack.Screen name="MovieDetail" component={MovieDetail} options={{ headerTitle: 'Episode Detail', headerTitleAlign: 'center' }} />
        <Stack.Screen name="CharacterDetail" component={CharacterDetail} options={{ headerTitle: 'Character Details', headerTitleAlign: 'center' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Router;