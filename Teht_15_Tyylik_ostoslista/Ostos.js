import {useEffect, useState} from 'react';
import { Button, TextInput} from 'react-native-paper';
import { StyleSheet, View, FlatList, Text} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('shopppingdb');

export default function Ostoslista() {
   
const [amount, setAmount] = useState('');
const [product, setProduct] = useState('');
const [shoppinglist, setShoppinglist] = useState([]);

const separator = () => (
    <View style={styles.separator} />
);

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
    <View style={styles.container}>
     <TextInput
            style={styles.input}
            label="Product"
            onChangeText={product => setProduct(product)}
            value={product}/> 
         <TextInput 
            style={styles.input}
            label="Amount"
            onChangeText={amount => setAmount(amount)}
            value={amount}/> 
      <Button mode="contained" onPress={saveItem}  icon="content-save">
        Save
      </Button>    
   
    </View>
 
   <FlatList
        keyExtractor={item => item.id.toString()}
          renderItem={({ item }) =>            
            <View style={styles.flatlist} >
               <View style={{ flex: 1 }}>
              <Text style={styles.text} >{item.product}</Text>
              <Text style={styles.text_amount} >{item.amount}</Text>
              </View> 
              <Button style={styles.button} onPress={() => deleteItem(item.id)} icon="delete"></Button>    
            </View>
          }
          data={shoppinglist}
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
  row: { //painike-rivi
    flexDirection: "row",
    marginTop: 10,
  },
  button: { //remove painike flatlist
   marginLeft: 'auto' 
    },
  title: { //shopping list
    fontSize:16, 
    marginTop: 20,
    alignItems: 'center'
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
  text_amount: { //flatlist text
    fontSize: 16,
    color: '#9E9E9E'
  },
  separator: { //erottaja flatlists
    marginTop: 5,
    height: 1,
    backgroundColor: '#c8c5c5',
  }
});
