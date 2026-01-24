//Testattu ainoastaan iOS-simulaattorilla!
import {useState} from 'react';
import {Text, TextInput, StyleSheet, Button, View, TouchableOpacity, FlatList} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const Ostoslista = () => {

  const [lista, setLista] = useState([]);    
  const [ostos, setOstos] = useState(null);
 
  const addToList = () => {
    if(ostos) {
      setLista([...lista, { key: (ostos) }]);
      setOstos("");
    } 
  }

  const clearList = () => {
    setLista([]);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View>
        <TextInput
          style={styles.input}
          onChangeText={setOstos}
          value={ostos}
        />
        </View>  

        <View style={styles.row}>
          {/* TouchableOpacity tarvitaan jotta painikkeen taustaväri näkyy */}
          <TouchableOpacity style={styles.button}> 
            <Button color="white" title="Add" onPress={addToList}/>      
          </TouchableOpacity>  
          <TouchableOpacity style={styles.button}>  
            <Button color="white" title="Clear" onPress={clearList}/> 
          </TouchableOpacity> 
        </View>
        <View style={styles.flatlist} >
        <Text style={styles.title}>Shopping List</Text>
        <FlatList         
          data={lista}
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
    alignItems: 'center'
  },
  input: { //input-laatikot numeroille
    height: 40,
    width: 200,
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
  button: { //painikkeet
    backgroundColor: "#008ef3", 
    margin: 10,
    borderRadius: 5
    },
  title: { //shopping list
    fontSize:16, 
    color: 'blue',
    fontWeight: 'bold',
    marginTop: 20
  },
  flatlist: {
    alignItems: 'center'
  }
});


export default Ostoslista;