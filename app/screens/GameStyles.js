import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#14BDAC",
  },

  topButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
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

  scoreLine: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  scorePlayer: {
    alignItems: "center",
    width: "30%",
  },

  scorePlayerName: {
    color: "#fff",
  },

  scoreNumber: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
  },

  scoreDelimiter: {
    fontSize: 40,
    paddingTop: 20,
    alignSelf: "center",
    color: "#fff",
  },

  gameDesk: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  tile: {
    borderWidth: 3,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#0DA192",
  },

  tileX: {
    color: "#545454",
    fontSize: 85,
  },

  tile0: {
    color: "#F2EBD3",
    fontSize: 75,
  },
});

export { styles }