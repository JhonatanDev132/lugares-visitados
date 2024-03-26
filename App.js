import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RegistrarLugar from './screen/RegistrarLugar'
import Home from './screen/Home'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
    <StatusBar barStyle = 'default'/>
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerStyle: { backgroundColor: "#2b2b2b" },
        headerTintColor: "white"
      }}/>
      <Stack.Screen name='Home' component={Home} options={{ headerShown: false }}/>
      <Stack.Screen name='RegistrarLugar' component={RegistrarLugar} options={{title: "Registre um momento"}}/>
    </NavigationContainer>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 2
  }
})