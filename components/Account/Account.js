import React, { useState } from 'react';
import { Text, ScrollView } from 'react-native';
import mainStyles from '../../styles/styles';
import accountStyles from './styles';
import Advertisement from '../Advertisement/Advertisement';
import InlineBigComponent from '../InlineBigComponent/InlineBigComponent';
import UpperContents from '../UpperContents/UpperContents';
import AlarmItem from '../AlarmItem/AlarmItem';

import * as firebase from 'firebase';
import '@firebase/auth';
import { TextInput } from 'react-native-gesture-handler';

export const Account = (props) => {
    return (
        <ScrollView
        showsVerticalScrollIndicator={false}
        style={mainStyles.mainPage}
        >
        <UpperContents content="logout" />
        <Text style={mainStyles.bigText}>Alarm</Text>
        <AlarmItem />
        <Advertisement type="inline" content="ADVERTISEMENT" />
        <Text style={mainStyles.bigText}>Customise Avatar</Text>
        <InlineBigComponent content="AVATAR CUSTOMISATION (TBD)" tbd={true} />
        </ScrollView>
    );
};

export default Account;
