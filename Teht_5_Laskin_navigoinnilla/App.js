//Testattu ainoastaan iOS-simulaattorilla!
//https://haagahelia.github.io/mobilecourse/docs/Navigation/reactnavigation
//https://reactnavigation.org/docs/getting-started

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import CalcScreen from './CalcScreen'
import HistScreen from './HistScreen'

const LaskinNavilla = () => {  

const Stack = createNativeStackNavigator();

  return (
    <SafeAreaProvider>    
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Calculator" component={CalcScreen} />
              <Stack.Screen name="History" component={HistScreen} />
            </Stack.Navigator>
              </NavigationContainer>      
    </SafeAreaProvider>
  );
};

export default LaskinNavilla;