import React from 'react';
import { View, Text, StyleSheet, Pressable, ImageBackground, Platform } from 'react-native';
import { globalStyles } from './styles';

const HowToPlay = ({ navigation, route }) => {
  const deckParams = route.params || { deckType: 'base' };
  console.log('HowToPlay deckParams:', deckParams);
  
  const steps = Platform.OS === 'web' 
    ? [
        "1. Choose a deck of questions to play with\n",
        "2. Press 'Start Game' to begin\n",
        "3. Read the question out loud\n",
        "4. Click the 'Next Question' button to move to the next question\n"
      ]
    : [
        "1. Choose a deck of questions to play with\n",
        "2. Press 'Start Game' to begin\n",
        "3. Read the question out loud\n",
        "4. Shake your device to move to the next question\n",
        "5. Take turns answering questions and have fun!\n"
      ];

  return (
    <View style={globalStyles.container}>
      <View style={styles.imageContainer}>
        <ImageBackground 
          source={require('./assets/empty.jpg')} 
          style={styles.cardImage} 
          imageStyle={{ resizeMode: 'contain' }} 
        >
          <View style={styles.instructionsContainer}>
            <Text style={styles.title}>How To Play</Text>
            <Text style={styles.instructions}>
              {steps.map((step, index) => (
                <Text key={index} style={styles.step}>{step}</Text>
              ))}
            </Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={globalStyles.button}
          onPress={() => {
            const params = {
              deckType: deckParams.deckType || 'base',
              deckId: deckParams.deckId
            };
            console.log('Navigating to CardScreen with params:', params);
            navigation.navigate('CardScreen', params);
          }}
        >
          <Text style={globalStyles.buttonText}>Start Game</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    color: '#000000', 
    marginBottom: 30,
    fontWeight: 'bold',
    position: 'absolute',
    top: -80,
    marginHorizontal: 100,
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  cardImage: {
    width: 370,
    height: 510,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructionsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
  },
  instructions: {
    fontSize: 21,
    color: '#474747', 
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  step: {
    fontSize: 21,
    color: '#474747',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default HowToPlay;

