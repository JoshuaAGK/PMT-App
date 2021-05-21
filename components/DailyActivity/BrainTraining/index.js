import React, { useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import styles from './styles';
import dictionary from './dictionary.json';
import mainStyles from '../../../styles/styles';
import Points from '../../../src/features/points/points';
import { incrementBalance } from '../../../src/firebase/firestore/firestoreService';
import { useDispatch, useSelector } from 'react-redux';
import { addToBalance } from '../../../src/features/auth/authSlice';

const DICLENGTH = Object.keys(dictionary).length;

function shuffleAnswers(answers) {
  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  for (let i = answers.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = answers[i];
    answers[i] = answers[j];
    answers[j] = temp;
  }
  return answers;
}

function BrainTraining(props) {
  let authSelector = useSelector((state) => state.auth);
  let dispatch = useDispatch();

  const [index, setIndex] = useState(-1);
  const [score, setScore] = useState(0);

  function beginGame() {
    setIndex(index + 1);
  }

  function answerQuestion(answer) {
    let correctAnswer = dictionary[Object.keys(dictionary)[index]]['correct'];
    let points;
    if (answer == correctAnswer) {
        setScore(score + 1);
        points = Points.QUESTION_CORRECT;
    } else {
        points = Points.QUESTION_INCORRECT;
    }
    dispatch(addToBalance(points));
    incrementBalance(authSelector.currentUser.balance, points);

    let newIndex = index + 1;

    if (newIndex >= DICLENGTH) {
        newIndex = -1;
        alert(`Game Over! ${score}/${DICLENGTH}`);
    }

    setIndex(newIndex);
  }

  if (index == -1) {
    return (
      <View style={styles.brainTraining}>
        <Text style={styles.titleText}>Brain Training</Text>
        <Pressable
          style={[mainStyles.platformShadow, styles.beginGameButton]}
          onPress={() => beginGame()}
        >
          <Text style={styles.beginGameText}>Begin game!</Text>
        </Pressable>
      </View>
    );
  } else {
    let word = Object.keys(dictionary)[index];
    let answers = shuffleAnswers([
      dictionary[word]['incorrect0'],
      dictionary[word]['incorrect1'],
      dictionary[word]['incorrect2'],
      dictionary[word]['correct'],
    ]);

    let answer1 = answers[0];
    let answer2 = answers[1];
    let answer3 = answers[2];
    let answer4 = answers[3];

    return (
      <View style={styles.brainTraining}>
        <Text style={styles.indexText}>
          Question: {index + 1} / {DICLENGTH}{' '}
        </Text>
        <Text style={styles.scoreText}>Score: {score}</Text>

        <View style={styles.interaction}>
          <Text style={styles.questionWord}>
            What is the meaning of &quot;{word}&quot;?
          </Text>

          <View style={styles.buttons}>
            <Pressable
              style={styles.button}
              onPress={() => answerQuestion(answer1)}
            >
              <Text style={styles.buttonText}>{answer1}</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => answerQuestion(answer2)}
            >
              <Text style={styles.buttonText}>{answer2}</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => answerQuestion(answer3)}
            >
              <Text style={styles.buttonText}>{answer3}</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => answerQuestion(answer4)}
            >
              <Text style={styles.buttonText}>{answer4}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }
}

export default BrainTraining;
