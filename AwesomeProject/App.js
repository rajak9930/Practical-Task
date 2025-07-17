import React from 'react'
import { LogBox } from 'react-native';

import { Provider } from 'react-redux';
import { store } from './src/store/index';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CountrySearchScreen from './src/screens/CountrySearchScreen';
import CountryDetailScreen from './src/screens/CountryDetailScreen';
LogBox.ignoreLogs([
  'Warning: ...', 
  'SerializableStateInvariantMiddleware took',
]);
const Stack = createNativeStackNavigator();
const App = () => {
  return (
   <Provider store={store}>
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Search" component={CountrySearchScreen} options={{
            headerShown:false
          }} />
          <Stack.Screen name="CountryDetail" component={CountryDetailScreen} options={{
            headerTitle:""
          }}/>
        </Stack.Navigator>
        </NavigationContainer>
     
    </Provider>
  )
}

export default App

