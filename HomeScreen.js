// HomeScreen.js
import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { globalStyles } from './styles';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={globalStyles.container}>
      <Text style={styles.title}>Never Have I Ever</Text>
      < View style ={styles.imageContainer}>
       <Image source={require('./assets/spade.jpg')}  style={styles.cardImage}/>
        < View style ={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('DeckSelection')}
          >
            <Text style={styles.buttonText}>Play!</Text>
          </Pressable>
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
    fontSize: 32,
    color: '#000000', 
    marginBottom: 70,
    fontWeight: 'bold',

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
