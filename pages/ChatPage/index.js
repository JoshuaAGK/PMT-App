import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  Pressable,
  Platform,
} from 'react-native';
import Conversation from '../../components/Conversation';
import { sendMessage } from '../../src/firebase/firestore/firestoreService';
import styles from './styles';

export const ChatPage = (props) => {
  let sendMessageInput;
  let scrollView;

  const onMessageSend = async (message) => {
    if (message === '') return;
    await sendMessage(props.friend.id, message);
  };

  let changingText = '';
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'android' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS == 'android' ? 0 : 60}
      style={styles.chatPage}
    >
      <ScrollView
        style={styles.chatView}
        ref={(ref) => {
          scrollView = ref;
        }}
        onContentSizeChange={() => scrollView.scrollToEnd({ animated: true })}
      >
        <Conversation friend={props.friend} />
      </ScrollView>
      <TextInput
        style={styles.chatInput}
        maxLength={256}
        placeholder="Enter your message..."
        //returnKeyType="search"
        multiline={true}
        clearButtonMode="while-editing"
        onChangeText={(text) => {
          changingText = text;
        }}
        ref={(input) => {
          sendMessageInput = input;
        }}
      />
      <Pressable
        style={styles.chatSendButton}
        onPress={async () => {
          sendMessageInput.blur();
          sendMessageInput.clear();
          await onMessageSend(changingText);
          changingText = '';
        }}
      >
        <Text style={styles.chatSendButtonText}>Send</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default ChatPage;
