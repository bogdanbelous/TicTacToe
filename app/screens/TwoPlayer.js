import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { MaterialCommunityIcons as Icon } from "react-native-vector-icons";
import Context from '../context/userContext';
import { styles } from "./GameStyles";

export default class TwoPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      currentPlayer: 1,
      nrOfSteps: 0,
      score: [0, 0],
    };
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
  }

  // Return 1 if Player 1 won, -1 if Player 2 won, or a 0 if no one has won
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

  onTilePress = (row, col) => {
    // Don't allow tiles to change if it is already played
    var value = this.state.gameState[row][col];
    if (value !== 0) { return; }

    // Grab current player
    var currentPlayer = this.state.currentPlayer;

    // Set the correct tile
    var arr = this.state.gameState.slice(); // copy of array
    arr[row][col] = currentPlayer;
    this.setState({ gameState: arr });
    this.state.nrOfSteps++;

    // Switch to other player
    var nextPlayer = (currentPlayer == 1) ? -1 : 1;
    this.setState({ currentPlayer: nextPlayer });

    // Check for winners
    var winner = this.getWinner();

    if (winner == 1) {
      this.state.score[0]++;
      const winnerX = this.context.one.playerName1 + " is the winner!";
      Alert.alert(
        winnerX,
        '', // <- this part is optional, you can pass an empty string
        [
          { text: 'OK', onPress: () => this.initializeGame() },
        ],
        { cancelable: false },
      );
    } else if (winner == -1) {
      this.state.score[1]++;
      const winnerO = this.context.two.playerName2 + " is the winner!";
      Alert.alert(
        winnerO,
        '',
        [
          { text: 'OK', onPress: () => this.initializeGame() },
        ],
        { cancelable: false },
      );
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
    const player1 = this.context.one.playerName1;
    const player2 = this.context.two.playerName2;

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
            <Text style={styles.scorePlayerName}>{player1}</Text>
            <Text style={styles.scoreNumber}>{this.playerScore(1)}</Text>
          </View>
          <Text style={styles.scoreDelimiter}>:</Text>
          <View style={styles.scorePlayer}>
            <Text style={styles.scorePlayerName}>{player2}</Text>
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

TwoPlayer.contextType = Context;