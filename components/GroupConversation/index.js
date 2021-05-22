import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { attachGroupMessageListenerAndDo, getAvatar } from '../../src/firebase/firestore/firestoreService';
import avatarStyles from '../CustomiseAvatar/styles';
import { SKIN_TONES, SHIRT_COLOURS } from '../CustomiseAvatar/avatar';
import styles from './style';

function timestampToDate(timestamp) {
    const prevDate = new Date(timestamp);
    const prevDay = prevDate.getDate() < 10 ? '0'+prevDate.getDate() : prevDate.getDate();
    const prevMon = prevDate.getMonth()+1 < 10 ? '0'+(prevDate.getMonth()+1) : prevDate.getMonth()+1;
    const prevYear = prevDate.getFullYear();
    const finalDate = prevDay+'/'+prevMon+'/'+prevYear;
    return finalDate;
}

const GroupConversation = (props) => {

    const authSelector = useSelector((state) => state.auth);
    const [ conversation, setConversation ] = useState([]);

    attachGroupMessageListenerAndDo(
        props.group.id,
        (snapshot) => {
            //resetUnreadMessages(props.friend.id);
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
    return (
        <View style={styles.container}>
            {conversation.map((message, index) => {
                const time = message.time;

                const messageComponent = (
                <Message
                    key={index}
                    me={authSelector.currentUser.uid}
                    message={message}
                    prevTime={oldTime}
                    //setEditingMessage={setEditingMessage}
                    /*deleteMessage={(message) => {
                        deleteConversationMessage(message.id);
                        deleteMessage(conversationID, message.id);
                    }}*/
                />);
                oldTime = time;
                return messageComponent;
            })}
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

    /*const setEditingMessage = props.setEditingMessage;
    const deleteMessage = props.deleteMessage;*/

    let [ showOptions, setShowOptions ] = useState(false);
    return (
        <View>
        { showDate &&
            <View style={styles.messageDateContainer}>
                <Text style={styles.messageDateText}>{currentMsgDate}</Text>
            </View>
        }
            <View style={[styles.messageContainer, myMsg ? {alignSelf: 'flex-end'}: {alignSelf: 'flex-start'}]}>
                { !myMsg && <Avatar user={message.sender} /> }
                { myMsg && showOptions && 
                    <View style={styles.messageOptionsContainer}>
                        <Text style={styles.messageTime}>{time}</Text>
                        {/*<Pressable style={styles.messageOptionBtn} onPress={() => {
                            setEditingMessage(message);
                        }}>
                            <Text style={styles.messageOptionText}>Edit</Text>
                        </Pressable>
                        <Pressable style={styles.messageOptionBtn} onPress={() => {
                            deleteMessage(message);
                        }}>
                            <Text style={styles.messageOptionText}>Delete</Text>
                        </Pressable>*/}
                    </View> 
                }
                <View style={myMsg ? styles.messageContainerMe : [styles.messageContainerOther,{alignSelf: 'flex-end'}]}>
                <TouchableOpacity onPress={() => { setShowOptions(!showOptions); }}>
                    <Text>{message.contents}</Text>
                </TouchableOpacity>
                </View>
                { !myMsg && showOptions && <Text style={styles.messageTime}>{time}</Text> }
                { myMsg && <Avatar user={message.sender} /> }
            </View>
        </View>
    );
};

const Avatar = (props) => {
    const [ skinTone, setSkinTone ] = useState();
    const [ shirtColour, setShirtColour ] = useState();
    
    useEffect(() => {
        getAvatar(props.user).then((avatar) => {
            setSkinTone(avatar.skin);
            setShirtColour(avatar.shirt);
        });
    }, []);

    if(!skinTone || !shirtColour){
        return (
            <View></View>
        );
    }

    return (
        <View style={[avatarStyles.myAvatar, { width: 40, height: 40 }]}>
                <Image
                style={{width: 30, height: 30, position: 'absolute'}}
                source={SKIN_TONES[skinTone].image}
                />
                <Image
                style={{width: 30, height: 30, position: 'absolute'}}
                source={SHIRT_COLOURS[shirtColour].image}
                />
            </View>
    );
};

export default GroupConversation;