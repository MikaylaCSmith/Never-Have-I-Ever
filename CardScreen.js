// CardScreen.js
import React, { useState, useEffect } from 'react'; 
import { View, Text, StyleSheet, Pressable, Alert, Platform } from 'react-native'; 
import { Accelerometer } from 'expo-sensors'; 
import { globalStyles } from './styles';
import { questions as baseQuestions } from './questions'; 
import { Ionicons } from '@expo/vector-icons'; 
import { ImageBackground } from 'react-native'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 

// Function to shuffle an array using the Fisher-Yates algorithm.
// It creates a copy of the input array and randomly swaps elements to ensure a uniform shuffle.
const shuffleArray = (array) => {
  let shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const CardScreen = ({ navigation, route }) => {
  // State variables to manage the shuffled list of questions.
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Effect hook to load the deck when the component mounts.
  useEffect(() => {
    loadDeck();
  }, []);

  // Function to load the appropriate deck of questions.
  // It fetches either the base questions or a custom deck from AsyncStorage and shuffles them.
  const loadDeck = async () => {
    const { deckType, deckId } = route.params || { deckType: 'base' };
    console.log('Loading deck:', { deckType, deckId });
    
    if (deckType === 'base') {
      setShuffledQuestions(shuffleArray(baseQuestions));
    } else {
      try {
        const savedDecks = await AsyncStorage.getItem('customDecks');
        console.log('Saved decks:', savedDecks);
        if (savedDecks) {
          const decks = JSON.parse(savedDecks);
          const selectedDeck = decks.find(deck => deck.id === deckId);
          console.log('Selected deck:', selectedDeck);
          if (selectedDeck) {
            setShuffledQuestions(shuffleArray(selectedDeck.questions));
          }
        }
      } catch (error) {
        console.error('Error loading custom deck:', error);
        Alert.alert('Error', 'Failed to load deck');
      }
    }
  };

  // Effect hook to collect accelerometer data and trigger the next question.
  useEffect(() => {
    if (Platform.OS !== 'web') {  
      Accelerometer.setUpdateInterval(1000);

      const subscription = Accelerometer.addListener((accelerometerData) => {
        const totalForce = Math.sqrt(
          accelerometerData.x * accelerometerData.x +
          accelerometerData.y * accelerometerData.y +
          accelerometerData.z * accelerometerData.z
        );

        if (totalForce > 1.40) {
          showNextQuestion();
        }
      });

      return () => {
        subscription.remove();
      };
    }
  }, [shuffledQuestions, currentQuestionIndex]);

  const showNextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      Alert.alert('End of Questions', 'You have gone through all the questions. Starting over.');
      loadDeck();
    }
  };

  return (
    <View style={[globalStyles.container]}>
      <Pressable style={styles.homeButton} onPress={() => navigation.navigate('HomeScreen')}>
        <Ionicons name="home" size={32} color="#474747" /> 
      </Pressable>
      <View style={styles.imageContainer}>
        <ImageBackground
          source={require('./assets/empty.jpg')} 
          style={styles.cardImage}
          imageStyle={{ resizeMode: 'contain' }} 
        >
          <View style={styles.questionsContainer}>
            <Text style={styles.title}>Never Have I Ever...</Text>
            <Text style={styles.questionText}>{shuffledQuestions[currentQuestionIndex]} </Text>
          </View>
        </ImageBackground>
      </View>
      {Platform.OS === 'web' && (
        <Pressable
          style={globalStyles.button}
          onPress={showNextQuestion}
        >
          <Text style={globalStyles.buttonText}>Next Question</Text>
        </Pressable>
      )}
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
    marginTop: 100,
  },
  title: {
    fontSize: 32,
    color: '#363636', 
    fontWeight: 'bold',
  },
  questionsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
  },
  cardImage: {
    width: 370,
    height: 510,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 24,
    color: '#474747', 
    textAlign: 'center',
    marginBottom: 20,
  },
  homeButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
});


export default CardScreen

