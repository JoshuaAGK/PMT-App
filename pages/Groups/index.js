import React, { useEffect } from 'react';
import { Alert, ScrollView, Text, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { UpperContents } from '../../components';
import GroupsList from '../../components/GroupsList';
import { addGroup, resetGroupsList } from '../../src/features/groups/groupsSlice';
import { findGroupsByName, getGroups, joinGroup } from '../../src/firebase/firestore/firestoreService';
import mainStyles from '../../styles/styles';

async function queryGroups(dispatch){
    dispatch(resetGroupsList());
    const groups = await getGroups();
    groups.forEach(group => {
        dispatch(addGroup(group));
    });
}

async function findGroup(name, dispatch, groupsSelector){
    findGroupsByName(name).then((groupsFound) => {
        if(groupsFound.length > 0){
            if(groupsSelector.groupsList.some(group => group.id == groupsFound[0].id)){
                alert('You are already in this group.');
                return;
            }
            Alert.alert(
                'Group found!',
                'Would you like to join '+groupsFound[0].name+'?',
                [
                    {
                        text: 'Yes',
                        style: 'default',
                        onPress: () => {
                            joinGroup(groupsFound[0].id);
                            dispatch(addGroup(groupsFound[0]));
                        }
                    },
                    {
                        text: 'No',
                        style: 'cancel',
                    }
                ]
            );
        }else{
            alert('Group not found');
        }
    });
}

export const Groups = (props) => {
    const dispatch = useDispatch();
    const groupsSelector = useSelector((state) => state.groups);

    useEffect(() => {
        queryGroups(dispatch);
    }, []);

    let searchGroupInput;

    return (
        <ScrollView
        showsVerticalScrollIndicator={false}
        style={mainStyles.mainPage}
      >
            <UpperContents content="none" />

            <Text style={mainStyles.bigText}>Find Groups</Text>
            <TextInput
                style={[mainStyles.textInput, mainStyles.platformShadow]}
                placeholder="Group name"
                returnKeyType="search"
                clearButtonMode="while-editing"
                onSubmitEditing={async (event) => {
                    searchGroupInput.clear();
                    findGroup(event.nativeEvent.text, dispatch, groupsSelector);
                }}
                ref={(input) => {
                searchGroupInput = input;
                }}
            />

            
            <Text style={mainStyles.bigText}>My Groups</Text>
            <GroupsList nav={props.nav} loadGroupData={props.loadGroupData} />
        </ScrollView>
    );
};

export default Groups;