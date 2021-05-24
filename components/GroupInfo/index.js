import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { findUser, leaveGroup as leaveGroupFirestore } from '../../src/firebase/firestore/firestoreService';
import mainStyles from '../../styles/styles';
import styles from './style';
import avatarStyles from '../CustomiseAvatar/styles';
import { SKIN_TONES, SHIRT_COLOURS } from '../CustomiseAvatar/avatar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { removeGroup as removeGroupStore } from '../../src/features/groups/groupsSlice';

async function leaveGroup(dispatch, groupsSelector, groupId, nav){
    for (const group in groupsSelector.groupsList) {
        if (Object.hasOwnProperty.call(groupsSelector.groupsList, group)) {
            if(groupsSelector.groupsList[group].id === groupId){
                dispatch(removeGroupStore(groupsSelector.groupsList[group]));
                await leaveGroupFirestore(groupId);
                break;
            }
        }
    }
    nav.navigate('groupsHomeScreen');
}

const GroupInfo = (props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const authSelector = useSelector((state) => state.auth);
    const groupsSelector = useSelector((state) => state.groups);
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
            <View style={[mainStyles.platformShadow, {marginBottom: 30}]}>
                {groupMembers.length > 0 && groupMembers.map((member, index) => {
                    const selfRow = member.id == (authSelector.currentUser ? authSelector.currentUser.uid : false);
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
                                index == groupMembers.length-1 ? styles.memberRowLast : null,
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
            <View style={styles.container}>
                <Pressable
                    style={styles.buttonRed}
                    onPress={async () => {await leaveGroup(dispatch, groupsSelector, props.group.id, navigation);}}>
                        <Text style={styles.buttonText}>Leave group</Text>
                </Pressable>
            </View>
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