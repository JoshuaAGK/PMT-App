import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import { attachMessageListenerAndDo } from '../../src/firebase/firestore/firestoreService';
import { useSelector } from 'react-redux';

function timestampToDate(timestamp) {
  const prevDate = new Date(timestamp);
  const prevDay = prevDate.getDate() < 10 ? '0'+prevDate.getDate() : prevDate.getDate();
  const prevMon = prevDate.getMonth()+1 < 10 ? '0'+(prevDate.getMonth()+1) : prevDate.getMonth()+1;
  const prevYear = prevDate.getFullYear();
  const finalDate = prevDay+'/'+prevMon+'/'+prevYear;
  return finalDate;
}

export const Conversation = (props) => {
  const [conversation, setConversation] = useState([]);
  const authSelector = useSelector((state) => state.auth);

  attachMessageListenerAndDo(
    authSelector.currentUser.uid,
    props.friend.id,
    (snapshot) => {
      setConversation((prevConversation) => [...prevConversation, snapshot]);
    },
    []
  );
  let oldTime = 0;
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

        const messageComponent = (<Message
          key={index}
          me={authSelector.currentUser.uid}
          sender={sender}
          contents={contents}
          timestamp={time}
          prevTime={oldTime}
        />);
        oldTime = time;
        return messageComponent;
      })}
    </View>
  );
};

export const Message = (props) => {
  const time = new Date(props.timestamp).getHours()+':'+new Date(props.timestamp).getMinutes();
  const myMsg = props.sender == props.me;

  const prevMsgDate = timestampToDate(props.prevTime);
  const currentMsgDate = timestampToDate(props.timestamp);
  
  const showDate = prevMsgDate !== currentMsgDate;

  let [ showTime, setShowTime ] = useState(false);
  return (
    <View>
      { showDate &&
        <View style={styles.messageDateContainer}>
          <Text style={styles.messageDateText}>{currentMsgDate}</Text>
        </View>
      }
      <View style={[styles.messageContainer, myMsg ? {alignSelf: 'flex-end'}: {alignSelf: 'flex-start'}]}>
        { myMsg && showTime && <Text style={styles.messageTime}>{time}</Text> }
        <View style={myMsg ? styles.messageContainerMe : [styles.messageContainerOther,{alignSelf: 'flex-end'}]}>
          <TouchableOpacity
            onPress={() => {setShowTime(!showTime);}}
          >
            <Text>{props.contents}</Text>
          </TouchableOpacity>
        </View>
        { !myMsg && showTime && <Text style={styles.messageTime}>{time}</Text> }
      </View>
    </View>
  );
};

export default Conversation;
