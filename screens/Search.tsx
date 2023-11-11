import React, { useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";

// Colors
import { BACKGROUND_COLOR, NAV_BACKGROUND_COLOR } from "../constants/colors";

// Icons
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useTemp } from "../context/TempartureContext";
import Loading from "./Loading";
import Toast from "react-native-toast-message";

// Screen Height and Width
const { height, width } = Dimensions.get("window");

const Search = () => {
  const [cityVal, setCityVal] = useState("Islamabad");
  const date = new Date();
  const Full_Date: string = date.toDateString();

  const { tempMode, StateWeatherData, getStateWeatherData, FetchError }: any =
    useTemp();

  // useEffect to get weather data on component mount
  React.useEffect(() => {
    getStateWeatherData(cityVal);
    console.log("Search: ", cityVal);
  }, []);

  // Function to clear input
  const clearInput = () => {
    setCityVal("");
  };

  // Function to submit input
  const submit = async () => {
    try {
      await getStateWeatherData(cityVal);
      console.log("Search: ", cityVal);

      // Clear input after 1 sec
      setTimeout(() => {
        setCityVal("");
      }, 1000);
    } catch (error) {
      // Show error message
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error',
        text2: error.message,
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
      
    }
  };

  // Function to change city value
  const changeFun = (val: string) => {
    setCityVal(val);
  };

  // Conditional rendering based on weather data
  if (StateWeatherData) {
    const { main } = StateWeatherData.weather[0];
    const { temp, pressure, humidity } = StateWeatherData.main;
    const { speed } = StateWeatherData.wind;
    const dd = new Date(StateWeatherData.dt * 1000).getUTCDay();
    const date = new Date();
    const hour = date.getHours();

    return (
      <View style={styles.main}>
        <StatusBar style="light" />

        {/* Search bar */}
        <View style={styles.searchCity}>
          <TextInput
            style={styles.search}
            placeholder="Search Cities"
            placeholderTextColor={"rgba(256,256,256,0.4)"}
            keyboardType="web-search"
            returnKeyType="search"
            onSubmitEditing={submit}
            onChangeText={changeFun}
            value={cityVal}
          />
          {cityVal.length > 0 && (
            // Clear icon
            <TouchableOpacity style={styles.clearIcon} onPress={clearInput}>
              <MaterialIcons name="clear" size={24} color="#fff" />
            </TouchableOpacity>
          )}
        </View>

        {/* Weather Icon */}
        <View style={[styles.weatherIconView]}>
          {/* Weather condition-specific icons */}
          {main === "Haze" ? (
            <Image
              style={{ height: 120, width: 160 }}
              source={require(`../assets/weatherIcons/Haze.png`)}
            />
          ) : null}
          {main === "Rain" ? (
            <Image
              style={{ height: 160, width: 160 }}
              source={require(`../assets/weatherIcons/Rain.png`)}
            />
          ) : null}
          {main === "Snow" ? (
            <Image
              style={{ height: 130, width: 160 }}
              source={require(`../assets/weatherIcons/SnowFall.png`)}
            />
          ) : null}
          {main === "Thunderstorm" ? (
            <Image
              style={{ height: 160, width: 160 }}
              source={require(`../assets/weatherIcons/ThunderStorm.png`)}
            />
          ) : null}

          {/*Drizzle Weather */}
          {main === "Drizzle" && hour < 19 ? (
            <Image
              style={{ height: 160, width: 160 }}
              source={require(`../assets/weatherIcons/Drizzle.png`)}
            />
          ) : null}
          {main === "Drizzle" && hour >= 19 ? (
            <Image
              style={{ height: 160, width: 160 }}
              source={require(`../assets/weatherIcons/Night_Drizzle.png`)}
            />
          ) : null}

          {/*Mist Weather */}
          {main === "Mist" && hour < 19 ? (
            <Image
              style={{ height: 130, width: 170 }}
              source={require(`../assets/weatherIcons/Mist.png`)}
            />
          ) : null}
          {main === "Mist" && hour >= 19 ? (
            <Image
              style={{ height: 150, width: 150 }}
              source={require(`../assets/weatherIcons/Night_Mist.png`)}
            />
          ) : null}

          {/*Cloudy Weather */}
          {main === "Clouds" && hour < 19 ? (
            <Image
              style={{ height: 130, width: 170 }}
              source={require(`../assets/weatherIcons/Cloudy.png`)}
            />
          ) : null}
          {main === "Clouds" && hour >= 19 ? (
            <Image
              style={{ height: 160, width: 160 }}
              source={require(`../assets/weatherIcons/Night_Cloudy.png`)}
            />
          ) : null}

          {/*Clear Weather */}
          {main === "Clear" && hour < 19 ? (
            <Image
              style={{ height: 160, width: 160 }}
              source={require(`../assets/weatherIcons/Sunny.png`)}
            />
          ) : null}
          {main === "Clear" && hour >= 19 ? (
            <Image
              style={{ height: 150, width: 160 }}
              source={require(`../assets/weatherIcons/Night_Clear.png`)}
            />
          ) : null}

          {/* Smokey Weather */}
          {main === "Smoke" && hour < 19 ? (
            <Image
              style={{ height: 160, width: 160 }}
              source={require(`../assets/weatherIcons/Smoke.png`)}
            />
          ) : null}
          {main === "Smoke" && hour >= 19 ? (
            <Image
              style={{ height: 150, width: 160 }}
              source={require(`../assets/weatherIcons/Night_Smoke.png`)}
            />
          ) : null}
        </View>

        {/* Temperature */}
        <View>
          <Text style={styles.tempText}>
            {parseInt(temp)}
            <Text style={styles.tempmodeText}>{tempMode ? "°F" : "°C"}</Text>
          </Text>
        </View>

        {/* Weather Condition */}
        <View>
          <Text style={styles.weatherState}>{main}</Text>
        </View>

        {/* Current Location */}
        <View style={styles.location}>
          <Ionicons name="md-location-outline" size={25} color="#3ddc84" />
          <Text style={styles.locationText}>{StateWeatherData.name}</Text>
          <Text style={styles.countryText}>{StateWeatherData.sys.country}</Text>
        </View>

        {/* Other Weather Data */}
        <View style={styles.otherData}>
          {/* Humidity */}
          <View style={styles.Humidity}>
            <MaterialCommunityIcons
              name="water-outline"
              size={36}
              color="rgba(256,256,256,0.9)"
            />
            <Text style={styles.otherDataValueText}>
              {humidity} <Text style={styles.unitText}>%</Text>
            </Text>
            <Text style={styles.otherDataText}>Humidity</Text>
          </View>

          {/* Wind Speed */}
          <View style={styles.Pressure}>
            <MaterialCommunityIcons
              name="weather-windy"
              size={36}
              color="rgba(256,256,256,0.9)"
            />
            <Text style={styles.otherDataValueText}>
              {speed} <Text style={styles.unitText}>km/h</Text>
            </Text>
            <Text style={styles.otherDataText}>Wind</Text>
          </View>

          {/* Pressure */}
          <View style={styles.WindSpeed}>
            <MaterialCommunityIcons
              name="weather-pouring"
              size={36}
              color="rgba(256,256,256,0.9)"
            />
            <Text style={styles.otherDataValueText}>
              {pressure} <Text style={styles.unitText}>hPa</Text>
            </Text>
            <Text style={styles.otherDataText}>Pressure</Text>
          </View>
        </View>
      </View>
    );
  } else {
    // Loading component while waiting for weather data
    return <Loading />;
  }
};

export default Search;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  searchCity: {
    display: "flex",
    flexDirection: "row",
    marginTop: "15%",
    marginHorizontal: "4%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  search: {
    backgroundColor: NAV_BACKGROUND_COLOR,
    padding: 10,
    flex: 1,
    borderRadius: 30,
    color: "rgba(256,256,256,0.9)",
    paddingLeft: 25,
  },
  clearIcon: {
    position: "absolute",
    right: 10,
    top: 12,
  },
  date: {
    marginLeft: "7%",
  },
  dateText: {
    color: "rgba(256,256,256,0.63)",
    fontSize: 12,
  },
  location: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 50,
  },
  locationText: {
    color: "rgba(256,256,256,0.9)",
    fontSize: 30,
    fontWeight: "normal",
    marginLeft: 4,
    textTransform: "capitalize",
  },
  countryText: {
    color: "rgba(256,256,256,0.7)",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    textTransform: "uppercase",
  },
  weatherIconView: {
    display: "flex",
    alignItems: "center",
    // backgroundColor:'red',
    marginVertical: 30,
  },
  tempText: {
    color: "rgba(256,256,256,0.9)",
    fontSize: 60,
    alignSelf: "center",
  },
  tempmodeText: {
    color: "rgba(256,256,256,0.4)",
  },
  weatherState: {
    color: "rgba(256,256,256,0.55)",
    fontSize: 16,
    alignSelf: "center",
    textTransform: "uppercase",
    fontWeight: "600",
    letterSpacing: 2,
  },
  otherData: {
    flex: 1,
    flexDirection: "row",
    width: width - 30,
    // backgroundColor:NAV_BACKGROUND_COLOR,
    alignSelf: "center",
    justifyContent: "space-between",
    marginVertical: 5,
    borderRadius: 30,
    marginBottom: 40,
  },
  Humidity: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    backgroundColor: NAV_BACKGROUND_COLOR,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  Pressure: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    backgroundColor: NAV_BACKGROUND_COLOR,
    borderRadius: 25,
    marginHorizontal: 5,
  },
  WindSpeed: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    backgroundColor: NAV_BACKGROUND_COLOR,
    borderRadius: 25,
    marginHorizontal: 5,
  },
  otherDataValueText: {
    fontSize: 14,
    color: "rgba(256,256,256,0.9)",
  },
  otherDataText: {
    fontSize: 14,
    color: "rgba(256,256,256,0.55)",
    marginTop: 10,
    textTransform: "capitalize",
  },
  unitText: {
    fontSize: 11,
    color: "rgba(256,256,256,0.55)",
  },
  DailyData: {
    flex: 1,
    width: width - 30,
    // backgroundColor:NAV_BACKGROUND_COLOR,
    alignSelf: "center",
    borderRadius: 30,
  },
});
