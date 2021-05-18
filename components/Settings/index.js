import React from 'react';
import {
    View,
    Pressable,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
  } from 'react-native';
import mainStyles from '../../styles/styles';
import logInStyles from '../LogIn/styles';
import styles from './styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
    setDisplayName
  } from '../../src/features/auth/authSlice';
import { clearJournalEntries, setDisplayName as setDBDisplayName } from '../../src/firebase/firestore/firestoreService';

export const Settings = (props) => {
    let dispatch = useDispatch();
    let auth = useSelector(state => state.auth);
    let displayName = auth.currentUser.displayName;

    function onSaveDisplayName(values) {
        let newDisplayName = values.text;
        dispatch(setDisplayName(newDisplayName));
        setDBDisplayName(newDisplayName);
    }

    // TODO: Somehow implement password changing.

    return (
        <ScrollView
        showsVerticalScrollIndicator={false}
        style={[mainStyles.mainPage, styles.settingsPage]}
        >
            <View style={[mainStyles.buttonContainer, styles.settingsButtonContainer]}>
                <Pressable style={[mainStyles.button, styles.settingsButton]} onPress={() => {
                    clearJournalEntries();
                    alert("Journal Entries Cleared.");
                }}>
                    <Text style={mainStyles.buttonText}>Clear Journal Entries</Text>
                </Pressable>
            </View>
            <View style={[mainStyles.buttonContainer, styles.settingsButtonContainer]}>
                <Pressable style={[mainStyles.button, styles.settingsButton]} onPress={() => {

                }}>
                    <Text style={mainStyles.buttonText}>Clear Chat History</Text>
                </Pressable>
            </View>
            <View style={[styles.settingsFormContainer]}>
                <Text style={styles.settingTitle}>Set your display name</Text>
                <Formik
                    initialValues={{ text: displayName }}
                    validationSchema={Yup.object({
                        text: Yup.string().required(),
                    })}
                    onSubmit={async (values, { setSubmitting, setErrors }) => {
                        onSaveDisplayName(values);
                        alert(`Name updated to ${values.text}.`);
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
                    isSubmitting,
                    }) => (
                    <View style={mainStyles.container}>
                        <TextInput
                        style={[mainStyles.platformShadow, styles.settingsInput]}
                        placeholder="New display name"
                        onChangeText={handleChange('text')}
                        onBlur={handleBlur('text')}
                        value={values.text}
                        maxLength={256}
                        />

                        <View style={mainStyles.buttonErrorContainer}>
                            <TouchableOpacity
                                style={[
                                mainStyles.button,
                                mainStyles.leftMargin,
                                !isValid || !dirty || isSubmitting
                                    ? mainStyles.buttonDisabled
                                    : null,
                                ]}
                                disabled={!isValid || !dirty || isSubmitting}
                                onPress={handleSubmit}
                            >
                                <Text style={mainStyles.buttonText}>Save</Text>
                            </TouchableOpacity>
                            <View
                                style={[mainStyles.buttonErrorContainer, logInStyles.errorBoxStyle]}
                            >
                                {errors.text && touched.text ? (
                                <Text style={logInStyles.errorStyle}>{errors.text}</Text>
                                ) : null}
                            </View>
                        </View>
                    </View>
                    )}
                </Formik>
            </View>
            <View style={[mainStyles.buttonContainer, styles.settingsButtonContainer, mainStyles.lowestElementOnPageToGiveItABottomMarginBecauseAndroidIsWeirdAndDoesntLikeShadowsForSomeReason,]}>
                <Pressable style={[mainStyles.button, styles.settingsButton]} onPress={() => {
                    // TODO: Navigate to privacy policy page
                }}>
                    <Text style={mainStyles.buttonText}>Privacy Policy</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
};

export default Settings;
