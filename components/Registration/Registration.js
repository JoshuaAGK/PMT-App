import React from 'react';
import {ScrollView, Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {Formik} from 'formik'

import {TextInput} from 'react-native-gesture-handler';
import {registerInFirebase} from '../../src/firebase/firestore/firebaseService';


export const Registration = ({navigation}) => {
    const showToast = (error) => {
        if (Platform.OS === 'android') {
            ToastAndroid.showWithGravityAndOffset(
                `${error}`,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            )
        } else {
            return <Text style={styles.errorStyle}>{error}</Text>;
        }
    }

    const onFooterLinkPress = () => {
        navigation.navigate('Log In');
    }

    return (
        <Formik
            initialValues={{displayName: '', email: '', password: ''}}
            onSubmit={async (values, {setSubmitting, setErrors}) => {
                try {
                    await registerInFirebase(values);
                    setSubmitting(false);
                    navigation.navigate('App');
                    navigation.reset({index: 0, routes: [{name: 'App'}]});
                } catch (e) {
                    setErrors({auth: e.message});
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
                  isValid
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
                    {errors.auth &&
                    showToast(errors.auth)}
                    <TouchableOpacity
                        style={styles.button}
                        disabled={!isValid}
                        onPress={handleSubmit}>
                        <Text style={styles.buttonTitle}>Sign Up</Text>
                    </TouchableOpacity>
                    <View style={styles.footerView}>
                        <Text style={styles.footerText}>Already have an account? <Text onPress={onFooterLinkPress}
                                                                                       style={styles.footerLink}>Log
                            In</Text></Text>
                    </View>
                </View>
            )}
        </Formik>
    );
}

export default Registration;