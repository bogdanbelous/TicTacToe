import React, { useState } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainMenu from "./app/screens/MainMenu";
import Settings from "./app/screens/Settings";
import OnePlayer from "./app/screens/OnePlayer";
import TwoPlayer from "./app/screens/TwoPlayer";
import Context from "./app/context/userContext";

const Stack = createStackNavigator();

function App() {
  const [playerName1, setPlayerName1] = useState('Player 1');
  const [playerName2, setPlayerName2] = useState('Player 2');

  const obj = { one: { playerName1, setPlayerName1 }, two: { playerName2, setPlayerName2 } }

  return (
    <Context.Provider value={obj}>
      <NavigationContainer>
        <StatusBar hidden={true} />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Home"
        >
          <Stack.Screen name="Home" component={MainMenu} />
          <Stack.Screen
            name="Settings"
            component={Settings}
          />
          <Stack.Screen
            name="OnePlayer"
            component={OnePlayer}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen
            name="TwoPlayer"
            component={TwoPlayer}
            options={{ gestureEnabled: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Context.Provider>
  );
}

export default App;