import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, FlatList } from 'react-native';
import styles from './styles'
import Advertisement from '../Advertisement'
import InlineBigComponent from '../InlineBigComponent'
import UpperContents from '../UpperContents';
import AlarmItem from '../AlarmItem';

var initialElements = [
    {id: "0", text: "Joe Bloggs"},
    {id: "1", text: "Gernot Liebchen"},
]

const VerticalPage = (props) => {
    const pageName = props.page

    function thisworks(textInput) {
        alert(textInput);
    }

    const [exampleState, setExampleState] = useState(initialElements)

    const addElement = (name) => {
        var friendsIndex = String(initialElements.length)
        var newArray = [...initialElements , {id : friendsIndex, text: name}];
        initialElements = newArray;
        setExampleState(newArray);
    }

    // const addElement = (name) => {
    //     alert(exampleState.length)
    //     var friendsIndex = String(exampleState.length)
    //     var newArray = [...initialElements , {id : friendsIndex, text: String(friendsIndex + " " + name)}];
    //     // initialElements = newArray;
    //     setExampleState(newArray);
    // }


    

    if (pageName == "journal") {
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={styles.mainPage}>
                <UpperContents
                    content="currency"
                />
                <Text style={styles.bigText}>Journal</Text>
                <TextInput
                    style={styles.journalInput}
                    placeholder="Journal entry for today"
                    multiline={true}
                />
                <Advertisement
                    type = "inline"
                    content = "ADVERTISEMENT"
                />
                <Text style={styles.bigText}>Brain Training</Text>
                <InlineBigComponent
                    content = "GAME ELEMENT (TBD)"
                    tbd = {true}
                />
            </ScrollView>
        );
    } else if (pageName == "me") {
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={styles.mainPage}>
                <UpperContents
                    content="logout"
                />
                <Text style={styles.bigText}>How do you feel?</Text>
                <InlineBigComponent
                    type="emotionSubmit"
                />
                <Text style={styles.bigText}>Alarm</Text>
                <AlarmItem/>
                <Advertisement
                    type = "inline"
                    content = "ADVERTISEMENT"
                />
                <Text style={styles.bigText}>Customise Avatar</Text>
                <InlineBigComponent
                    content = "AVATAR CUSTOMISATION (TBD)"
                    tbd = {true}
                />
            </ScrollView>
        );
    } else if (pageName == "social") {
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={styles.mainPage}>
                <UpperContents
                    content="none"
                />
                <Text style={styles.bigText}>Add Friend</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Friend's username"
                    returnKeyType="search"
                    clearButtonMode="while-editing"
                    onSubmitEditing={(event) => addElement(event.nativeEvent.text)}
                />
                <Text style={styles.bigText}>My Friends</Text>
                <FlatList
            keyExtractor = {item => item.id}  
            data={exampleState}
            renderItem = {item => (<Text>{item.item.text}</Text>)} />

            </ScrollView>
        );
    } else {
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={styles.mainPage}>
                <UpperContents
                    content="currency"
                />
                <Text style={styles.bigText}>Buy in-app currency</Text>
                <View style={styles.shopContainer}>
                    <View style={styles.shopFlex}>
                        <View style={styles.shopItem}><Text style={styles.shopItemText}>$1.00</Text></View>
                        <View style={styles.shopItem}><Text style={styles.shopItemText}>$2.00</Text></View>
                        <View style={styles.shopItem}><Text style={styles.shopItemText}>$5.00</Text></View>
                        <View style={styles.shopItem}><Text style={styles.shopItemText}>$10.00</Text></View>
                        <View style={styles.shopItem}><Text style={styles.shopItemText}>$20.00</Text></View>
                        <View style={styles.shopItem}><Text style={styles.shopItemText}>Custom</Text></View>
                    </View>
                    <View style={styles.premiumUpsellContainer}>
                        <Text style={styles.premiumTitle}>Premium</Text>
                        <Text style={styles.premiumLower}>No adverts, etc</Text>
                        <Text style={styles.premiumLower}>£X.XX per month, or{"\n"}$X.XX per month</Text>
                        <View style={styles.premiumButton}><Text style={styles.premiumButtonText}>Upgrade</Text></View>
                    </View>
                </View>
                <Text style={styles.bigText}>Avatar Accessories</Text>
                <InlineBigComponent
                    content = "AVATAR SHOP (TBD)"
                    tbd = {true}
                />
            </ScrollView>
        );
    }
};



export default VerticalPage;