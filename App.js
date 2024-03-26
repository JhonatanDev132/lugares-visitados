import { StatusBar } from 'expo-status-bar';
import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { useEffect, useState } from 'react';

export default function App() {
  const [foto, setFoto] = useState("");
  const [minhaLocalização, setMinhaLocalizacao] = useState("");

  const [status, requestPermission] = ImagePicker.useCameraPermissions(); 

  useEffect(() => {
    async function verificaPermissoes(){
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      requestPermission(cameraStatus === "granted");
    }

    verificaPermissoes();
  },[])

  useEffect(() => {
    async function obterLocalizacao() {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Ops!", "Você não autorizou o uso de geolocalização");
        return;
      }

      let localizacaoAtual = await Location.getCurrentPositionAsync({});
      setMinhaLocalizacao(localizacaoAtual);
    }
    obterLocalizacao();
  },[]);


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

  const [localizacao, setLocalizacao] = useState("");

  const regiaoInicialMapa = {
    // São Paulo
    latitude: -23.533773,
    longitude: -46.65529,

    latitudeDelta: 40,
    longitudeDelta: 40,
  };

  const marcarLocal = () => {
    setLocalizacao({
      latitude: minhaLocalização.coords.latitude,
      longitude: minhaLocalização.coords.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.004,
    });
  };
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
          <View style={styles.center}>
            <MapView mapType='standard'
            style={styles.mapa}
            region={localizacao ?? regiaoInicialMapa}
            >
              {localizacao && <Marker coordinate={localizacao} />}
            </MapView>
          </View>

          <Button title='Pegar Localização' onPress={marcarLocal}/>
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
    flex: 1.5,
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
    flex: 1,
    backgroundColor: "yellow",
    justifyContent: "center"
  },
  mapa: {
    width: "80%",
    height: "80%",
  },
  center: {
    alignItems: "center"
  }
});
