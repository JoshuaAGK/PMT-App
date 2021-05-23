import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, Pressable } from 'react-native';
import { findUser } from '../../src/firebase/firestore/firestoreService';
import mainStyles from '../../styles/styles';
import styles from './style';
import avatarStyles from '../CustomiseAvatar/styles';
import { SKIN_TONES, SHIRT_COLOURS } from '../CustomiseAvatar/avatar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';

const GroupInfo = (props) => {
    const authSelector = useSelector((state) => state.auth);
    const [ groupMembers, setGroupMembers ] = useState([]);

    useEffect(() => {

        async function getGroupMembersDetails(group){
            let membersList = [];
            for(const memberId in group.members){
                const member = await findUser(group.members[memberId]);
                membersList.push({
                    id: member.id,
                    displayName: member.data().displayName,
                    skinTone: member.data().skinTone,
                    shirtColour: member.data().shirtColour
                });
            }
            setGroupMembers(membersList);
        }
        getGroupMembersDetails(props.group);        
    }, []);

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={[mainStyles.mainPage, {marginTop: 10}]}
        >
            <Text style={mainStyles.bigText}>Group Members</Text>
            <View style={[mainStyles.platformShadow, {marginBottom: 10}]}>
                {groupMembers.length > 0 && groupMembers.map((member, index) => {
                    const selfRow = member.id == authSelector.currentUser.uid;
                    return (
                        <Pressable
                            onPress={() => {
                                if(selfRow) return;
                                props.viewProfile(member);
                            }}
                            key={index}
                            style={[
                                styles.memberRow,
                                index == 0 ? styles.memberRowFirst : null,
                                selfRow ? styles.memberRowSelf : null
                            ]}
                        >
                            <Avatar skinTone={member.skinTone} shirtColour={member.shirtColour} />
                            <Text style={styles.memberName}>{member.displayName}</Text>
                            {member.id == props.group.owner && 
                                <MaterialCommunityIcons style={styles.ownerIcon} name='crown' size={25} color='#fcc200' />
                            }
                        </Pressable>
                    );
                })}
            </View>

            <Text style={mainStyles.bigText}>Group Actions</Text>
            <Text>Some buttons here to leave group</Text>
        </ScrollView>
    );
};

const Avatar = (props) => {
    const skinTone = props.skinTone;
    const shirtColour = props.shirtColour;
    
    return (
        <View style={[avatarStyles.myAvatar, { width: 40, height: 40, marginRight: 15 }]}>
                <Image
                style={{width: 40, height: 40, position: 'absolute'}}
                source={SKIN_TONES[skinTone].image}
                />
                <Image
                style={{width: 40, height: 40, position: 'absolute'}}
                source={SHIRT_COLOURS[shirtColour].image}
                />
            </View>
    );
};

export default GroupInfo;