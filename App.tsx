import React from "react";
import { StatusBar, View } from "react-native";
import RootNavigator from "./components/RootNavigator";
import TempratureContextProvider from "./context/TempartureContext";
import Toast from "react-native-toast-message";

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />
      <TempratureContextProvider>
        <RootNavigator />
      </TempratureContextProvider>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

export default App;
