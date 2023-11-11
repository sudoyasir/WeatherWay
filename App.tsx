import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import RootNavigator from "./components/RootNavigator";
import TempratureContextProvider from "./context/TempartureContext";
import Toast from "react-native-toast-message";

const App = () => {
  return (
    <TempratureContextProvider>
      <View style={{ flex: 1 }}>
        <RootNavigator />
        <Toast  />
      </View>
    </TempratureContextProvider>
  );
};


export default App;
