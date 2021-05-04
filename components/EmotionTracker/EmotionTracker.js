import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import mainStyles from '../../styles/styles';
import emotionStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import {
    setMood
} from '../../src/features/journal/journalSlice';

const EMOTION_CRY = 0;
const EMOTION_SAD = 1;
const EMOTION_NORMAL = 2;
const EMOTION_HAPPY = 3;

export const EmotionTracker = (props) => {
    const dispatch = useDispatch();
    const journal = useSelector(state => state.journal);

    function emotionButton(emotionType, emoji) {
        function selectEmotion() {
            dispatch(setMood(emotionType));
        }

        let style = (emotionType == journal.mood) ? [emotionStyles.emoteIcon, emotionStyles.selected] : emotionStyles.emoteIcon;

        return (
            <Pressable onPress={selectEmotion}>
                <Text style={style}>{emoji}</Text>
            </Pressable>
        );
    }

    return (
        <View style={emotionStyles.emotionContainer}>
            {emotionButton(EMOTION_CRY, "😢")}
            {emotionButton(EMOTION_SAD, "🙁")}
            {emotionButton(EMOTION_NORMAL, "😐")}
            {emotionButton(EMOTION_HAPPY, "🙂")}
        </View>
      );
};

export default EmotionTracker;

