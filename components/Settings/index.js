import React, { useState } from 'react';
import {
  View,
  Pressable,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import mainStyles from '../../styles/styles';
import logInStyles from '../LogIn/styles';
import styles from './styles';
import modalStyles from '../../styles/modalStyles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { setDisplayName } from '../../src/features/auth/authSlice';
import {
  clearChatMessages,
  clearJournalEntries,
  setDisplayName as setDBDisplayName,
} from '../../src/firebase/firestore/firestoreService';
import firebase from '../../src/firebase/config';
import { signOutFirebase } from '../../src/firebase/firestore/firebaseService';
import { openBrowserAsync } from 'expo-web-browser';

export const Settings = ({ navigation }) => {
  let dispatch = useDispatch();
  let auth = useSelector((state) => state.auth);
  let displayName = auth.currentUser ? auth.currentUser.displayName : '';
  const email = auth.currentUser ? auth.currentUser.email : '';
  const uid = auth.currentUser ? auth.currentUser.uid : '';

  const [modalVisible, setModalVisible] = useState(false);

  async function onSaveDisplayName(values) {
    let newDisplayName = values.text;
    if(newDisplayName.length > 15) return false;
    dispatch(setDisplayName(newDisplayName));
    await setDBDisplayName(newDisplayName);
    return true;
  }

  // TODO: Somehow implement password changing.
  async function changePassword(values) {
    const user = await firebase.auth().currentUser;

    const credentials = firebase.auth.EmailAuthProvider.credential(
      email,
      values.oldPassword
    );

    user
      .reauthenticateWithCredential(credentials)
      .then(function () {
        user
          .updatePassword(values.newPassword)
          .then(function () {
            alert('password updated');
          })
          .catch(function (error) {
            alert('something went wrong!');
          });
      })
      .catch(function (error) {
        alert('your password is incorrect');
      });
  }

  async function deleteAccount(password) {
    var user = firebase.auth().currentUser;

    const credentials = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );

    user
      .reauthenticateWithCredential(credentials)
      .then(function () {
        user
          .delete()
          .then(async function () {
            const usersFriendQuerySnapshot = await firebase
              .firestore()
              .collection('users')
              .doc(uid)
              .collection('friends')
              .get();
            usersFriendQuerySnapshot.forEach(async (documentSnapshot) => {
              const friendId = documentSnapshot.id;
              const friendRef = firebase.firestore().collection('users').doc(friendId);
              await friendRef.collection('friends').doc(uid).delete();
              await friendRef.collection('friend_requests').doc(uid).delete();
              await documentSnapshot.ref.delete();
            });

            const usersJournalQuerySnapshot = await firebase
              .firestore()
              .collection('users')
              .doc(uid)
              .collection('journal')
              .get();
            usersJournalQuerySnapshot.forEach(async (documentSnapshot) => {
              await documentSnapshot.ref.delete();
            });

            const usersFriendRequestsQuerySnapshot = await firebase
              .firestore()
              .collection('users')
              .doc(uid)
              .collection('friend_requests')
              .get();
            usersFriendRequestsQuerySnapshot.forEach(
              async (documentSnapshot) => {
                const friendId = documentSnapshot.id;
                const friendRef = firebase.firestore().collection('users').doc(friendId);
                await friendRef.collection('friends').doc(uid).delete();
                await documentSnapshot.ref.delete();
              }
            );

            await firebase.firestore().collection('users').doc(uid).delete();
            const groups = await firebase
              .firestore()
              .collection('groups')
              .where('members', 'array-contains', uid)
              .get();
            if (groups.size > 0)
              groups.forEach((documentSnapshot) => {
                documentSnapshot.ref.update({
                  members: firebase.firestore.FieldValue.arrayRemove(uid),
                });
              });

            signOutFirebase();
            navigation.reset({ index: 0, routes: [{ name: 'Log In' }] });
          })
          .catch(function (error) {
            alert('Something went wrong');
          });
      })
      .catch(function (error) {
        alert('Password was incorrect');
      });
  }

  const initialValues = { text: displayName, oldPassword: '', newPassword: '' };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[mainStyles.mainPage, styles.settingsPage]}
    >
      <View
        style={[mainStyles.buttonContainer, styles.settingsButtonContainer]}
      >
        <Pressable
          style={[mainStyles.button, styles.settingsButton]}
          onPress={() => {
            clearJournalEntries();
            alert('Journal Entries Cleared.');
          }}
        >
          <Text style={mainStyles.buttonText}>Clear Journal Entries</Text>
        </Pressable>
      </View>
      <View
        style={[mainStyles.buttonContainer, styles.settingsButtonContainer]}
      >
        <Pressable
          style={[mainStyles.button, styles.settingsButton]}
          onPress={() => {
            clearChatMessages();
            alert('Chat Messages Cleared.');
          }}
        >
          <Text style={mainStyles.buttonText}>Clear Chat History</Text>
        </Pressable>
      </View>

      <View
        style={[mainStyles.buttonContainer, styles.settingsButtonContainer]}
      >
        <Pressable
          style={[
            mainStyles.button,
            styles.settingsButton,
            styles.deleteAccount,
          ]}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Text style={mainStyles.buttonText}>Delete Account</Text>
        </Pressable>
      </View>

      <View style={[styles.settingsFormContainer]}>
        <Text style={styles.settingTitle}>Set your display name</Text>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            text: Yup.string(),
            oldPassword: Yup.string(),
            newPassword: Yup.string(),
            confirmPassword: Yup.string(),
          })}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            try {
              if (values.text !== initialValues.text) {
                if(!await onSaveDisplayName(values)) return alert('Display name cannot be longer than 15 characters.');
                initialValues.text = values.text;
                alert(`Name updated to ${values.text}.`);
              } else if (
                values.oldPassword !== initialValues.oldPassword &&
                values.newPassword !== initialValues.newPassword
              ) {
                if (values.newPassword !== values.confirmPassword) {
                  alert('Passwords do not match');
                  return;
                }
                initialValues.oldPassword = values.oldPassword;
                initialValues.newPassword = values.newPassword;
                initialValues.confirmPassword = values.confirmPassword;
                await changePassword(values);
              }
              setSubmitting(false);
            } catch (error) {
              setErrors({ auth: error.message });
              setSubmitting(false);
            }
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

              <TextInput
                style={[mainStyles.platformShadow, styles.settingsInput]}
                placeholder="old password"
                onChangeText={handleChange('oldPassword')}
                onBlur={handleBlur('oldPassword')}
                value={values.oldPassword}
                maxLength={256}
                secureTextEntry
              />

              <TextInput
                style={[mainStyles.platformShadow, styles.settingsInput]}
                placeholder="new password"
                onChangeText={handleChange('newPassword')}
                onBlur={handleBlur('newPassword')}
                value={values.newPassword}
                maxLength={256}
                secureTextEntry
              />

              <TextInput
                style={[mainStyles.platformShadow, styles.settingsInput]}
                placeholder="confirm password"
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                maxLength={256}
                secureTextEntry
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
                  style={[
                    mainStyles.buttonErrorContainer,
                    logInStyles.errorBoxStyle,
                  ]}
                >
                  {errors.text && touched.text ? (
                    <Text style={logInStyles.errorStyle}>{errors.text}</Text>
                  ) : null}
                  {errors.auth ? (
                    <Text style={logInStyles.errorStyle}>{errors.text}</Text>
                  ) : null}
                </View>
              </View>
            </View>
          )}
        </Formik>
      </View>

      <View
        style={[
          mainStyles.buttonContainer,
          styles.settingsButtonContainer,
          mainStyles.lowestElementOnPageToGiveItABottomMarginBecauseAndroidIsWeirdAndDoesntLikeShadowsForSomeReason,
        ]}
      >
        <Pressable
          style={[mainStyles.button, styles.settingsButton]}
          onPress={ async () => {
            await openBrowserAsync('https://joystep.uk/terms-and-privacy');
          }}
        >
          <Text style={mainStyles.buttonText}>Privacy Policy</Text>
        </Pressable>
      </View>
      <CustomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        email={email}
        deleteAccount={deleteAccount}
      />
    </ScrollView>
  );
};

const CustomModal = (props) => {
  const [password, changePassword] = useState('');

  return (
    <View style={modalStyles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
          props.setModalVisible(!props.modalVisible);
        }}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <Text>Your Email Address: {props.email}</Text>

            <TextInput
              style={modalStyles.inputBox}
              placeholder={'Enter your password'}
              onChangeText={changePassword}
              value={password}
              textAlign={'center'}
              secureTextEntry
            />

            <View style={modalStyles.buttonCentered}>
              <Pressable
                style={[modalStyles.button, modalStyles.buttonClose]}
                onPress={() => {
                  props.setModalVisible(!props.modalVisible);
                }}
              >
                <Text style={modalStyles.textStyle}>Cancel</Text>
              </Pressable>

              <Pressable
                style={[modalStyles.button, modalStyles.buttonOpen]}
                onPress={() => {
                  props.setModalVisible(!props.modalVisible);
                  changePassword('');
                  props.deleteAccount(password);
                }}
              >
                <Text style={modalStyles.textStyle}>Delete Account</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Settings;
