//Testattu ainoastaan iOS-simulaattorilla!
//https://haagahelia.github.io/mobilecourse/
//https://docs.expo.dev/versions/latest/sdk/speech/
//https://docs.expo.dev/versions/latest/sdk/segmented-control/
import {useState} from 'react';
import {StyleSheet, Button, View, TouchableOpacity, TextInput} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import * as Speech from 'expo-speech';
import SegmentedControl from "@react-native-segmented-control/segmented-control";

const Teksti_puheeksi = () => {

const [text, setText] = useState(null);
const [selectedLang, setSelectedLang] = useState(0);
const lang = ["en-US", "fi-FI", "sv-SE"];
const langLabels = ["English", "Finnish", "Swedish"];

const speak = () => {  
    Speech.speak(text, {language: lang[selectedLang]});
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
       <View> 
          <SegmentedControl
            values={langLabels}
            selectedLang={selectedLang}
            onChange={(event) => {
              setSelectedLang(event.nativeEvent.selectedSegmentIndex);
            }}
          />
       <TextInput
          style={styles.input}
          onChangeText={setText}
          value={text}
          placeholder="Type something here..." 
          />
      </View>
      <View> 
        <TouchableOpacity style={styles.button}>  
          <Button color="white" title="Say it" onPress={speak} />
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
  button: { //painike
    backgroundColor: "#008ef3", 
    margin: 10,
    borderRadius: 5,
    width: 150 
    },
  input: { //input-kenttä
    height: 40,
    width: 200,
    padding: 5,
    marginTop: 10,
    borderWidth: 1,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center'  
  },
});


export default Teksti_puheeksi;