import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addGroup } from '../../src/features/groups/groupsSlice';
import { getGroupDetails, joinGroup } from '../../src/firebase/firestore/firestoreService';
import mainStyles from '../../styles/styles';
import styles from './style';

const GroupsList = (props) => {
    const dispatch = useDispatch();
    const groupsSelector = useSelector((state) => state.groups);
    return (
        <View style={[mainStyles.platformShadow, {marginBottom: 10}]}>
            {groupsSelector.groupsList.map((group, index) => {
                const firstGroup = index == 0;
                return (
                    <Pressable
                        key={index}
                        onPress={() => {
                            props.loadGroupData(group);
                            props.nav.navigate('groupsChatScreen');
                        }}
                        style={[styles.groupView, firstGroup ? styles.groupsViewFirst : null]}>
                        <Text style={styles.groupViewName}>{group.name}</Text>
                    </Pressable>
                );
            })

            
            }
            {groupsSelector.groupsList.length == 0 && 
                <View>
                    <Text style={styles.noGroupsText}>You are not in any group at the moment, try joining our official public chat!</Text>
                    <Pressable
                    onPress={ async () => {
                        const group = await getGroupDetails('default');
                        joinGroup('default');
                        dispatch(addGroup(group));
                    }}
                    style={styles.joinGroupButton}>
                        <Text style={styles.joinGroupButtonText}>Press me to join our group chat!</Text>
                    </Pressable>
                </View>
            }
        </View>
    );
};

export default GroupsList;