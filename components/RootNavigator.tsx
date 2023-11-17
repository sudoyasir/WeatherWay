import * as React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Search, About } from "../screens";
import { Feather } from "@expo/vector-icons";
import { useTemp } from "../context/TempartureContext";
import AnimatedSplash from "react-native-animated-splash-screen";
import {
  BACKGROUND_COLOR,
  ICON_COLOR,
  ICON_FOCUSED_COLOR,
  NAV_BACKGROUND_COLOR,
  NAV_BORDER_COLOR,
} from "../constants/colors";
import { ColorfulTabBar } from "react-navigation-tabbar-collection";

const Tab = createBottomTabNavigator();

export default function RootNavigator() {
  const { FetchError }: any = useTemp();
  const [isLoaded, setIsLoaded] = React.useState(false); // State to manage splash visibility

  React.useEffect(() => {
    // Simulate a delay for splash screen visibility (replace this with your loading logic)
    setTimeout(() => {
      setIsLoaded(true); // Set isLoaded to true after the delay
    }, 3000); // 3000 milliseconds (3 seconds) - Adjust as needed
  }, []);

  return (
    <AnimatedSplash
      translucent={true}
      isLoaded={isLoaded} // Pass the state value to control splash visibility
      logoImage={require("../assets/splash-ico.png")} // Replace with your splash screen image path
      backgroundColor="#181818" // Replace with your desired background color
    >
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              height: 70,
              position: "absolute",
              bottom: "2%",
              left: "3%",
              right: "3%",
              borderRadius: 20,
              borderWidth: 2,
              borderColor: NAV_BORDER_COLOR,
              backgroundColor: NAV_BACKGROUND_COLOR,
              borderTopWidth: 2,
              borderTopColor: NAV_BORDER_COLOR,
            },
          }}
          tabBar={(props: any) => (
            <ColorfulTabBar
              colorPalette={{
                primary: NAV_BACKGROUND_COLOR,
                secondary: "#6c757d",
                success: "#198754",
                danger: "#c9379d",
                warning: "#e6a919",
                info: "#00bcd4",
                light: "rgba(256,256,256,0.9);",
                dark: BACKGROUND_COLOR, //Foreground Color
              }}
              maxWidth={320}
              height={65}
              darkMode={true}
              {...props}
            />
          )}
        >
          {/* Tab screens */}
          {/* Home screen */}
          <Tab.Screen
            options={{
              tabBarIcon: ({ color, focused }) => (
                <View>
                  <Feather name="home" size={24} color={color} />
                </View>
              ),
            }}
            name="Home"
            component={Home}
          />

          {/* Search screen */}
          <Tab.Screen
            options={{
              tabBarIcon: ({ color, focused }) => (
                <View>
                  <Feather name="search" size={24} color={color} />
                </View>
              ),
            }}
            name="Search"
            component={Search}
          />

          {/* About screen */}
          <Tab.Screen
            options={{
              tabBarIcon: ({ color, focused }) => (
                <View>
                  <Feather name="info" size={24} color={color} />
                </View>
              ),
            }}
            name="About"
            component={About}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </AnimatedSplash>
  );
}

const styles = StyleSheet.create({});
