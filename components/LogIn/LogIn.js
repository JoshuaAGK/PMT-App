import React, {useState} from 'react';
import {Modal, ScrollView, Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {Formik} from 'formik'
import * as Yup from 'yup'

import {TextInput} from 'react-native-gesture-handler';
import {signInWithEmail} from '../../src/firebase/firestore/firebaseService';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';


export const LogIn = ({navigation}) => {
    const onFooterLinkPress = () => {
        navigation.navigate('Registration')
    }

    const showToast = (error) => {
        ToastAndroid.showWithGravityAndOffset(
            `${error}`,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
        )
    }

    return (
        <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={Yup.object({
                email: Yup.string().required().email(),
                password: Yup.string().required()
            })}
            onSubmit={async (values, {setSubmitting, setErrors}) => {
                try {
                    await signInWithEmail(values);
                    setSubmitting(false);
                    navigation.navigate('App');
                    navigation.reset({index: 0, routes: [{name: 'App'}]});
                } catch (e) {
                    setErrors({auth: 'Incorrect username or password'})
                    setSubmitting(false)
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
                  isValid
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
                        <Text style={styles.errorStyle}>{errors.email}</Text>) : null}
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
                    {errors.password && touched.password ? (<Text
                        style={styles.errorStyle}>{errors.password}</Text>) : null}
                    <TouchableOpacity
                        style={styles.button}
                        disabled={!isValid}
                        onPress={handleSubmit}>
                        <Text style={styles.buttonTitle}>Log In</Text>
                    </TouchableOpacity>
                    {errors.auth &&
                    showToast(errors.auth)}
                    <View style={styles.footerView}>
                        <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress}
                                                                                     style={styles.footerLink}>Sign
                            Up</Text></Text>
                    </View>
                </View>
            )}
        </Formik>
    );
}


export default LogIn;

