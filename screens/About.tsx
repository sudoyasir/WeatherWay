import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import * as WebBrowser from "expo-web-browser";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";
import { BACKGROUND_COLOR } from "../constants/colors";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const About = () => {
  const [repo, setRepo] = useState(null);
  const [selectedItem, setSelectedItem] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const fetchRepo = async () => {
    try {
      const response = await fetch(
        "https://api.github.com/repos/yasir2002/WeatherWay"
      );
      const data = await response.json();
      setRepo(data);
    } catch (error) {
      console.error("Error fetching repository", error);
    }
  };

  useEffect(() => {
    fetchRepo();
  }, []);

  const handleItemClick = () => {
    if (!selectedItem) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
    setSelectedItem(!selectedItem);
  };

  const handleStarButtonClick = async () => {
    const githubRepoUrl = "https://github.com/yasir2002/WeatherWay";
    await WebBrowser.openBrowserAsync(githubRepoUrl);
  };

  return (
    <View style={styles.main}>
      <StatusBar style="light" />
      <ScrollView style={styles.scrollViewContent}>
        <View style={styles.introContainer}>
          <Text style={styles.introText}>Hello Explorer! 🚀</Text>
          <Text style={styles.detailedIntroText}>
            Welcome aboard my meteoric mobile creation, a stellar project
            crafted during the intergalactic journey of the Mobile Application
            Development course. {"\n"}This cosmic weather app harnesses the power
            of the OpenWeatherMap API to unveil the atmospheric secrets of any
            location.
            {"\n"}
            {"\n"}
            Dive into the source code nebula on GitHub at
          </Text>
        </View>
        <TouchableOpacity style={styles.repoCard} onPress={handleItemClick}>
          <View style={styles.repoHeader}>
            <SimpleLineIcons
              name="social-github"
              size={24}
              color="white"
              style={styles.githubIcon}
            />
            <Text style={styles.repoName}>
              {repo ? repo.name : "Loading..."}
            </Text>
            {selectedItem ? (
              <MaterialIcons
                name="keyboard-arrow-up"
                size={24}
                color="white"
                style={styles.arrowIcon}
              />
            ) : (
              <MaterialIcons
                name="keyboard-arrow-down"
                size={24}
                color="white"
                style={styles.arrowIcon}
              />
            )}
          </View>
        </TouchableOpacity>
        {selectedItem && repo && (
          <Animated.View style={[styles.expandedOption, { opacity: fadeAnim }]}>
            <Text style={styles.text}>{repo.description}</Text>
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <SimpleLineIcons
                  name="star"
                  size={12}
                  color="white"
                  style={styles.infoIcon}
                />
                <Text style={styles.infoText}>{repo.stargazers_count}</Text>
              </View>
              <View style={styles.infoItem}>
                <SimpleLineIcons
                  name="share"
                  size={12}
                  color="white"
                  style={styles.infoIcon}
                />
                <Text style={styles.infoText}>{repo.forks_count}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.starButton}
              onPress={handleStarButtonClick}
            >
              <SimpleLineIcons
                name="star"
                size={18}
                color="white"
                style={styles.starIcon}
              />
              <Text style={styles.starText}>Star</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
        <View style={styles.starRepoMessage}>
          <Text style={styles.text}>
            If you like this app, please consider starring the repository on
            GitHub!
          </Text>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.textlite}>Made with ❤ by Yasir</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  introContainer: {
    padding: 20,
    marginTop: 10,
  },
  introText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  detailedIntroText: {
    fontSize: 13,
    color: "gray",
  },
  text: {
    color: "rgba(256,256,256,0.9)",
    marginBottom: 10,
  },
  textlite: {
    color: "rgba(256,256,256,0.4)",
    fontSize: 10,
  },
  repoCard: {
    backgroundColor: "#333",
    padding: 20,
    margin: 10,
    borderRadius: 8,
  },
  repoHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  arrowIcon: {
    marginLeft: 10,
  },
  repoName: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  expandedOption: {
    backgroundColor: "#333",
    margin: 10,
    padding: 20,
    borderRadius: 8,
  },
  starButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6e5494",
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
  },
  starIcon: {
    marginRight: 5,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  infoIcon: {
    marginRight: 5,
  },
  infoText: {
    color: "white",
  },
  starText: {
    color: "white",
    fontWeight: "bold",
  },
  starRepoMessage: {
    marginTop: 20,
    paddingHorizontal: 25,
  },
  footer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  githubIcon: {
    marginRight: 10,
  },
});

export default About;
