import React, { useState } from 'react';
import { View, Pressable, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import mainStyles from '../../styles/styles';
import journalStyles from './styles';
import Advertisement from '../Advertisement/Advertisement';
import InlineBigComponent from '../InlineBigComponent/InlineBigComponent';
import UpperContents from '../UpperContents/UpperContents';
import EmotionTrackerInput from '../EmotionTracker/EmotionTrackerInput';
import firebase from '../../src/firebase/config';
import { getUserCollection } from '../../src/firebase/firestore/firestoreService';
import {
    setText,
    setMood,
    selectJournal
} from '../../src/features/journal/journalSlice';
import {Formik} from 'formik';
import * as Yup from 'yup';

export const Journal = (props) => {
    const dispatch = useDispatch();
    const journal = useSelector(state => state.journal);
    const auth = useSelector(state => state.auth);
    const navigation = useNavigation();

    function openCalendar() {
        navigation.navigate('Calendar');
    }

    function onSave(values) {
        getUserCollection("journal").add({
            text: values.text,
            mood: values.emotionTracker,
            date: new Date()
        }).then(() => {
            dispatch(setText(''));
            dispatch(setMood(-1));
            console.log("Document successfully written!");
        }).catch((error) => {
            console.error("Error writing document: ", error);
        });
    }

    let mood = journal.mood;
    let text = journal.text;

    return (
        <ScrollView
        showsVerticalScrollIndicator={false}
        style={mainStyles.mainPage}
        >
        <UpperContents content="currency" />
        <View style={journalStyles.journalHeader}>
            <Text style={mainStyles.bigText}>Journal</Text>
            <View style={mainStyles.buttonContainer}>
                <Pressable style={[mainStyles.button, journalStyles.calendarButton]} onPress={openCalendar}>
                    <Text style={mainStyles.buttonText}>Calendar</Text>
                </Pressable>
            </View>
        </View>
        <Formik initialValues={{emotionTracker: mood, text: text}}
            validationSchema={Yup.object({
                emotionTracker: Yup.number().required(),
                text: Yup.string().required()
            })}
            onSubmit={async (values, {setSubmitting, setErrors}) => {
                onSave(values)
            }}
            >
            {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  touched,
                  errors,
                  isValid
              }) => (
                <View style={mainStyles.container}>
                    <EmotionTrackerInput />
                    <TextInput
                        style={journalStyles.journalInput}
                        placeholder="Journal entry for today"
                        multiline={true}
                        onChangeText={handleChange('text')}
                        onBlur={handleBlur('text')}
                        value={values.text}
                    />
                    <TouchableOpacity
                        style={mainStyles.button}
                        disabled={!isValid}
                        onPress={handleSubmit}>
                        <Text style={mainStyles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            )}
        </Formik>
        {/*<View style={mainStyles.buttonContainer}>
            <Pressable style={mainStyles.button} onPress={onSave}>
                <Text style={mainStyles.buttonText}>Save</Text>
            </Pressable>
        </View>*/}
        <Advertisement type="inline" content="ADVERTISEMENT" />
        <Text style={mainStyles.bigText}>Brain Training</Text>
        <InlineBigComponent content="GAME ELEMENT (TBD)" tbd={true} />
        </ScrollView>
    );
};

export default Journal;
