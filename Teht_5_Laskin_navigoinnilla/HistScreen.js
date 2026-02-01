import {StyleSheet, View, FlatList, Text} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

export default function HistScreen({route}) {
  const {history} = route.params;

  return (
         <SafeAreaProvider>
           <SafeAreaView style={styles.container}>
             <View style={styles.container}>      
               <View style={styles.row}>
               </View>
               <FlatList 
                 data={history}
                 renderItem={({item}) => <Text>{item.key}</Text>}
                 keyExtractor={(item, index) => index}
                 ListHeaderComponent={ <Text style={{ fontSize: 16, marginBottom: 10 }}> History </Text>}        
               />       
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
});
