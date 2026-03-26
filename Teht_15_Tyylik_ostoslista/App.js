//Testattu ainoastaan iOS-simulaattorilla!
//https://haagahelia.github.io/mobilecourse/
//https://docs.expo.dev/versions/latest/sdk/sqlite/#sqlitedatabase
//https://haagahelia.github.io/mobilecourse/docs/UILibraries/nativeelements
//https://reactnativepaper.com
//npm install react-native-paper

import { PaperProvider, Appbar } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import Ostoslista from './Ostos'


const OstoslistaTyylikas = () => {

  return (
    <PaperProvider>
      <Appbar.Header elevated>
        <Appbar.Content title="Shopping list" />
      </Appbar.Header>
      <Ostoslista /> 
      <StatusBar style="auto" />
    </PaperProvider>      

  );
};


export default OstoslistaTyylikas;