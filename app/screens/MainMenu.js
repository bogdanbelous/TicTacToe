import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons as Icon } from "react-native-vector-icons";

export default function MainMenu({ navigation }) {
  return (
    < ImageBackground
      source={require("../assets/background.png")}
      style={styles.container}
    >
      <TouchableOpacity
        style={[styles.settingsButton]}
        onPress={() => navigation.navigate("Settings")}
      >
        <Icon name="settings-outline" style={styles.settings} />
      </TouchableOpacity>

      <View style={styles.logo}>
        <Text style={styles.logoText}>Tic Tac Toe</Text>
      </View>
      <View style={styles.buttonsList}>
        <TouchableOpacity
          style={[styles.button, styles.startButton]}
          onPress={() => navigation.navigate("OnePlayer")}
        >
          <Text style={styles.buttonText}>One Player</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.startButton]}
          onPress={() => navigation.navigate("TwoPlayer")}
        >
          <Text style={styles.buttonText}>Two Player</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "repeat",
  },

  settings: {
    margin: 20,
    fontSize: 30,
    color: "#0C6F65",
    alignSelf: "flex-end",
  },

  logo: {
    alignItems: "center",
    marginTop: 70,
    marginBottom: 30,
  },

  logoText: {
    fontSize: 45,
    fontWeight: "bold",
    color: "#262626",
  },

  buttonsList: {
    flex: 1,
    alignItems: "center",
  },

  button: {
    alignContent: "center",
    justifyContent: "center",
    width: "70%",
    height: 70,
    marginTop: 10,
    borderRadius: 10,
  },

  startButton: {
    backgroundColor: "#0DA192",
  },

  buttonText: {
    alignSelf: "center",
    fontSize: 20,
    color: "#fff",
  },
});
