import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, Image, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { attachGroupMessageListenerAndDo, findUser, getAvatar } from '../../src/firebase/firestore/firestoreService';
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
                    viewProfile={props.viewProfile}
                />);
                oldTime = time;
                return messageComponent;
            })}
        </View>
    );
};

export const Message = (props) => {
    const message = props.message;

    const timeHours = new Date(message.time).getHours().toString();
    const timeMinutes = new Date(message.time).getMinutes().toString();
    const mesageTimeHours = timeHours.length == 1 ? '0'+timeHours : timeHours;
    const mesageTimeMinutes = timeMinutes.length == 1 ? '0'+timeMinutes : timeMinutes;
    const time = mesageTimeHours+':'+mesageTimeMinutes;
    const myMsg = message.sender == props.me;

    const prevMsgDate = timestampToDate(props.prevTime);
    const currentMsgDate = timestampToDate(message.time);
  
    const showDate = prevMsgDate !== currentMsgDate;

    let [ showOptions, setShowOptions ] = useState(false);
    return (
        <View>
        { showDate &&
            <View style={styles.messageDateContainer}>
                <Text style={styles.messageDateText}>{currentMsgDate}</Text>
            </View>
        }
            <View style={[styles.messageContainer, myMsg ? {alignSelf: 'flex-end'}: {alignSelf: 'flex-start'}]}>
                { !myMsg &&
                    <Avatar
                        user={message.sender}
                        viewProfile={async () => {
                            const user = await findUser(message.sender);
                            const userObject = {
                                id: user.id,
                                displayName: user.data().displayName,
                                skinTone: user.data().skinTone,
                                shirtColour: user.data().shirtColour,
                            };
                            props.viewProfile(userObject);
                        }}
                        myMsg={myMsg}/>
                }
                { myMsg && showOptions && 
                    <View style={styles.messageOptionsContainer}>
                        <Text style={styles.messageTime}>{time}</Text>
                    </View> 
                }
                <View style={myMsg ? styles.messageContainerMe : [styles.messageContainerOther,{alignSelf: 'flex-end'}]}>
                <TouchableOpacity onPress={() => { setShowOptions(!showOptions); }}>
                    <Text>{message.contents}</Text>
                </TouchableOpacity>
                </View>
                { !myMsg && showOptions && <Text style={styles.messageTime}>{time}</Text> }
                { myMsg && <Avatar user={message.sender} myMsg={myMsg} /> }
            </View>
        </View>
    );
};

const Avatar = (props) => {
    const [ skinTone, setSkinTone ] = useState();
    const [ shirtColour, setShirtColour ] = useState();
    
    useEffect(() => {
        getAvatar(props.user).then((avatar) => {
            if(avatar === null) return;
            setSkinTone(avatar.skin);
            setShirtColour(avatar.shirt);
        });
    }, []);

    if(!skinTone || !shirtColour){
        return (
            <View style={[avatarStyles.myAvatar, { width: 40, height: 40 }]}>
                <Image
                style={{width: 30, height: 30, position: 'absolute'}}
                source={require('../../assets/avatar_images/skintones/skin-unknown.png')}
                />
                <Image
                style={{width: 30, height: 30, position: 'absolute'}}
                source={require('../../assets/avatar_images/shirtcolours/shirt-unknown.png')}
                />
            </View>
        );
    }

    return (
        <Pressable
            onPress={ async () => {
                if(props.myMsg) return;
                await props.viewProfile();
            }}
            style={[avatarStyles.myAvatar, { width: 40, height: 40 }]}
        >
            <Image
            style={{width: 30, height: 30, position: 'absolute'}}
            source={SKIN_TONES[skinTone].image}
            />
            <Image
            style={{width: 30, height: 30, position: 'absolute'}}
            source={SHIRT_COLOURS[shirtColour].image}
            />
        </Pressable>
    );
};

export default GroupConversation;