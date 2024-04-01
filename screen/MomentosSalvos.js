import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MapView, { Marker } from 'react-native-maps';

export default function MomentosSalvos() {
    const [momentos, setMomentos] = useState([]);

    useEffect(() => {
        const carregarMomentosSalvos = async () => {
            try {
                const momentosSalvos = await AsyncStorage.getItem('@lugarsalvo');
                if(momentosSalvos !== null) {
                    setMomentos(JSON.parse(momentosSalvos));
                }
            } catch (error) {
                console.error('Error ao carregar momentos salvos:', error);
            }
        };

        carregarMomentosSalvos();
    }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Momentos Salvos</Text>
      {momentos.length > 0 ? (
        <FlatList
         data={momentos}
         keyExtractor={(index) => index.toString()}
         renderItem={({ item }) => (
            <View style={styles.momento}>
                <Image source={{ uri: item.foto}} style={styles.imagem}/>
                <MapView
                style={styles.map}
                initialRegion={{
                    latitude: item.localizacao.latitude,
                    longitude: item.localizacao.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.004,
                }}
                >
                    <Marker
                        coordinate={{
                            latitude: item.localizacao.latitude,
                            longitude: item.localizacao.longitude
                        }}
                    />
                </MapView>
            </View>
         )}
        />
      ): (
        <Text style={styles.textoVazio}>Nenhum momento salvo ainda.</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 20,
      },
      titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      item: {
        marginBottom: 20,
      },
      imagem: {
        width:  130,
        height: 130,
        
      },
      descricao: {
        fontSize: 16,
      },
      textoVazio: {
        fontSize: 16,
      },
      momento: {

        marginVertical: 15,
        flexDirection: "row",
        padding: 15,
        borderWidth: 1,
        justifyContent: "space-between"
      },
      map: {
        width: 130,
        height: 130,
        borderRadius: 10,
    },
})