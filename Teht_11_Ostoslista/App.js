//Testattu ainoastaan iOS-simulaattorilla!
//https://haagahelia.github.io/mobilecourse/
//https://docs.expo.dev/versions/latest/sdk/sqlite/#sqlitedatabase
import {useEffect, useState} from 'react';
import {Text, TextInput, StyleSheet, Button, View, TouchableOpacity, FlatList} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('shopppingdb');

const Ostoslista = () => {

 const [amount, setAmount] = useState('');
 const [product, setProduct] = useState('');
 const [shoppinglist, setShoppinglist] = useState([]);

useEffect(() => { initialize() }, []);

const initialize = async () => {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS product (id INTEGER PRIMARY KEY NOT NULL, product TEXT, amount TEXT);
    `);
  } catch (error) {
    console.error('Could not open database', error);
  }
}

const saveItem = async () => {
  try {
    await db.runAsync('INSERT INTO product (product, amount) VALUES (?, ?)', product, amount);
    await updateList();
    setProduct('');
    setAmount('');
  } catch (error) {
    console.error('Could not add item', error);
  }
};

const deleteItem = async (id) => {
    try {
      await db.runAsync('DELETE FROM product WHERE id=?', id);
      await updateList();
    }
    catch (error) {
      console.error('Could not delete item', error);
    }
  }

  const updateList = async () => {
    try {
      const list = await db.getAllAsync('SELECT * from product');
      setShoppinglist(list);
      console.log(list);
    } catch (error) {
      console.error('Could not get items', error);
    }
  }    

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View>      
          <TextInput
            style={styles.input} 
            placeholder='Product' 
            onChangeText={product => setProduct(product)}
            value={product}/> 
          <TextInput 
            style={styles.input}
            placeholder='Amount'  
            onChangeText={amount => setAmount(amount)}
            value={amount}/>
          </View>  
         <View style={styles.row}>
          <TouchableOpacity style={styles.button}>  
            <Button color="white" title="Save" onPress={saveItem}/> 
          </TouchableOpacity> 
        </View>  
      <Text style={styles.title}>Shopping List</Text>   
       <FlatList
        keyExtractor={item => item.id.toString()}
          renderItem={({ item }) =>            
            <View style={styles.flatlist} >
              <Text>{item.product}</Text>
              <Text>{item.amount} </Text>
              <Text style={{ color: '#0011ff' }} onPress={() => deleteItem(item.id)}>bought</Text>
            </View>
          }
          data={shoppinglist}
          />     
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
    width: 200,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
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
    borderRadius: 5,
    width: 150 
    },
  title: { //shopping list
    fontSize:16, 
    marginTop: 20,
    alignItems: 'center'
  },
  flatlist: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});


export default Ostoslista;