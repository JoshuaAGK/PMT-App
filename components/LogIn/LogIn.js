import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import mainStyles from '../../styles/styles';
import loginStyles from './styles';
import Advertisement from '../Advertisement/Advertisement';
import InlineBigComponent from '../InlineBigComponent/InlineBigComponent';
import UpperContents from '../UpperContents/UpperContents';
import AlarmItem from '../AlarmItem/AlarmItem';

import * as firebase from 'firebase';
import '@firebase/auth';
import { TextInput } from 'react-native-gesture-handler';

export const LogIn = ({ navigation }) => {

    function onLogIn() {
        navigation.navigate('App');
        navigation.reset({index: 0, routes: [{name: 'App'}]});
    }

    return (
        <ScrollView>
            <TextInput
                style={loginStyles.txtInput}
                placeholder="Username"
                multiline={true}
            />
            <TextInput
                style={loginStyles.txtInput}
                placeholder="Password"
                multiline={true}
            />
            <View style={mainStyles.buttonContainer}>
                <Pressable style={mainStyles.button} onPress={onLogIn}>
                    <Text style={mainStyles.buttonText}>Log In</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
};

export default LogIn;
