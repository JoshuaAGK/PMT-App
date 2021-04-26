import React, { useState } from 'react';
import { Text, View, ScrollView, TextInput, FlatList } from 'react-native';
import mainStyles from '../../styles/styles';
import socialStyles from './styles';
import UpperContents from '../UpperContents';

var initialElements = [
    {id: "0", text: "Joe Bloggs"},
    {id: "1", text: "Gernot Liebchen"},
];

export const Social = (props) => {
    const [exampleState, setExampleState] = useState(initialElements);

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={mainStyles.mainPage}>
            <UpperContents
                content="friends"
            />
            <Text style={mainStyles.bigText}>Add Friend</Text>
            <TextInput
                style={mainStyles.textInput}
                placeholder="Friend's username"
                returnKeyType="search"
                clearButtonMode="while-editing"
                onSubmitEditing={(event) => addElement(event.nativeEvent.text)}
            />
            <Text style={mainStyles.bigText}>My Friends</Text>
            <View style={socialStyles.flatListView}>
                <FlatList
                    keyExtractor = {item => item.id}  
                    data={exampleState}
                    renderItem = {item => (<Text>{item.item.text}</Text>)} />
            </View>
        </ScrollView>
    );
};

export default Social;
