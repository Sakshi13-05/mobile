// App.jsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function App() {
  return (
    <View style={styles.lightBody}>
      <View style={styles.availOptnsLight}>
        <Text style={styles.cardLight}>Option 1</Text>
        <Text style={styles.cardLight}>Option 2</Text>
      </View>

      <View style={styles.recentUpdatesLight}>
        <Text style={styles.cardLight}>Recent Update 1</Text>
        <Text style={styles.cardLight}>Recent Update 2</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  lightBody: {
    height: "80%",
    width: "100%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4, // For Android shadow
    flexDirection: "row",
    paddingLeft: 10,
    marginTop: 10,
  },

  availOptnsLight: {
    height: "75%",
    width: "50%",
    marginTop: 10,
  },

  recentUpdatesLight: {
    backgroundColor: "#23aad3",
    borderWidth: 1,
    borderColor: "#140101",
    height: "75%",
    width: "50%",
    marginTop: 10,
    marginLeft: 10,
  },

  cardLight: {
    backgroundColor: "#f3cd95",
    height: 100,
    marginTop: 15,
    width: "90%",
    borderWidth: 1,
    borderColor: "#140101",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    fontWeight: "bold",
    fontSize: 24,
    color: "red",
  },
});
