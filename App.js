import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RoundedButton from './RoundedButton';
import axios from 'axios';

export default function App() {
  const [color, setColor] = useState('#161616');
  const [prompt, setPrompt] = useState('Hello!');

  useEffect(() => {
    randomPrompt();
    setColor(randomRgb());
  }, '');

  const randomPrompt = async () => {
    try {
      const response = await axios.get('http://localhost:3000/random');
      const prompt = response.data;
      setPrompt(prompt.title);
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <Text style={styles.prompt}>{prompt}</Text>
      <RoundedButton
        text="Next"
        textColor="#161616"
        onPress={() => {
            randomPrompt();
            setColor(randomRgb());
        }}
      />
    </View>
  );
}

const randomRgb = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return `rgb(${red}, ${green}, ${blue})`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  prompt: {
    color: 'white',
    fontSize: 22,
    padding: 20,
    textAlign: 'center'
  }
});