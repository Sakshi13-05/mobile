import React from "react";
import { View, StyleSheet } from "react-native";
import Navbar from "./Navbar";
import Body from "./Body";

function Homepage({ darkMode, changeTheme }) {
  return (
    <View style={darkMode ? styles.darkMode : styles.lightMode}>
      <Navbar darkMode={darkMode} changeTheme={changeTheme} />
      <Body darkMode={darkMode} />
    </View>
  );
}

const styles = StyleSheet.create({
  darkMode: {
    flex: 1,
    backgroundColor: "black",
  },
  lightMode: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default Homepage;
