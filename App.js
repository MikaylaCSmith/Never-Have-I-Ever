import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './HomeScreen';
import CardScreen from './CardScreen';
import HowToPlay from './HowToPlay';
import DeckSelection from './DeckSelection';
import CreateYourDeck from './CreateYourDeck';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="DeckSelection" component={DeckSelection} options={{ title: 'Select Deck' }} />
        <Stack.Screen name="CreateYourDeck" component={CreateYourDeck} options={{ title: 'Create Deck' }} />
        <Stack.Screen name="HowToPlay" component={HowToPlay} options={{ title: 'How to Play' }} />
        <Stack.Screen name="CardScreen" component={CardScreen} options={{ title: 'Never Have I Ever' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
