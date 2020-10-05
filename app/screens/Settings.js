import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { MaterialCommunityIcons as Icon } from "react-native-vector-icons";
import Context from '../context/userContext';

export default function App({ navigation }) {
  const { one, two } = useContext(Context);

  function replaceName() {
    const newPlayer2 = one.playerName1;
    const newPlayer1 = two.playerName2;
    one.setPlayerName1(newPlayer1);
    two.setPlayerName2(newPlayer2);
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <TouchableOpacity
        style={[styles.menuButton]}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.topButtonsText}>Menu</Text>
      </TouchableOpacity>
      <View style={styles.changeName}>
        <Text style={styles.changeNameHeader}>Player names</Text>
        <View style={styles.player}>
          <Icon name="close" style={styles.tileX} />
          <TextInput
            style={styles.input}
            maxLength={12}
            value={one.playerName1}
            onChangeText={(val) => one.setPlayerName1(val)}
          />
        </View>
        <View style={styles.player}>
          <Icon name="circle-outline" style={styles.tile0} />
          <TextInput
            style={styles.input}
            maxLength={12}
            value={two.playerName2}
            onChangeText={(val) => two.setPlayerName2(val)}
          />
        </View>
        <TouchableOpacity
          style={[styles.replaceButton]}
          onPress={() => replaceName()}
        >
          <Text style={styles.topButtonsText}>Replace names</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#14BDAC",
  },

  menuButton: {
    margin: 20,
    width: "25%",
    height: 40,
    justifyContent: "center",
    backgroundColor: "#0DA192",
    borderRadius: 10,
  },

  topButtonsText: {
    alignSelf: "center",
    fontSize: 20,
    color: "#fff",
  },

  changeName: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  changeNameHeader: {
    fontSize: 35,
    marginTop: 20,
    marginBottom: 10,
    color: "#fff",
  },

  player: {
    flexDirection: "row",
    alignItems: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: "#777",
    borderRadius: 7,
    padding: 8,
    margin: 10,
    width: 200,
    backgroundColor: "#fff",
  },

  tileX: {
    color: "#545454",
    fontSize: 40,
  },

  tile0: {
    color: "#F2EBD3",
    fontSize: 40,
  },

  replaceButton: {
    margin: 20,
    marginBottom: 80,
    width: "50%",
    height: 40,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#0DA192",
    borderRadius: 10,
  },
});