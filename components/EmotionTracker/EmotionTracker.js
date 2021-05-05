import React, { useState } from 'react';
import { View } from 'react-native';
import mainStyles from '../../styles/styles';
import emotionStyles from './styles';
import Emotion from './Emotion';

export const EMOTIONS = {
    CRY: {
        value: 0,
        emoji: "😢"
    },
    SAD: {
        value: 1,
        emoji: "🙁"
    },
    NORMAL: {
        value: 2,
        emoji: "😐"
    },
    HAPPY: {
        value: 3,
        emoji: "🙂"
    }
};

export function getEmoji(mood) {
    var result = "😐";
    for (const emotionKey in EMOTIONS) {
        let emotion = EMOTIONS[emotionKey];
        if (emotion.value == mood) {
            result = emotion.emoji;
        }
    }
    return result;
}

export const EmotionTracker = ({ handleClick }) => {
    return (
        <View style={emotionStyles.emotionContainer}>
            <Emotion emotionType={EMOTIONS.CRY.value} emoji={EMOTIONS.CRY.emoji} handleClick={handleClick}/>
            <Emotion emotionType={EMOTIONS.SAD.value} emoji={EMOTIONS.SAD.emoji} handleClick={handleClick}/>
            <Emotion emotionType={EMOTIONS.NORMAL.value} emoji={EMOTIONS.NORMAL.emoji} handleClick={handleClick}/>
            <Emotion emotionType={EMOTIONS.HAPPY.value} emoji={EMOTIONS.HAPPY.emoji} handleClick={handleClick}/>
        </View>
      );
};

export default EmotionTracker;

