import {useState} from 'react';
import {Text, TextInput, StyleSheet, Button, View, TouchableOpacity, FlatList} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

export default function CalcScreen ( {navigation}) {

  const [history, setHistory] = useState([]);
    
  const [luku1, setLuku1] = useState(null);
  const [luku2, setLuku2] = useState(null);
  const [tulos, setTulos] = useState("0");
 
  const plussaLaskutoimitus = () => {
    const a = parseFloat(luku1);
    const b = parseFloat(luku2);
    const uusiTulos = (a + b).toString();
      
    setTulos(uusiTulos);     
    setHistory([...history, { key: (a + " + " + b + " = " + uusiTulos) }]);
    //console.log("Tulos", uusiTulos)
  }

  const miinusLaskutoimitus = () => {
    const a = parseFloat(luku1);
    const b = parseFloat(luku2);
    const uusiTulos = (a - b).toString();

    setTulos(uusiTulos);  
    setHistory([...history, { key: (a + " - " + b + " = " + uusiTulos)  }]); 
    //console.log("Tulos", uusiTulos)
  }


  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
              <Text style={{ fontSize: 18}}>Result: {tulos}</Text>
          <TextInput
            style={styles.input}
            onChangeText={setLuku1}
            value={luku1}
            placeholder="Luku 1"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            onChangeText={setLuku2}
            value={luku2}
            placeholder="Luku 2"
            keyboardType="numeric"
          />
          <View style={styles.row}>
            <TouchableOpacity style={styles.button}> 
              <Button color="white" title="+" onPress={plussaLaskutoimitus}/>      
            </TouchableOpacity>  
            <TouchableOpacity style={styles.button}>  
              <Button color="white" title="-" onPress={miinusLaskutoimitus}/> 
            </TouchableOpacity> 
            <TouchableOpacity style={styles.button}>  
              <Button color="white" onPress={() => navigation.navigate("History", { history })} title="History" />
            </TouchableOpacity> 
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
  },
  input: { //input-laatikot numeroille
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
    justifyContent: "center",
    marginTop: 10,
  },
  button: { //painikkeet
    backgroundColor: "#3f36e8", 
    margin: 5,
    }
});
