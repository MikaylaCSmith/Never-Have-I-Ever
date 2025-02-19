// HomeScreen.js
import React, { useRef } from 'react';
import { View, Text, Pressable, StyleSheet, Image, Animated } from 'react-native';
import { globalStyles } from './styles';

const HomeScreen = ({ navigation }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={globalStyles.container}>
      <Text style={styles.title}>Never Have I Ever</Text>
      <View style={styles.imageContainer}>
        <Image source={require('./assets/spade.jpg')} style={styles.cardImage} />
        <View style={styles.buttonContainer}>
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <Pressable
              style={styles.button}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={() => navigation.navigate('DeckSelection')}
            >
              <Text style={styles.buttonText}>Play!</Text>
            </Pressable>
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: -30
  },
  title: {
    fontSize: 40,
    color: '#000000', 
    marginBottom: 50,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardImage: {
    width: 370,
    height: 510,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 45,
  },
   button: {
    backgroundColor: '#000000',
    paddingVertical: 20,
    paddingHorizontal: 140,
    borderRadius: 8,
   },
   buttonText: {
    color: '#FFFFFF',
    fontSize: 50,
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 10
  },
});

export default HomeScreen
