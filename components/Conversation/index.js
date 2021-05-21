import React, { useState } from 'react';
import { Pressable, Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import { attachMessageListenerAndDo, deleteMessage, resetUnreadMessages, updateMessage } from '../../src/firebase/firestore/firestoreService';
import { useSelector } from 'react-redux';
import EditModal from '../EditModal';

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
  const [editingMessage, setEditingMessage] = useState();
  const authSelector = useSelector((state) => state.auth);

  let userId1 = authSelector.currentUser.uid;
  let userId2 = props.friend.id;
  let conversationID;
  if ( userId1 < userId2 ) conversationID = userId1 + ':' + userId2;
  else conversationID = userId2 + ':' + userId1;

  function setConversationMessage(newMessage) {
      let tempConversation = [...conversation];
      let replaceIndex = -1;
      for (let i = 0; i < tempConversation.length; i++) {
        let message = tempConversation[i];
        if (message.id === newMessage.id) {
            replaceIndex = i;
        }
      }
      if (replaceIndex == -1) {
          return;
      }
      tempConversation.splice(replaceIndex, 1, newMessage);
      setConversation(tempConversation);
  }

  function deleteConversationMessage(messageId) {
    let tempConversation = [...conversation];
    let deleteIndex = -1;
    for (let i = 0; i < tempConversation.length; i++) {
      let message = tempConversation[i];
      if (message.id === messageId) {
        deleteIndex = i;
      }
    }
    if (deleteIndex == -1) {
        return;
    }
    tempConversation.splice(deleteIndex, 1);
    setConversation(tempConversation);
  }

  attachMessageListenerAndDo(
    authSelector.currentUser.uid,
    props.friend.id,
    (snapshot) => {
      resetUnreadMessages(props.friend.id);
      let snapshotVal = snapshot.val();
      let addMessage = {
        id: snapshot.key,
        sender: snapshotVal.sender,
        contents: snapshotVal.contents,
        time: snapshotVal.time
      };
      setConversation((prevConversation) => [...prevConversation, addMessage]);
    },
    []
  );
  let oldTime = 0;
  let editingMessageText = null;
  if (editingMessage != null) {
    editingMessageText = editingMessage.contents;
  }
  return (
    <View style={styles.container}>
        <View style={styles.container}>
            {conversation.map((message, index) => {
                const time = message.time;

                const messageComponent = (<Message
                    key={index}
                    me={authSelector.currentUser.uid}
                    message={message}
                    prevTime={oldTime}
                    setEditingMessage={setEditingMessage}
                    deleteMessage={(message) => {
                        deleteConversationMessage(message.id);
                        deleteMessage(conversationID, message.id);
                    }}
                />);
                oldTime = time;
                return messageComponent;
            })}
        </View>
        <EditModal
            editingText={editingMessageText}
            setEditingText={(editingText, persist = false) => {
                let newEditingMessage = {
                    id: editingMessage.id,
                    sender: editingMessage.sender,
                    contents: editingMessage.contents,
                    time: editingMessage.time
                };
                if (editingText != null) {
                    newEditingMessage.contents = editingText;
                    setEditingMessage(newEditingMessage);
                    setConversationMessage(newEditingMessage);
                } else {
                    setEditingMessage(null);
                }
                if (persist) {
                    let persistMessage = {
                        sender: newEditingMessage.sender,
                        contents: newEditingMessage.contents,
                        time: newEditingMessage.time
                    };
                    updateMessage(conversationID, newEditingMessage.id, persistMessage);
                    setEditingMessage(null);
                }
            }}
            editTxtPlaceholder={'Edit your message...'}
            saveBtnText={'Save message edit'}
        />
    </View>
  );
};

export const Message = (props) => {
    const message = props.message;

    const time = new Date(message.time).getHours()+':'+new Date(message.time).getMinutes();
    const myMsg = message.sender == props.me;

    const prevMsgDate = timestampToDate(props.prevTime);
    const currentMsgDate = timestampToDate(message.time);
  
    const showDate = prevMsgDate !== currentMsgDate;

    const setEditingMessage = props.setEditingMessage;
    const deleteMessage = props.deleteMessage;

    let [ showOptions, setShowOptions ] = useState(false);
    return (
        <View>
        { showDate &&
            <View style={styles.messageDateContainer}>
            <Text style={styles.messageDateText}>{currentMsgDate}</Text>
            </View>
        }
        <View style={[styles.messageContainer, myMsg ? {alignSelf: 'flex-end'}: {alignSelf: 'flex-start'}]}>
            { myMsg && showOptions && 
                <View style={styles.messageOptionsContainer}>
                    <Text style={styles.messageTime}>{time}</Text>
                    <Pressable style={styles.messageOptionBtn} onPress={() => {
                        setEditingMessage(message);
                    }}>
                        <Text style={styles.messageOptionText}>Edit</Text>
                    </Pressable>
                    <Pressable style={styles.messageOptionBtn} onPress={() => {
                        deleteMessage(message);
                    }}>
                        <Text style={styles.messageOptionText}>Delete</Text>
                    </Pressable>
                </View> 
            }
            <View style={myMsg ? styles.messageContainerMe : [styles.messageContainerOther,{alignSelf: 'flex-end'}]}>
            <TouchableOpacity onPress={() => { setShowOptions(!showOptions); }}>
                <Text>{message.contents}</Text>
            </TouchableOpacity>
            </View>
            { !myMsg && showOptions && <Text style={styles.messageTime}>{time}</Text> }
        </View>
        </View>
    );
};


export default Conversation;
