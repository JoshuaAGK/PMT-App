import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  TextInput,
  Pressable
} from 'react-native';
import styles from './styles';
import { Formik } from 'formik';
import { registerInFirebase } from '../../src/firebase/firestore/firebaseService';
import { useDispatch } from 'react-redux';
import { addDisplayName } from '../../src/features/auth/authSlice';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { openBrowserAsync } from 'expo-web-browser';

export const Registration = ({ navigation }) => {
  const dispatch = useDispatch();
  const [ termsAndPrivacy, setTermsAndPrivacy ] = useState(false);
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

  const onFooterLinkPress = () => {
    navigation.navigate('Log In');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Formik
        initialValues={{ displayName: '', email: '', password: '', termsAndPrivacy: false}}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          if(!termsAndPrivacy){
            setErrors({ auth: 'Please accept the terms and conditions and the privacy policy' });
            setSubmitting(false);
            return;
          }
          try {
            dispatch(addDisplayName(values.displayName));
            await registerInFirebase(values);
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
          errors,
          isValid,
          validateForm
        }) => (
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="Your Display Name"
              placeholderTextColor="#aaaaaa"
              onChangeText={handleChange('displayName')}
              onBlur={handleBlur('displayName')}
              value={values.displayName}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor="#aaaaaa"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
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
            />
            <View style={{
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              maxWidth: '80%',
              marginTop: 10,
              marginBottom: 10
            }}>
              <BouncyCheckbox
                size={25}
                fillColor="skyblue"
                unfillColor="white"
                text="By ticking this, you are accepting the Terms and Conditions and Privacy Policy"
                textStyle={[{textDecorationLine: 'none', fontWeight: 'bold'}, termsAndPrivacy ? {color: 'darkgreen'} : null]}
                isChecked={termsAndPrivacy}
                onPress={(isChecked) => {
                  setTermsAndPrivacy(isChecked);
                  if(isChecked){
                    errors.auth = false;
                    validateForm();
                  }
                }}
              />
              <Pressable
                onPress={async () => {
                  await openBrowserAsync('https://joystep.uk/terms-and-privacy');
                }}
                style={{marginTop: 15}}
                >
                <Text style={{color: 'navy', fontWeight: 'bold'}}>Click on me to view the T&C and Privacy Policy</Text>
              </Pressable>
            </View>
            {errors.auth && showToast(errors.auth)}
            <TouchableOpacity
              style={styles.button}
              disabled={!isValid}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonTitle}>Sign Up</Text>
            </TouchableOpacity>
            <View style={styles.footerView}>
              <Text style={styles.footerText}>
                Already have an account?{' '}
                <Text onPress={onFooterLinkPress} style={styles.footerLink}>
                  Log In
                </Text>
              </Text>
            </View>

            {/* TODO: Data Privacy Collection Statement */}
            {/* the data we have collected as part of (@form) will be used to (@use/purpose of collection) */}
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default Registration;
