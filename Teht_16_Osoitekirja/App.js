//Testattu ainoastaan iOS-simulaattorilla!
//https://haagahelia.github.io/mobilecourse/docs/
//https://reactnavigation.org/docs/getting-started
//npm install react-native-paper, npx expo install expo-sqlite, npx expo install react-native-safe-area-context
//npm install @react-navigation/native, npx expo install react-native-screens react-native-safe-area-context  

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MyPlacesScreen from './MyPlacesScreen'
import MapScreen from './MapScreen'

const Osoitekirja = () => {  

const Stack = createNativeStackNavigator();

  return (
    <SafeAreaProvider>    
      <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="My Places" component={MyPlacesScreen} />
            <Stack.Screen name="Map" component={MapScreen} />
         </Stack.Navigator>
        </NavigationContainer>      
    </SafeAreaProvider>
  );
};

export default Osoitekirja;