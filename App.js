import { StatusBar } from 'expo-status-bar';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { useEffect, useState } from 'react';

export default function App() {
  const [foto, setFoto] = useState("");

  const [status, requestPermission] = ImagePicker.useCameraPermissions(); 
  console.log(status);

  useEffect(() => {
    async function verificaPermissoes(){
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      requestPermission(cameraStatus === "granted");
    }

    verificaPermissoes();
  },[])

  const tirarFoto = async () => {
    const imagem = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [16, 9],
      quality: 1
    });

    if (!imagem.canceled) {
      await MediaLibrary.saveToLibraryAsync(imagem.assets[0].uri);
      setFoto(imagem.assets[0].uri);
    }
  }
  return (
    <>
      <StatusBar />
    <View style={styles.container}>
      <View style={styles.campoFoto}>

          <View style={styles.foto}>
            {foto ? (
              <Image source={{ uri: foto }} style={{width: 300, height: 300}} />
            ) : (
              <Text style={styles.texto}>Sem Foto!</Text>
            )}
          </View>


            <Button onPress={tirarFoto} title='Tirar Foto'/>
      </View>
      <View style={styles.campoMapa}>
          <View>
            <MapView></MapView>
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
  campoFoto: {
    flex: 1,
    backgroundColor: "green",
    justifyContent: "center",
  },
  foto: {
    alignItems: "center",
    marginBottom: 50
  },
  texto: {
    fontSize: 30,
    fontWeight: "bold"
  },
  campoMapa: {

  },
});
