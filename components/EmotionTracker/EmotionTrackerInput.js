import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import mainStyles from '../../styles/styles';
import emotionStyles from './styles';
import EmotionTracker from './EmotionTracker';
import {Field} from 'formik';
import styles from '../LogIn/styles';

const fieldName = 'emotionTracker';

export const EmotionTrackerInput = (props) => {
    const validateMood = (value) => {
        let error;
        if (!value || value === -1) {
            error = 'Mood Required'
        }
        return error
    }

    return (
        <Field name={fieldName} id={fieldName} type="number" validate={validateMood}>
            {({field: {value}, form: {setFieldValue, touched, errors}}) => (
                <EmotionTracker handleClick={number => setFieldValue(fieldName, number)}/>

            )}
        </Field>
    );
};

export default EmotionTrackerInput;

