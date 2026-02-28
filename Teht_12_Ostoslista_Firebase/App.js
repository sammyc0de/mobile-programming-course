//Testattu ainoastaan iOS-simulaattorilla!
//https://haagahelia.github.io/mobilecourse/
//https://haagahelia.github.io/mobilecourse/docs/DataPersistence/firebase
//https://firebase.google.com/docs/database/web/read-and-write
import {useEffect, useState} from 'react';
import {Text, TextInput, StyleSheet, Button, View, TouchableOpacity, FlatList, Alert} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { app } from './firebaseConfig';
import { getDatabase, ref, push, onValue, remove, set } from "firebase/database";

const Ostoslista = () => {

const [product, setProduct] = useState({
    title: '',
    amount: ''
 });
const [items, setItems] = useState([]);
const database = getDatabase(app);

useEffect(() => {
  const itemsRef = ref(database, 'items/');
  onValue(itemsRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      setItems(Object.values(data));
    } else {
      setItems([]); // Handle the case when there are no items
    }
  })
}, [])


const handleSave = () => {

  if (product.amount && product.title) {
    const newRef = push(ref(database, 'items/'));     // luo uusi item
    const itemId = newRef.key;         // hae avain uudesta itemista

    const productWithId = {       
      id: itemId,                         
      ...product
    };

    set(newRef, productWithId);   //Tallenna product ID:llä
    setProduct('');  //Tyhjennä kentät
  }
  else {
    Alert.alert('Error', 'Type product and amount first');
  }
}


const handleDelete = (id) => {

remove(ref(database, 'items/' + id))
  .then(() => console.log('Product deleted'))
  .catch(err => console.error(err));
};




  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View>      
          <TextInput
            style={styles.input} 
            placeholder='Product' 
            onChangeText={text => setProduct({...product, title: text})}
            value={product.title}/> 
          <TextInput 
            style={styles.input}
            placeholder='Amount'  
            onChangeText={text => setProduct({...product, amount: text})}
            value={product.amount}/>   
          </View>  
         <View style={styles.row}>
          <TouchableOpacity style={styles.button}>  
            <Button color="white" title="Save" onPress={handleSave}/> 
          </TouchableOpacity> 
        </View>  
      <Text style={styles.title}>Shopping List</Text>   
       <FlatList    
          renderItem={({ item }) =>            
            <View style={styles.flatlist} >
              <Text>{item.title}, </Text>
              <Text>{item.amount}   </Text>
              <Text style={{ color: '#0011ff' }} onPress={() => handleDelete(item.id)}>delete</Text>
            </View>
          }
          data={items}
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
    alignItems: 'center',
    fontWeight: 'bold'  
  },
  flatlist: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});


export default Ostoslista;