import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import mainStyles from '../../styles/styles';
import Conversation from '../Conversation';

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
