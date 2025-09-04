// Articles.jsx
import React, { useRef } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

const cardWidth = 320;
const screenWidth = Dimensions.get("window").width;

let Articles=()=>{
  const scrollRefs = {
    1: useRef(null),
    2: useRef(null),
    3: useRef(null),
  };

  const carousels = [
    { id: 1, title: "Frequently Searched Articles" },
    { id: 2, title: "Popular Topics" },
    { id: 3, title: "Recent Updates" },
  ];

  const cards = [
    { id: 1, title: "Card 1", content: "This is the first card in the horizontal scroller" },
    { id: 2, title: "Card 2", content: "Second card with different content" },
    { id: 3, title: "Card 3", content: "Another interesting card in our collection" },
    { id: 4, title: "Card 4", content: "Fourth card with important information" },
    { id: 5, title: "Card 5", content: "The fifth and final card in this example" },
    { id: 6, title: "Card 6", content: "Bonus card to demonstrate scrolling" },
  ];

  const scrollLeft = (id) => {
    if (scrollRefs[id].current) {
      scrollRefs[id].current.scrollTo({
        x: -cardWidth,
        animated: true,
      });
    }
  };

  const scrollRight = (id) => {
    if (scrollRefs[id].current) {
      scrollRefs[id].current.scrollTo({
        x: cardWidth,
        animated: true,
      });
    }
  };

  return (
    <View style={styles.container}>
      {carousels.map((carousel) => (
        <View key={carousel.id} style={styles.carouselContainer}>
          <Text style={styles.heading}>{carousel.title}</Text>

          <View style={styles.scrollerContainer}>
            <TouchableOpacity style={styles.arrowBtn} onPress={() => scrollLeft(carousel.id)}>
              <Text style={styles.arrowText}>←</Text>
            </TouchableOpacity>

            <ScrollView
              horizontal
              ref={scrollRefs[carousel.id]}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.cardsWrapper}
            >
              {cards.map((card) => (
                <View key={card.id} style={styles.card}>
                  <Text style={styles.cardTitle}>{card.title}</Text>
                  <Text style={styles.cardText}>{card.content}</Text>
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity style={styles.arrowBtn} onPress={() => scrollRight(carousel.id)}>
              <Text style={styles.arrowText}>→</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
}

export default Articles;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  carouselContainer: {
    marginBottom: 30,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 20,
  },
  scrollerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardsWrapper: {
    flexDirection: "row",
    gap: 20,
    paddingVertical: 10,
  },
  card: {
    width: 300,
    height: 200,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
    fontWeight: "600",
  },
  cardText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  arrowBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginHorizontal: 5,
  },
  arrowText: {
    fontSize: 20,
  },
});
