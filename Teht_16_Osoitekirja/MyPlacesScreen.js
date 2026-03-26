import {useEffect, useState} from 'react';
import { Button, TextInput} from 'react-native-paper';
import { StyleSheet, View, FlatList, Text, Pressable} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('maplistdb');

export default function MyPlaces ( {navigation}) {

const [address, setAddress] = useState('');
const [maplist, setMaplist] = useState([]);

const separator = () => (
    <View style={styles.separator} />
);

useEffect(() => { initialize() }, []);

const initialize = async () => { 
   
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS location (id INTEGER PRIMARY KEY NOT NULL, address TEXT);
    `);
     await updateList();
  } catch (error) {
    console.error('Could not open database', error);
  }
}

const deleteItem = async (id) => {
    try {
      await db.runAsync('DELETE FROM location WHERE id=?', id);
      await updateList();
    }
    catch (error) {
      console.error('Could not delete item', error);
    }
  }

const saveItem = async () => {
  try {
   await db.runAsync('INSERT INTO location (address) VALUES (?)', address);
    await updateList();
    setAddress('');
  } catch (error) {
    console.error('Could not add item', error);
  }
};


  const updateList = async () => {
    try {
      const list = await db.getAllAsync('SELECT * from location');
      setMaplist(list);    
      console.log(list);
    } catch (error) {
      console.error('Could not get items', error);
    }
  }   


  return (
  <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
    <View style={styles.container}>
     <TextInput
        style={styles.input}
        label="PLACEFINDER"
        placeholder="Type in address"
        onChangeText={address => setAddress(address)}
        value={address}/> 
      <Button mode="contained" onPress={saveItem}  icon="content-save">
        Save
      </Button>      
    </View>
 
   <FlatList
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) =>            
      <View style={styles.flatlist} >
        <Pressable onLongPress={() => deleteItem(item.id)}>
          <Text style={styles.text} >{item.address}</Text>
        </Pressable>  
        <Button style={styles.text_showmap} onPress={() => navigation.navigate("Map", { address: item.address })} icon="arrow-right-circle">Show on map</Button>  
      </View>
          }
      data={maplist}
      ItemSeparatorComponent={separator}
      />   
      </SafeAreaView>
    </SafeAreaProvider> 


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  input: { //input
    width: 300,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
  },
  flatlist: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 300,
    flex: 1
  },
  text: { //flatlist text
    fontSize: 16
  },
   text_showmap: { //flatlist text
    fontSize: 16,
    color: '#9E9E9E'
  },
  separator: { //erottaja flatlists
    marginTop: 5,
    height: 1,
    backgroundColor: '#c8c5c5',
  }
});

