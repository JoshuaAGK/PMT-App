import React from 'react';
import {  KeyboardAvoidingView, ScrollView, Text, TextInput, Pressable, Platform } from 'react-native';
import Conversation from '../Conversation';
import styles from './styles';

export const ChatPage = (props) => {
  let addFriendInput;

  let scrollView;

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS == 'android' ? 'padding' : 'height'}
    keyboardVerticalOffset={Platform.OS == 'android' ? 0 : 60}
    style={styles.chatPage}>
      <ScrollView
        style={styles.chatView}
        ref={ref => {scrollView = ref;}}
        onContentSizeChange={() => scrollView.scrollToEnd({animated: true})}
      >
        <Conversation friend={props.friend}/>
      </ScrollView>
      <TextInput
        style={styles.chatInput}
        placeholder="Enter your message..."
        //returnKeyType="search"
        multiline={true}
        clearButtonMode="while-editing"
        onSubmitEditing={async () => {
          //addFriendInput.clear();
          //await addElement(event.nativeEvent.text);
          //onRefresh();
        }}
        ref={(input) => {
          addFriendInput = input;
        }}
      />
      <Pressable
        style={styles.chatSendButton}
        onPress={() => {
          addFriendInput.blur();
          addFriendInput.clear();
        }}>
        <Text style={styles.chatSendButtonText}>Send</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default ChatPage;
