import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import mainStyles from '../../styles/styles';
import emotionStyles from './styles';
import Advertisement from '../Advertisement/Advertisement';
import InlineBigComponent from '../InlineBigComponent/InlineBigComponent';
import UpperContents from '../UpperContents/UpperContents';
import AlarmItem from '../AlarmItem/AlarmItem';
import { useDispatch, useSelector } from 'react-redux';
import {
    setMood,
    selectJournal
} from '../../src/features/journal/journalSlice';

const EMOTION_CRY = 0;
const EMOTION_SAD = 1;
const EMOTION_NORMAL = 2;
const EMOTION_HAPPY = 3;

export const EmotionTracker = (props) => {
    const { journal } = useSelector(selectJournal);

    function emotionButton(emotionType, emoji) {
        function selectEmotion() {
            setMood(emotionType);
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

