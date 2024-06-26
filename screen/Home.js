import { Pressable, StyleSheet, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { StatusBar } from "expo-status-bar";

export default function Home({ navigation }) {
  return (
    <>
      <StatusBar />
      <SafeAreaView style={styles.subcontainer}>
        <View style={styles.viewGeral}>
          
            <View style={styles.viewHome}>
              <View>
                <Text style={styles.titulo}>Momentos Bons</Text>
              </View>

              <View style={styles.campoBotao}>
                <Pressable
                  style={styles.botao}
                  onPress={() => navigation.navigate("RegistrarLugar")}
                >
                  <Text style={styles.textoBotao}>Criar um momento</Text>
                </Pressable>

                <Pressable
                  style={styles.botao}
                  onPress={() => navigation.navigate("MomentosSalvos")}
                >
                  <Text style={styles.textoBotao}>Momentos Salvos</Text>
                </Pressable>
              </View>
            </View>
          
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  subcontainer: {
    flex: 1,
    backgroundColor: "yellow",
  },
  viewGeral: {
    flex: 1,
    backgroundColor: "red",
    justifyContent: "center"
  },
  viewHome: {
    alignItems: "center",
    backgroundColor: "#EEEEEE",
    
    justifyContent: "center"
  },
  titulo: {
    fontSize: 30,
    marginBottom: 50,
    fontWeight: "bold",
  },
  campoBotao: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  botao: {
    backgroundColor: "#2b2b2b",
    padding: 10,
  },
  textoBotao: {
    color: "#EEEEEE",
    fontSize: 15,
  },
});
