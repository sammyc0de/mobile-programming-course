import { StatusBar } from 'expo-status-bar';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';


export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 16, fontWeight: 'bold'}}>Ensimmäinen harjoitus</Text>
       <Button onPress={buttonPressed} title="Paina tästä" />
      <StatusBar style="auto" />
    </View>
  );
}

const buttonPressed = () => {
  Alert.alert("Painiketta painettu");
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
