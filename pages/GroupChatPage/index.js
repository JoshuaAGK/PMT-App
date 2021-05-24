import React from 'react';
import { KeyboardAvoidingView, ScrollView, Text, TextInput, Pressable } from 'react-native';
import GroupConversation from '../../components/GroupConversation';
import { sendGroupMessage } from '../../src/firebase/firestore/firestoreService';
import styles from './style';

const GroupChatPage = (props) => {

    const onMessageSend = async (message) => {
        if (message === '') return;
        await sendGroupMessage(props.group.id, message);
    };

    let sendMessageInput;
    let changingText;
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == 'android' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS == 'android' ? 0 : 60}
            style={styles.chatPage}
        >
            <ScrollView
                style={styles.chatView}
            >
                <GroupConversation group={props.group} viewProfile={props.viewProfile} />
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

export default GroupChatPage;