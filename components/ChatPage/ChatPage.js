import React, { useState } from 'react';
import { Text, ScrollView, TextInput, View } from 'react-native';
import mainStyles from '../../styles/styles';
import styles from './styles';
import Advertisement from '../Advertisement/Advertisement';
import InlineBigComponent from '../InlineBigComponent/InlineBigComponent';
import UpperContents from '../UpperContents/UpperContents';
import Conversation from '../Conversation'

export const ChatPage = (props) => {
  
  return (
    <ScrollView
      //showsVerticalScrollIndicator={false}
      style={styles.chatPage}
    >
      <Conversation friendName = {props.friendName}/>
    </ScrollView>
  );
};

export default ChatPage;
