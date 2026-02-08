//Testattu ainoastaan iOS-simulaattorilla!
//https://haagahelia.github.io/mobilecourse/
//https://reactnavigation.org/docs/getting-started
//https://docs.expo.dev/versions/latest/sdk/picker/?redirected
//https://marketplace.apilayer.com/exchangerates_data-api#documentation-tab
import {useEffect, useState} from 'react';
import {Text, TextInput, StyleSheet, Button, View, TouchableOpacity} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { Picker } from "@react-native-picker/picker";

const EuroMuunnin = () => {

const [valueforconv, setValueforconv] = useState(null);
const [result, setResult] = useState("");
const [currency, setCurrency] = useState("");
const [currencyKeys, setCurrencyKeys] = useState([]);

useEffect(() => { //aja handleFetch käynnistyksen yhteydessä
  handleFetch();
}, []);

const requestOptions = { 
  method: 'GET', 
  headers: { 
    apikey: 'POISTETTU TÄSTÄ JULKAISUSTA', 
  } };
  
const handleFetch = () => {
    fetch('https://api.apilayer.com/exchangerates_data/latest?symbols=&base=eur', requestOptions)
    .then(response => {
      if (!response.ok)
        throw new Error("Error in fetch:" + response.statusText);
        
      return response.json()
    })
    .then(data => {
      const rates = data.rates; // rates = valuuttakoodit ja arvot
      const keys = Object.keys(rates); //tallenna vain valuuttakoodit
      setCurrencyKeys(keys); // tallenna muuttujaan
    })
    .catch(error => console.log('error', error));
};

const convertCurrency = () => {
    fetch(`https://api.apilayer.com/exchangerates_data/latest?symbols=EUR&base=${currency}`, requestOptions)
    .then(response => {
      if (!response.ok)
        throw new Error("Error in fetch:" + response.statusText);        
      return response.json()
    })
    .then(data => {
      const rates = data.rates; // rates = valuuttakoodit ja arvot
      const rate = Object.values(rates); //valittu arvo muuttujaan
      const value = rate * arvo; //lasken määrä euroissa
      const rounded = Number(value.toFixed(2)); //pyöristä tulos kahden desimaalin tarkkuudelle
      setResult(rounded);
    })
    .catch(error => console.log('error', error));  

};     

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.text}>{result} €</Text>
          <TextInput
            style={styles.input}
            onChangeText={setValueforconv}
            value={valueforconv}
            keyboardType="numeric"
          />
        <Picker
          selectedValue={currency}
          onValueChange={(value) => setCurrency(value)}
        >
          {currencyKeys.map((key) => (
            <Picker.Item 
              key={key}
              label={key}
              value={key}
            />
          ))}
        </Picker>

        </View>  
        <View style={styles.row}>
          <TouchableOpacity style={styles.button}> 
            <Button color="white" title="Convert" onPress={convertCurrency}/>      
          </TouchableOpacity>  
        </View>  
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
  text: { //teksti
    fontSize: 18,
    height: 40,
    padding: 5,
    margin: 5  
  },
  input: { //input
    height: 40,
    width: 100,
    padding: 5,
    borderWidth: 1,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center'  
  },
  row: { //painike-rivi
    flexDirection: "row",
    marginTop: 10,
  },
  button: { //painike
    backgroundColor: "#008ef3", 
    margin: 10,
    borderRadius: 5
    },
});


export default EuroMuunnin;