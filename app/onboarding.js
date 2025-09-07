// File: mobile/app/onboarding.js

import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
const PRIMARY_COLOR = '#D90429';

// The require paths MUST match your file locations exactly.
const slides = [
  {
    id: '1',
    image: require('../assets/images/img1.webp'),
    title: 'Book an Ambulance in Seconds',
    subtitle: 'Quick and reliable booking for immediate response during emergencies.',
  },
  {
    id: '2',
    image: require('../assets/images/img2.jpg'),
    title: 'Real-Time Ambulance Tracking',
    subtitle: 'Track your ambulance in real-time, ensuring you know exactly when help will arrive.',
  },
  {
    id: '3',
    image: require('../assets/images/img3.jpg'),
    title: '24/7 Service Availability',
    subtitle: 'Emergency services available around the clock, ensuring help is always nearby.',
  },
  
];

const OnboardingItem = ({ item }) => {
  return (
    <View style={styles.slide}>
        <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      
    </View>
  );
};

const Footer = ({ currentSlideIndex, onNext, onSkip }) => {
    const isLastSlide = currentSlideIndex === slides.length - 1;
  
    return (
      <View style={styles.footerContainer}>
        {/* Indicator dots */}
        <View style={styles.indicatorContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex === index && styles.indicatorActive,
              ]}
            />
          ))}
        </View>
  
        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          {isLastSlide ? (
            <TouchableOpacity style={[styles.button, styles.btnGetStarted]} onPress={onNext}>
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity style={[styles.button, styles.btnSkip]} onPress={onSkip}>
                <Text style={[styles.buttonText, { color: 'gray' }]}>Skip</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.btnNext]} onPress={onNext}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    );
  };

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = useRef(null);

  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const handleNext = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex < slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current?.scrollToOffset({ offset });
      setCurrentSlideIndex(nextSlideIndex);
    } else {
        router.replace('/(auth)');
    }
  };

  const handleSkip = () => {
    router.replace('/(auth)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        data={slides}
        renderItem={({ item }) => <OnboardingItem item={item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
      />
      <Footer currentSlideIndex={currentSlideIndex} onNext={handleNext} onSkip={handleSkip} />
    </SafeAreaView>
  );
}

// STYLES UPDATED FOR WEB COMPATIBILITY
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    slide: { 
        width: width, // Each slide must take up the full screen width
        alignItems: 'center', 
        justifyContent: 'center',
        paddingBottom: 100, // Add padding to push content up
    },
    image: { 
        width: width * 0.9, // Make image 90% of screen width
        height: undefined,
        aspectRatio: 1, // Force image to be square-ish, prevents collapsing
    },
    textContainer: { paddingHorizontal: 40, marginTop: 40 },
    title: { fontSize: 24, fontWeight: 'bold', color: '#1c1c1e', textAlign: 'center', marginBottom: 15 },
    subtitle: { fontSize: 16, color: 'gray', textAlign: 'center', lineHeight: 23 },
    footerContainer: { 
        position: 'absolute', // Position footer at the bottom
        bottom: 0,
        left: 0,
        right: 0,
        height: height * 0.25, 
        justifyContent: 'space-between', 
        paddingHorizontal: 20 
    },
    indicatorContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
    indicator: { height: 4, width: 10, backgroundColor: '#E0E0E0', marginHorizontal: 3, borderRadius: 2 },
    indicatorActive: { backgroundColor: PRIMARY_COLOR, width: 25 },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      marginBottom: 40,
    },
    button: {
      height: 60,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
    btnSkip: {
      flex: 1,
      marginRight: 10,
      backgroundColor: 'transparent',
    },
    btnNext: {
      flex: 1,
      marginLeft: 10,
      backgroundColor: PRIMARY_COLOR,
    },
    btnGetStarted: {
      flex: 1,
      backgroundColor: PRIMARY_COLOR,
    },
    buttonText: {
      fontWeight: 'bold',
      fontSize: 16,
      color: 'white',
    },
  });