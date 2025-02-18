import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Pressable, 
  ScrollView, 
  StyleSheet, 
  Alert 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from './styles';
import { Ionicons } from '@expo/vector-icons';

const CreateYourDeck = ({ navigation }) => {
  const [deckName, setDeckName] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    if (currentQuestion.trim()) {
      setQuestions([...questions, currentQuestion.trim()]);
      setCurrentQuestion('');
    }
  };

  const removeQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const saveDeck = async () => {
    if (!deckName.trim()) {
      Alert.alert('Error', 'Please enter a deck name');
      return;
    }

    if (questions.length < 10) {
      Alert.alert('Error', 'Please add at least 10 questions');
      return;
    }

    try {
      const savedDecks = await AsyncStorage.getItem('customDecks');
      const existingDecks = savedDecks ? JSON.parse(savedDecks) : [];
      
      const newDeck = {
        id: Date.now().toString(),
        name: deckName.trim(),
        questions: questions
      };

      await AsyncStorage.setItem(
        'customDecks', 
        JSON.stringify([...existingDecks, newDeck])
      );

      navigation.navigate('DeckSelection');
      Alert.alert('Success', 'Deck saved successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to save deck');
      console.error('Error saving deck:', error);
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={[globalStyles.title, styles.centerText]}>Deck Creation</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter deck name"
        value={deckName}
        onChangeText={setDeckName}
      />

      <View style={styles.addQuestionContainer}>
        <TextInput
          style={[styles.input, styles.questionInput]}
          placeholder="Enter a question"
          value={currentQuestion}
          onChangeText={setCurrentQuestion}
          onSubmitEditing={addQuestion}
        />
        <Pressable style={styles.addButton} onPress={addQuestion}>
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.questionsList}>
        {questions.map((question, index) => (
          <View key={index} style={styles.questionItem}>
            <Text style={styles.questionText}>{question}</Text>
            <Pressable onPress={() => removeQuestion(index)}>
              <Ionicons name="trash-outline" size={24} color="#474747" />
            </Pressable>
          </View>
        ))}
      </ScrollView>

      <Text style={styles.questionCount}>
        Questions: {questions.length}/10 minimum
      </Text>

      <Pressable
        style={[globalStyles.button, styles.saveButton]}
        onPress={saveDeck}
      >
        <Text style={globalStyles.buttonText}>Save Deck</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centerText: {
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  addQuestionContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  questionInput: {
    flex: 1,
    marginRight: 10,
    marginBottom: 0,
  },
  addButton: {
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  questionsList: {
    flex: 1,
    marginBottom: 10,
  },
  questionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
  },
  questionText: {
    flex: 1,
    marginRight: 10,
  },
  questionCount: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#474747',
  },
  saveButton: {
    marginTop: 10,
  },
});

export default CreateYourDeck;
