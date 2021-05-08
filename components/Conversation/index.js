import React, { useState } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import convo from './convo.json';
import { attachMessageListenerAndDo } from '../../src/firebase/firestore/firestoreService';
import { useSelector } from 'react-redux';



export const Conversation = (props) => {
  const [conversation, setConversation ] = useState([]);
  const authSelector = useSelector(state => state.auth);

  attachMessageListenerAndDo(authSelector.currentUser.uid,props.friend.id,(snapshot) => {
    //conversation.push(snapshot);
    console.log(conversation);
    let wholeConversation = [...conversation, snapshot];
    console.log(wholeConversation);
    //console.log(conversation);
    setConversation(wholeConversation);
  },[]);

  // console.log(conversation);
  return (
    <View style={styles.container}>
      {conversation.map((message, index) => {
        message = JSON.parse(JSON.stringify(message));
        const sender = message.sender;
        const contents = message.contents;
        const time = message.time;
        /*const timestamp = message['time'];
        const sender = message['sender'];
        const contents = message['contents'];*/

        return (
          <Message key={index} me={authSelector.currentUser.uid} sender={sender} contents={contents} timestamp={time}/>
        );
    })}
    </View>
  );
};

export const Message = (props) => {
  //console.log(props);
  if (props.sender == props.me) {
    return (
      <View style={styles.messageContainerMe}>
        <Text>{props.contents}</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.messageContainerOther}>
        <Text>{props.contents}</Text>
      </View>
    );
  }
};

export default Conversation;