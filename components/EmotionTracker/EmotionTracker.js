import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import mainStyles from '../../styles/styles';
import emotionStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import Emotion from './Emotion';
import { useFormik, Field, FormikProvider } from 'formik';

const EMOTION_CRY = 0;
const EMOTION_SAD = 1;
const EMOTION_NORMAL = 2;
const EMOTION_HAPPY = 3;

const fieldName = "emotionTracker";

export const EmotionTracker = () => {
    return (
        <Field name={fieldName} id={fieldName} type="number">
            {({ field: { value }, form: { setFieldValue } }) => (
                <View style={emotionStyles.emotionContainer}>
                    <Emotion emotionType={EMOTION_CRY} emoji="😢" handleClick={number => setFieldValue(fieldName, number)}/>
                    <Emotion emotionType={EMOTION_SAD} emoji="🙁" handleClick={number => setFieldValue(fieldName, number)}/>
                    <Emotion emotionType={EMOTION_NORMAL} emoji="😐" handleClick={number => setFieldValue(fieldName, number)}/>
                    <Emotion emotionType={EMOTION_HAPPY} emoji="🙂" handleClick={number => setFieldValue(fieldName, number)}/>
                </View>
            )}
        </Field>
      );
};

export default EmotionTracker;

