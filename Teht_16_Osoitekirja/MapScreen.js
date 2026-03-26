//https://geocode.maps.co/docs/

import {useEffect, useState} from 'react';
import {Text, StyleSheet, View } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';

export default function Map ( {route}) {
  const {address} = route.params;

  const GEOCODE_API_KEY = process.env.EXPO_PUBLIC_GEOCODE_API_KEY;

  const [region, setRegion] = useState({ 
      latitude: 60.200692,
      longitude: 24.934302,
      latitudeDelta: 0.0322,
      longitudeDelta: 0.0221,
    }); 
  const [marker, setMarker] = useState(null);

  useEffect(() => {
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
  }, []);

  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <MapView
        style={{ width: '100%', height: '90%' }} region={region}>
          {marker && <Marker coordinate={marker} />}
        </MapView> 
        <View style={styles.container}>
          <Text style={{ fontSize: 18}}>{address}  </Text>       
        <View style={styles.row}>     
          </View>          
          </View>
        </SafeAreaView>
    </SafeAreaProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontSize: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
