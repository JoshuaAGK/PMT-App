import React, { useState } from 'react';
import { Text, ScrollView, TextInput } from 'react-native';
import mainStyles from '../../styles/styles';
import journalStyles from './styles';
import Advertisement from '../Advertisement/Advertisement';
import InlineBigComponent from '../InlineBigComponent/InlineBigComponent';
import UpperContents from '../UpperContents/UpperContents';

export const Journal = (props) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={mainStyles.mainPage}
    >
      <UpperContents content="currency" />
      <Text style={mainStyles.bigText}>Journal</Text>
      <TextInput
        style={journalStyles.journalInput}
        placeholder="Journal entry for today"
        multiline={true}
      />
      <Advertisement type="inline" content="ADVERTISEMENT" />
      <Text style={mainStyles.bigText}>Brain Training</Text>
      <InlineBigComponent type="brainTraining" />
    </ScrollView>
  );
};

export default Journal;
