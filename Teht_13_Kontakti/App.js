//Testattu ainoastaan iOS-simulaattorilla!
//https://haagahelia.github.io/mobilecourse/
//https://haagahelia.github.io/mobilecourse/docs/ExpoSDK/contacts
import {useState} from 'react';
import {Text, StyleSheet, Button, View, TouchableOpacity, FlatList, Alert, status} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import * as Contacts from 'expo-contacts';

const Kontakti = () => {

const [contact, setContact] = useState({});


const getContacts = async () => {
  const { status } = await Contacts.requestPermissionsAsync();

  if (status === 'granted') {
    const { data } = await Contacts.getContactsAsync(
      { fields: [Contacts.Fields.PhoneNumbers] }
    );

    if (data.length > 0) {
      setContact(data);
      console.log(data);
    }
    else {
      Alert.alert("Warning", "No contacts found.");      
    }
  }
}

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View>      
        <TouchableOpacity style={styles.button}>  
          <Button color="white" title="Get Contacts" onPress={getContacts} />
        </TouchableOpacity>
        </View>  
            <FlatList         
            data={contact} 
            keyExtractor={(item) => item.id}
            renderItem={({item}) =>
            <View>
              <Text style={{fontSize: 18}}>
                {item.name}  {item.phoneNumbers?.[0]?.number}
              </Text>
            </View>}
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
  button: { //painike
    backgroundColor: "#008ef3", 
    margin: 10,
    borderRadius: 5,
    width: 150 
    }
});


export default Kontakti;