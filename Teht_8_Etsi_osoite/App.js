//Testattu ainoastaan iOS-simulaattorilla!
//https://haagahelia.github.io/mobilecourse/
//https://geocode.maps.co/docs/
import {useState } from 'react';
import {Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const EtsiOsoite = () => {

const GEOCODE_API_KEY = process.env.EXPO_PUBLIC_GEOCODE_API_KEY;

const [address, setAddress] = useState(null);
const [region, setRegion] = useState({ 
  latitude: 60.200692,
  longitude: 24.934302,
  latitudeDelta: 0.0322,
  longitudeDelta: 0.0221,
});
const [marker, setMarker] = useState(null);

const searchAddress = () => { 

  const url = `https://geocode.maps.co/search?q=${address}&api_key=${GEOCODE_API_KEY}`;
   
  fetch(url)
    .then(response => response.json())
    .then(data => {
      //Jos osoitetta ei löydy
      if (data.length === 0) { 
       console.log("Address not found");
       return; 
      }

      //määritä lat & lon koordinaatit muuttujiin
      const { lat, lon } = data[0]; 
      const latitude = parseFloat(lat); 
      const longitude = parseFloat(lon);  

      setRegion({ ...region, 
          latitude, 
          longitude, }); 
  
      setMarker({ latitude, longitude }); 

    })
    .catch(error => console.log('error', error));    
};

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>    
      <MapView
        style={{ width: '100%', height: '90%' }} region={region}>
          {marker && <Marker coordinate={marker} />}
      </MapView>      
      <TextInput
            style={styles.input}
            onChangeText={setAddress}
            value={address}
      />
      <TouchableOpacity style={styles.button}> 
        <Button color="white" title="Show" onPress={searchAddress}/>      
      </TouchableOpacity>    
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  input: { //input
    height: 40,
    width: 300,
    padding: 5,
    borderWidth: 1,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center'  
  },
  button: { //painike
    backgroundColor: "#008ef3", 
    margin: 10,
    borderRadius: 5
    },
});


export default EtsiOsoite;