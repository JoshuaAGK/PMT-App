import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import mainStyles from '../../styles/styles';
import emotionStyles from './styles';
import EmotionTracker from './EmotionTracker';
import { Field } from 'formik';

const fieldName = "emotionTracker";

export const EmotionTrackerInput = (props) => {
    return (
        <Field name={fieldName} id={fieldName} type="number">
            {({ field: { value }, form: { setFieldValue } }) => (
                <EmotionTracker name="hello" handleClick={number => setFieldValue(fieldName, number)}/>
            )}
        </Field>
      );
};

export default EmotionTrackerInput;

