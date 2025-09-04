import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Navbar({ darkMode, changeTheme }) {
  return (
    <View style={[styles.navbar, darkMode ? styles.dark : styles.light]}>
      {/* Brand Name */}
      <Text style={[styles.title, darkMode ? styles.textDark : styles.textLight]}>
        MyApp
      </Text>

      {/* Navigation Links */}
      <View style={styles.links}>
        <Link href="/" asChild>
          <TouchableOpacity>
            <Text style={[styles.link, darkMode ? styles.textDark : styles.textLight]}>
              Home
            </Text>
          </TouchableOpacity>
        </Link>

        <Link href="/articles" asChild>
          <TouchableOpacity>
            <Text style={[styles.link, darkMode ? styles.textDark : styles.textLight]}>
              Articles
            </Text>
          </TouchableOpacity>
        </Link>
      </View>

      {/* Theme Toggle Button */}
      <TouchableOpacity onPress={changeTheme}>
        <Text style={[styles.toggle, darkMode ? styles.textDark : styles.textLight]}>
          {darkMode ? "☀️" : "🌙"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  links: {
    flexDirection: "row",
    gap: 20,
  },
  link: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  toggle: {
    fontSize: 18,
  },
  dark: {
    backgroundColor: "#222",
  },
  light: {
    backgroundColor: "#eee",
  },
  textDark: {
    color: "white",
  },
  textLight: {
    color: "black",
  },
});
