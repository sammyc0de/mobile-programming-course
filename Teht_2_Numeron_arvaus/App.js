//Testattu ainoastaan iOS-simulaattorilla!
import {useState} from 'react';
import {Alert, Text, TextInput, StyleSheet, Button, View, TouchableOpacity} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const Arvaus = () => {
  
  const [luku, setLuku] = useState(null);
  const [satunnaisluku, setSatunnaisluku] = useState(Math.floor(Math.random() * 100) + 1); //arvotaan numero
  const [teksti, setTeksti] = useState("Guess a number between 1-100");
  const [arvaukset, setArvaukset] = useState(0);

  const arvaaLuku = () => {
    const arvaus = parseFloat(luku); 
    setArvaukset(arvaukset + 1);     

    if (arvaus < satunnaisluku) {
      setTeksti(("Your guess " + arvaus + " is too low").toString());       
    }
    else if (arvaus > satunnaisluku) {
      setTeksti(("Your guess " + arvaus + " is too high").toString());       
    }
    else if (arvaus == satunnaisluku) {   //Jos arvaus osuu oikein
      Alert.alert("You guessed the number in " + (arvaukset + 1)  + " guesses");
      //Alustetaan peli uudellleen
      setArvaukset(0);
      setLuku(null);
      setTeksti("Guess a number between 1-100")
      setSatunnaisluku(Math.floor(Math.random() * 100) + 1);
    }
       
  }


  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View>
        <Text style={{ fontSize: 18, fontWeight: "bold"}}>{teksti}</Text>
        <TextInput
          style={styles.input}
          onChangeText={setLuku}
          value={luku}
          keyboardType="numeric"
        />
        <View style={styles.row}>
          {/* TouchableOpacity tarvitaan jotta painikkeen taustaväri näkyy */}
          <TouchableOpacity style={styles.button}> 
            <Button style={{ fontWeight: "bold" }} color="white" title="MAKE GUESS" onPress={arvaaLuku}/>      
          </TouchableOpacity>  
        </View>
        </View>  
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: { //input-kenttä
    height: 40,    
    padding: 5,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10
  },
row: { //painike-rivi
  flexDirection: "row", 
  justifyContent: "center",
  marginTop: 10,
},
 button: { //painike
  backgroundColor: "#0078f1", 
  margin: 10,
  }
});


export default Arvaus;