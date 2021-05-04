import React, { useState } from 'react';
import { View, Pressable, Text, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import mainStyles from '../../styles/styles';
import journalStyles from './styles';
import Advertisement from '../Advertisement/Advertisement';
import InlineBigComponent from '../InlineBigComponent/InlineBigComponent';
import UpperContents from '../UpperContents/UpperContents';
import EmotionTracker from '../EmotionTracker/EmotionTracker';
import { firebase } from '../../src/firebase/config';
import {
    setText,
    selectJournal
} from '../../src/features/journal/journalSlice';

export const Journal = (props) => {
    const dispatch = useDispatch();
    const journal = useSelector(state => state.journal);
    const navigation = useNavigation();

    /*let journalRef = firebase.firestore().collection("journal");
    let query = journalRef.where("date", "<", new Date());

    query.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let data = doc.data();
            let date = new Date((data.date.nanoseconds / 1000) + (data.date.seconds * 1000));
            let text = data.text;
            console.log(date);
        })
    }).catch((error) => {
        console.error("Error writing document: ", error);
    })*/

    function openCalendar() {
        navigation.navigate('Calendar');
    }

    function onSave() {
        firebase.firestore().collection("journal").add({
            // user: 
            text: journal.text,
            mood: journal.mood,
            date: new Date()
        }).then(() => {
            dispatch(setText(""));
            dispatch(setMood(-1));
            console.log("Document successfully written!");
        }).catch((error) => {
            console.error("Error writing document: ", error);
        });
    }

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
        <EmotionTracker />
        <TextInput
            style={journalStyles.journalInput}
            placeholder="Journal entry for today"
            multiline={true}
            onChangeText={text => dispatch(setText(text))}
            defaultValue={journal.text}
        />
        <View style={mainStyles.buttonContainer}>
            <Pressable style={mainStyles.button} onPress={onSave}>
                <Text style={mainStyles.buttonText}>Save</Text>
            </Pressable>
        </View>
        <Advertisement type="inline" content="ADVERTISEMENT" />
        <Text style={mainStyles.bigText}>Brain Training</Text>
        <InlineBigComponent content="GAME ELEMENT (TBD)" tbd={true} />
        </ScrollView>
    );
};

export default Journal;
