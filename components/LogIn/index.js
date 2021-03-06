import React from 'react';
import {
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import styles from './styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import firebase from '../../src/firebase/config';

import { signInWithEmail } from '../../src/firebase/firestore/firebaseService';

async function resetPassword(email) {
  const auth = firebase.auth();
  auth
    .sendPasswordResetEmail(email)
    .then(function () {
      alert('If the email address you inputted was correct, an email has been sent to reset your password');
    })
    .catch(function (error) {
      alert('If the email address you inputted was correct, an email has been sent to reset your password');
    });
}

export const LogIn = ({ navigation }) => {
  const onFooterLinkPress = () => {
    navigation.navigate('Registration');
  };

  const showToast = (error) => {
    if (Platform.OS === 'android') {
      ToastAndroid.showWithGravityAndOffset(
        `${error}`,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    } else {
      return <Text style={styles.errorStyle}>{error}</Text>;
    }
  };

  return (
    <ScrollView keyboardShouldPersistTaps={'handled'}>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string().required().email(),
          password: Yup.string().required(),
        })}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await signInWithEmail(values);
            setSubmitting(false);
            navigation.reset({ index: 0, routes: [{ name: 'Journal' }] });
          } catch (e) {
            setErrors({ auth: e.message });
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
        }) => (
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor="#aaaaaa"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              name="email"
            />
            {errors.email && touched.email ? (
              <Text style={styles.errorStyle}>{errors.email}</Text>
            ) : null}
            <TextInput
              style={styles.input}
              placeholderTextColor="#aaaaaa"
              secureTextEntry
              placeholder="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              name="password"
            />
            {errors.password && touched.password ? (
              <Text style={styles.errorStyle}>{errors.password}</Text>
            ) : null}
            {errors.auth && showToast(errors.auth)}
            <TouchableOpacity
              style={styles.button}
              disabled={!isValid}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonTitle}>Log In</Text>
            </TouchableOpacity>
            <View style={styles.footerView}>
              <Text style={styles.footerText}>
                {'Don\'t have an account? '}
                <Text onPress={onFooterLinkPress} style={styles.footerLink}>
                  Sign Up
                </Text>
              </Text>
            </View>
            {errors.auth &&
              <View style={styles.footerView}>
                <Text style={styles.footerText}>
                  {'Forgot password? '}
                  <Text
                    onPress={async () => {
                      await resetPassword(values.email);
                    }}
                    style={styles.footerLink}
                  >
                    Send email to reset
                  </Text>
                </Text>
              </View>
            }
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default LogIn;
