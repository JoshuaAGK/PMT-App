import React, { useState } from 'react';
import { View } from 'react-native';
import mainStyles from '../../styles/styles';
import emotionStyles from './styles';
import Emotion from './Emotion';

export const EMOTIONS = {
    VERY_SAD: {
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
    },
    VERY_HAPPY: {
        value: 4,
        emoji: "😃"
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
    let emotions = Object.keys(EMOTIONS).map((emotionKey, index) => {
        let emotion = EMOTIONS[emotionKey];
        return (
            <Emotion emotionType={emotion.value} emoji={emotion.emoji} handleClick={handleClick}/>
        );
    });
    return (
        <View style={emotionStyles.emotionContainer}>
            {emotions}
        </View>
      );
};

export default EmotionTracker;

