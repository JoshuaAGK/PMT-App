import React, { useState } from 'react';
import { View } from 'react-native';
import mainStyles from '../../styles/styles';
import emotionStyles from './styles';
import Emotion from './Emotion';

const EMOTION_CRY = 0;
const EMOTION_SAD = 1;
const EMOTION_NORMAL = 2;
const EMOTION_HAPPY = 3;

export const EmotionTracker = ({ handleClick }) => {
    return (
        <View style={emotionStyles.emotionContainer}>
            <Emotion emotionType={EMOTION_CRY} emoji="😢" handleClick={handleClick}/>
            <Emotion emotionType={EMOTION_SAD} emoji="🙁" handleClick={handleClick}/>
            <Emotion emotionType={EMOTION_NORMAL} emoji="😐" handleClick={handleClick}/>
            <Emotion emotionType={EMOTION_HAPPY} emoji="🙂" handleClick={handleClick}/>
        </View>
      );
};

export default EmotionTracker;

