import { StatusBar } from 'expo-status-bar';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react';

export default function App() {
  const [foto, setFoto] = useState("");

  const [status, requestPermission] = ImagePicker.useCameraPermissions(); 
  return (
    <>
      <StatusBar />
    <View style={styles.container}>
      <View style={styles.campoFoto}>
          <View style={styles.viewFoto}>
            <Image/>
          </View>
          <View>
            <Button title='Tirar Foto'/>
          </View>
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewFoto: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  campoFoto: {
    flex: 1,
    backgroundColor: "green"
  },
});
