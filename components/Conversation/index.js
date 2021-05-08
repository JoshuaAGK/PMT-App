import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import convo from './convo.json';
import { attachMessageListenerAndDo } from '../../src/firebase/firestore/firestoreService';
import { useSelector } from 'react-redux';



export const Conversation = (props) => {
  const authSelector = useSelector(state => state.auth);
  attachMessageListenerAndDo(authSelector.currentUser.uid,props.friend.id,(snapshot) => {
    console.log(snapshot);
  });

  return (
    <View style={styles.container}>
      {convo.map((message, index) => {
        var timestamp = message[Object.keys(message)[0]]['timestamp'];
        var sender = message[Object.keys(message)[0]]['sender'];
        var contents = message[Object.keys(message)[0]]['contents'];

        return (
          <Message key={index} sender={sender} contents={contents} timestamp={timestamp}/>
        );
    })}
    </View>
  );
};

export const Message = (props) => {
  if (props.sender == 'you') {
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