import React from 'react';
import { StyleSheet, Text, View, Pressable, useState } from 'react-native';
import styles from './styles';
import dictionary from './dictionary.json';
import mainStyles from '../../../styles/styles';

const DICLENGTH = Object.keys(dictionary).length
var index = -1
var score = 0
var answer1 = "Answer 1"
var answer2 = "Answer 2"
var answer3 = "Answer 3"
var answer4 = "Answer 4"
var word = "Word"

function updateWordsAnswers() {
  var correctIndex = Math.floor(Math.random() * 4);

  answer1 = dictionary[Object.keys(dictionary)[index]]["correct"]
  answer2 = dictionary[Object.keys(dictionary)[index]]["incorrect0"]
  answer3 = dictionary[Object.keys(dictionary)[index]]["incorrect1"]
  answer4 = dictionary[Object.keys(dictionary)[index]]["incorrect2"]

  switch (correctIndex) {
    case 1:
      answer1 = dictionary[Object.keys(dictionary)[index]]["incorrect0"]
      answer2 = dictionary[Object.keys(dictionary)[index]]["correct"]
      break;
    case 2:
      answer1 = dictionary[Object.keys(dictionary)[index]]["incorrect0"]
      answer2 = dictionary[Object.keys(dictionary)[index]]["incorrect1"]
      answer3 = dictionary[Object.keys(dictionary)[index]]["correct"]
      break;
    case 3:
      answer1 = dictionary[Object.keys(dictionary)[index]]["incorrect0"]
      answer2 = dictionary[Object.keys(dictionary)[index]]["incorrect1"]
      answer3 = dictionary[Object.keys(dictionary)[index]]["incorrect2"]
      answer4 = dictionary[Object.keys(dictionary)[index]]["correct"]
      break;
  }

  word = Object.keys(dictionary)[index]
}

class brainTraining extends React.Component {
  constructor(props) {
    super(props)

    if (index >= 0) {
      var correctAnswer = dictionary[Object.keys(dictionary)[index]]["correct"]
      updateWordsAnswers()
    }
  }

  forceUpdateHandler(providedAnswer = null) {
    if (providedAnswer != null) {
      if (index == DICLENGTH) {
        alert("Game over")
      } else {
        var correctAnswer = dictionary[Object.keys(dictionary)[index]]["correct"]

        if (providedAnswer == correctAnswer) {
          score++
        }

        index++

        if (index != DICLENGTH) {
          updateWordsAnswers()
        }
        
      }
    } else {
      index++
      updateWordsAnswers()
    }

    this.forceUpdate();
  };

  render() {
    if (index == -1) {
      return (
        <View style={styles.brainTraining}>
          <Text style={styles.titleText}>Brain Training</Text>
          <Pressable style={[mainStyles.platformShadow, styles.beginGameButton]} onPress={() => this.forceUpdateHandler()}>
            <Text style={styles.beginGameText}>Begin game!</Text>
          </Pressable>
        </View>
      )
    } else if (index == DICLENGTH) {
      return (
        <View style={styles.brainTraining}>
          <Text style={styles.scoreText}>Game over! You scored {score} / {DICLENGTH}</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.brainTraining}>
          <Text style={styles.indexText}>Question: {index + 1} / {DICLENGTH} </Text>
          <Text style={styles.scoreText}>Score: {score}</Text>
  
          <View style={styles.interaction}>
            <Text style={styles.questionWord}>What is the meaning of "{word}"?</Text>
  
            <View style={styles.buttons}> 
              <Pressable style={styles.button} onPress={() => this.forceUpdateHandler(answer1)}>
                <Text style={styles.buttonText}>{answer1}</Text>
              </Pressable>
              <Pressable style={styles.button} onPress={() => this.forceUpdateHandler(answer2)}>
                <Text style={styles.buttonText}>{answer2}</Text>
              </Pressable>
              <Pressable style={styles.button} onPress={() => this.forceUpdateHandler(answer3)}>
                <Text style={styles.buttonText}>{answer3}</Text>
              </Pressable>
              <Pressable style={styles.button} onPress={() => this.forceUpdateHandler(answer4)}>
                <Text style={styles.buttonText}>{answer4}</Text>
              </Pressable>
            </View>
  
          </View>
        </View>
      )
    }
  }
}

export default brainTraining;