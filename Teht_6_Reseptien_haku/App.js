//Testattu ainoastaan iOS-simulaattorilla!
//https://haagahelia.github.io/mobilecourse/docs/Navigation/reactnavigation
//https://reactnavigation.org/docs/getting-started
import {useState} from 'react';
import {Text, TextInput, StyleSheet, Button, View, TouchableOpacity, FlatList, Image, Divider} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const ReseptienHaku = () => {

  const [keyword, setKeyword] = useState('');
  const [repositories, setRepositories] = useState([]);

  const separator = () => (
    <View style={styles.separator} />
  );

  const handleFetch = () => {
     fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
    .then(response => {
      if (!response.ok)
        throw new Error("Error in fetch:" + response.statusText);
        
      return response.json()
    })
    .then(data => setRepositories(data.meals))
    .catch(err => console.error(err));    
    console.log(repositories);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View>
          <TextInput 
              style={{fontSize: 18, width: 200}} 
              placeholder='keyword' 
              value={keyword}
              onChangeText={text => setKeyword(text)} 
            />
        </View>  
        <View style={styles.row}>
          <TouchableOpacity style={styles.button}> 
            <Button color="white" title="Find" onPress={handleFetch}/>      
          </TouchableOpacity>  
        </View>
        <View style={styles.flatlist} >
          <FlatList
          data={repositories} 
          keyExtractor={(item) => item.idMeal}
          renderItem={({item}) =>
            <View>
              <Text style={{fontSize: 18}}>
                {item.strMeal}
              </Text>
              <Image style={{ width: 60, height: 60}}
                     source={{ uri: item.strMealThumb }} 
              /> 
            </View>}
          ItemSeparatorComponent={separator}
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
  input: { //input
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
  button: { //painike
    backgroundColor: "#008ef3", 
    margin: 10,
    borderRadius: 5
    },
  flatlist: {
    alignItems: 'center'
  },
  separator: { //erottaja rivien välissä
    marginTop: 5,
    height: 1,
    width: '100%',
    backgroundColor: '#c8c5c5',
  }
});


export default ReseptienHaku;