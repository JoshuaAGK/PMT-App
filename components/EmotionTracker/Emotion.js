import React from 'react';
import { Text, Pressable } from 'react-native';
import mainStyles from '../../styles/styles';
import emotionStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import {
    setMood
} from '../../src/features/journal/journalSlice';

export const Emotion = ({ emotionType, emoji, handleClick}) => {
    const dispatch = useDispatch();
    const journal = useSelector(state => state.journal);

    let style = (emotionType == journal.mood) ? [emotionStyles.emoteIcon, emotionStyles.selected] : emotionStyles.emoteIcon;

    return (
        <Pressable onPress={() => {
            dispatch(setMood(emotionType));
            handleClick(emotionType);
        }}>
            <Text style={style}>{emoji}</Text>
        </Pressable>
    );
};

export default Emotion;

