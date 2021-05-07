import React from 'react';
import {View, Pressable, Text, ScrollView, TextInput, TouchableOpacity, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import mainStyles from '../../styles/styles';
import journalStyles from './styles';
import Advertisement from '../Advertisement/Advertisement';
import UpperContents from '../UpperContents/UpperContents';
import EmotionTrackerInput from '../EmotionTracker/EmotionTrackerInput';
import {getUserCollection, incrementBalance} from '../../src/firebase/firestore/firestoreService';
import {setText, setMood, selectJournal} from '../../src/features/journal/journalSlice';
import {addToBalance} from '../../src/features/auth/authSlice';
import {Formik} from 'formik';
import * as Yup from 'yup';
import points from '../../src/features/points/points';
import styles from '../LogIn/styles';
import DailyActivity from '../DailyActivity'

export const Journal = (props) => {
    const balanceSelector = useSelector(state => state.auth);
    let currentBalance = balanceSelector.currentUser ? balanceSelector.currentUser.balance : 0;
    const dispatch = useDispatch();
    const journal = useSelector(state => state.journal);
    const auth = useSelector(state => state.auth);
    const navigation = useNavigation();

    function openCalendar() {
        navigation.navigate('Calendar');
    }

    function onSave(values) {
        getUserCollection('journal').add({
            text: values.text,
            mood: values.emotionTracker,
            date: new Date()
        }).then(async () => {
            dispatch(addToBalance(points.JOURNAL_SUBMISSION_POINTS));
            await incrementBalance(currentBalance, points.JOURNAL_SUBMISSION_POINTS);
            dispatch(setText(''));
            dispatch(setMood(-1));
            console.log('Saved journal entry!');
        }).catch((error) => {
            console.error('Error writing document: ', error);
        });
    }

    let mood = journal.mood;
    let text = journal.text;

    const renderItem = ( item, key ) => (
        <DailyActivity type={item.type} key={key}/>
      );

    const ACTIVITIES = [
        {
            id: "1",
            type: 'braintraining',
        },
    ];

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={mainStyles.mainPage}
        >
            <UpperContents content="currency"/>
            <View style={journalStyles.journalHeader}>
                <Text style={mainStyles.bigText}>Journal</Text>
                <View style={mainStyles.buttonContainer}>
                    <Pressable style={[mainStyles.button, journalStyles.calendarButton]} onPress={openCalendar}>
                        <Text style={mainStyles.buttonText}>Calendar</Text>
                    </Pressable>
                </View>
            </View>
            <Formik initialValues={{emotionTracker: -1, text: ''}}
                    validationSchema={Yup.object({
                        emotionTracker: Yup.number().required(),
                        text: Yup.string().required()
                    })}
                    onSubmit={async (values, {setSubmitting, setErrors}) => {
                        onSave(values);
                        values.text = '';
                        values.emotionTracker = -1
                    }}
            >
                {({
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      values,
                      touched,
                      errors,
                      isValid,
                      dirty,
                      isSubmitting
                  }) => (
                    <View style={mainStyles.container}>
                        <EmotionTrackerInput/>
                        <TextInput
                            style={journalStyles.journalInput}
                            placeholder="Journal entry for today"
                            multiline={true}
                            onChangeText={handleChange('text')}
                            onBlur={handleBlur('text')}
                            value={values.text}
                        />
                        <View style={mainStyles.buttonErrorContainer}>
                            <TouchableOpacity
                            style={[mainStyles.button, !isValid || !dirty || isSubmitting ? mainStyles.buttonDisabled : null]}
                            disabled={!isValid || !dirty || isSubmitting}
                            onPress={handleSubmit}>
                                <Text style={mainStyles.buttonText}>Save</Text>
                            </TouchableOpacity>
                            <View style={[mainStyles.buttonErrorContainer, styles.errorBoxStyle]}>
                                {errors.text && touched.text ? (<Text
                                    style={styles.errorStyle}>{errors.text}</Text>) : null}
                                {errors.emotionTracker && touched.emotionTracker ? (<Text
                                    style={styles.errorStyle}>{errors.emotionTracker}</Text>) : null}
                            </View>
                        </View>
                    </View>
                )}
            </Formik>
            {!props.premium &&
            <Advertisement type="inline" content="ADVERTISEMENT"/>
            }
            <Text style={mainStyles.bigText}>Daily Activity</Text>

            <View style={journalStyles.dailyActivityList}>
                {
                    ACTIVITIES.map((el, index) => (
                        renderItem(el, index)
                    ))
                }
            </View>
            
        </ScrollView>
    );
};

export default Journal;
