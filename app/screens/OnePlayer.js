import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { MaterialCommunityIcons as Icon } from "react-native-vector-icons";
import { styles } from "./GameStyles";

export default class OnePlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      nrOfSteps: 0,
      score: [0, 0],
    };

    global.currentPlayer = 1;
  }

  componentDidMount() {
    this.initializeGame();
  }

  initializeGame = () => {
    this.setState({
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      currentPlayer: 1,
      nrOfSteps: 0,
    });
    currentPlayer = 1;
  }

  // Return 1 if Player 1 won, -1 if Computer won, or a 0 if no one has won
  getWinner = () => {
    const numTiles = 3;
    var arr = this.state.gameState;
    var sum;

    // Check rows
    for (var i = 0; i < numTiles; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum == 3) { return 1; }
      else if (sum == -3) { return -1; }
    }

    // Check columns
    for (var i = 0; i < numTiles; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum == 3) { return 1; }
      else if (sum == -3) { return -1; }
    }

    // Check diagonals
    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if (sum == 3) { return 1; }
    else if (sum == -3) { return -1; }

    sum = arr[2][0] + arr[1][1] + arr[0][2];
    if (sum == 3) { return 1; }
    else if (sum == -3) { return -1; }

    // There are no winners
    return 0;
  }

  playerScore = (playerId) => {
    if (playerId == 1) {
      return this.state.score[0];
    }
    if (playerId == -1) {
      return this.state.score[1];
    }
  }

  resetScore = () => {
    this.state.score[0] = 0;
    this.state.score[1] = 0;
    this.initializeGame();
  }

  randomNumber = () => {
    var number = Math.floor(Math.random() * 3); // 0..2
    return number;
  }

  onTilePress = (row, col) => {
    // Don't allow tiles to change if it is already played
    var value = this.state.gameState[row][col];
    if (value !== 0) { return; }

    // Set the correct tile
    var arr = this.state.gameState.slice(); // copy of array
    arr[row][col] = currentPlayer;
    this.setState({ gameState: arr });
    this.state.nrOfSteps++;

    // Switch to other player
    var nextPlayer = (currentPlayer == 1) ? -1 : 1;
    currentPlayer = nextPlayer;

    // Check for winners
    var winner = this.getWinner();
    if (winner == 1) {
      this.state.score[0]++;
      // Alert.alert("Player 1 is the winner!");
      Alert.alert(
        'You is the winner!',
        '', // <- this part is optional, you can pass an empty string
        [
          { text: 'OK', onPress: () => this.initializeGame() },
        ],
        { cancelable: false },
      );
      return;
    } else if (winner == -1) {
      this.state.score[1]++;
      Alert.alert(
        'Computer is the winner!',
        '',
        [
          { text: 'OK', onPress: () => this.initializeGame() },
        ],
        { cancelable: false },
      );
      return;
    }
    else if (this.state.nrOfSteps == 9) {
      Alert.alert(
        'Draw!',
        'Try one more game',
        [
          { text: 'OK', onPress: () => this.initializeGame() },
        ],
        { cancelable: false },
      );
      return;
    }

    // Computer's turn
    if (currentPlayer == -1) {
      do {
        var randomX = this.randomNumber();
        var randomY = this.randomNumber();
        // console.log("x y =", randomX, randomY);
        this.onTilePress(randomX, randomY);
      } while (currentPlayer == -1);
    }
  }

  renderIcon = (row, col) => {
    var value = this.state.gameState[row][col];
    switch (value) {
      case 1:
        return <Icon name="close" style={styles.tileX} />;
      case -1:
        return <Icon name="circle-outline" style={styles.tile0} />;
      default:
        return <View></View>;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.topButtons]}>
          <TouchableOpacity
            style={[styles.menuButton]}
            onPress={() => this.props.navigation.navigate("Home")}
          >
            <Text style={styles.topButtonsText}>Menu</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.menuButton]}
            onPress={() => this.resetScore()}
          >
            <Text style={styles.topButtonsText}>Reset</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.scoreLine}>
          <View style={styles.scorePlayer}>
            <Text style={styles.scorePlayerName}>You</Text>
            <Text style={styles.scoreNumber}>{this.playerScore(1)}</Text>
          </View>
          <Text style={styles.scoreDelimiter}>:</Text>
          <View style={styles.scorePlayer}>
            <Text style={styles.scorePlayerName}>Computer</Text>
            <Text style={styles.scoreNumber}>{this.playerScore(-1)}</Text>
          </View>
        </View>
        <View style={styles.gameDesk}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity activeOpacity={1} onPress={() => this.onTilePress(0, 0)} style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]}>
              {this.renderIcon(0, 0)}
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} onPress={() => this.onTilePress(0, 1)} style={[styles.tile, { borderTopWidth: 0 }]}>
              {this.renderIcon(0, 1)}
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} onPress={() => this.onTilePress(0, 2)} style={[styles.tile, { borderTopWidth: 0, borderRightWidth: 0 }]}>
              {this.renderIcon(0, 2)}
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity activeOpacity={1} onPress={() => this.onTilePress(1, 0)} style={[styles.tile, { borderLeftWidth: 0 }]}>
              {this.renderIcon(1, 0)}
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} onPress={() => this.onTilePress(1, 1)} style={styles.tile}>
              {this.renderIcon(1, 1)}
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} onPress={() => this.onTilePress(1, 2)} style={[styles.tile, { borderRightWidth: 0 }]}>
              {this.renderIcon(1, 2)}
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity activeOpacity={1} onPress={() => this.onTilePress(2, 0)} style={[styles.tile, { borderBottomWidth: 0, borderLeftWidth: 0 }]}>
              {this.renderIcon(2, 0)}
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} onPress={() => this.onTilePress(2, 1)} style={[styles.tile, { borderBottomWidth: 0 }]}>
              {this.renderIcon(2, 1)}
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} onPress={() => this.onTilePress(2, 2)} style={[styles.tile, { borderBottomWidth: 0, borderRightWidth: 0 }]}>
              {this.renderIcon(2, 2)}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}