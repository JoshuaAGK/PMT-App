import React, { useState } from 'react';
import { Text, ScrollView } from 'react-native';
import mainStyles from '../../styles/styles';
import Advertisement from '../Advertisement/Advertisement';
import InlineBigComponent from '../InlineBigComponent/InlineBigComponent';
import UpperContents from '../UpperContents/UpperContents';
import AlarmItem from '../AlarmItem/AlarmItem';

export const Account = (props) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={mainStyles.mainPage}
    >
      <UpperContents content="logout" />
      <Text style={mainStyles.bigText}>How do you feel?</Text>
      <InlineBigComponent type="emotionSubmit" />
      <Text style={mainStyles.bigText}>Alarm</Text>
      <AlarmItem />
      <Advertisement type="inline" content="ADVERTISEMENT" />
      <Text style={mainStyles.bigText}>Customise Avatar</Text>
      <InlineBigComponent content="AVATAR CUSTOMISATION (TBD)" tbd={true} />
    </ScrollView>
  );
};

export default Account;
