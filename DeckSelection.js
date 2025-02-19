import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from './styles';

const DeckSelection = ({ navigation }) => {
  const [customDecks, setCustomDecks] = useState([]);

  useEffect(() => {
    loadCustomDecks();
  }, []);

  const loadCustomDecks = async () => {
    try {
      const savedDecks = await AsyncStorage.getItem('customDecks');
      if (savedDecks) {
        setCustomDecks(JSON.parse(savedDecks));
      }
    } catch (error) {
      console.error('Error loading custom decks:', error);
    }
  };

  const deleteDeck = async (deckId) => {
    try {
      const updatedDecks = customDecks.filter(deck => deck.id !== deckId);
      setCustomDecks(updatedDecks);
      await AsyncStorage.setItem('customDecks', JSON.stringify(updatedDecks));
    } catch (error) {
      console.error('Error deleting deck:', error);
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={[globalStyles.title, styles.centerText]}>Deck Selection</Text>
      
      <ScrollView style={styles.decksContainer}>
        <Pressable
          style={[globalStyles.button, styles.deckButton]}
          onPress={() => navigation.navigate('HowToPlay', { deckType: 'base' })}
        >
          <Text style={globalStyles.buttonText}>Base Deck</Text>
        </Pressable>

        {customDecks.map((deck, index) => (
          <View key={index} style={styles.deckWrapper}>
            <Pressable
              style={[globalStyles.button, styles.deckButton]}
              onPress={() => navigation.navigate('HowToPlay', { 
                deckType: 'custom',
                deckId: deck.id 
              })}
            >
              <Text style={globalStyles.buttonText}>{deck.name}</Text>
            </Pressable>
            <Pressable
              style={styles.deleteButton}
              onPress={() => deleteDeck(deck.id)}
            >
              <Text style={styles.deleteButtonText}>X</Text>
            </Pressable>
          </View>
        ))}

        <Pressable
          style={[globalStyles.button, styles.deckButton]}
          onPress={() => navigation.navigate('CreateYourDeck')}
        >
          <Text style={globalStyles.buttonText}>Create Your Own Deck</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  centerText: {
    textAlign: 'center',
  },
  decksContainer: {
    flex: 1,
    width: '100%',
  },
  deckButton: {
    marginVertical: 10,
  },
  deckWrapper: {
    position: 'relative',
  },
  deleteButton: {
    position: 'absolute',
    top: '50%',
    right: '10%',
    padding: 5,
    backgroundColor: 'grey',
    borderRadius: 10,
    zIndex: 1,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default DeckSelection;
