//Testattu ainoastaan iOS-simulaattorilla!
import {useState} from 'react';
import {Text, TextInput, StyleSheet, Button, View, TouchableOpacity, FlatList} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const Laskin = () => {

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

  }

  const miinusLaskutoimitus = () => {
    const a = parseFloat(luku1);
    const b = parseFloat(luku2);
    const uusiTulos = (a - b).toString();

    setTulos(uusiTulos);  
    setHistory([...history, { key: (a + " - " + b + " = " + uusiTulos)  }]); 
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View>
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
          {/* TouchableOpacity tarvitaan jotta painikkeen taustaväri näkyy */}
          <TouchableOpacity style={styles.button}> 
            <Button color="white" title="+" onPress={plussaLaskutoimitus}/>      
          </TouchableOpacity>  
          <TouchableOpacity style={styles.button}>  
            <Button color="white" title="-" onPress={miinusLaskutoimitus}/> 
          </TouchableOpacity> 
        </View>
        <Text>History</Text>
        <FlatList 
          data={history}
          renderItem={({item}) => <Text>{item.key}</Text>}
          keyExtractor={(item, index) => index.toString()}         
        />
        </View>  
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
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
  margin: 10,
  }
});


export default Laskin;