import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import styles from './styles'
import Advertisement from '../Advertisement'
import InlineBigComponent from '../InlineBigComponent'
import UpperContents from '../UpperContents';

const VerticalPage = (props) => {

    const pageName = props.page

    if (pageName == "journal") {
        return (
            <ScrollView style={styles.mainPage}>
                <UpperContents/>
                <Text style={styles.bigText}>Journal</Text>
                <InlineBigComponent
                    content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin placerat euismod nisi, sed sollicitudin nisl volutpat id. Aenean vel felis urna. Nullam bibendum, est at commodo varius, ex mi tincidunt ex, nec semper ex lorem at odio. Mauris at turpis metus. Vestibulum augue urna, interdum vel iaculis auctor, ultrices eget quam. Praesent quam orci, luctus quis pulvinar ac, maximus ac metus. Donec maximus sapien ut odio hendrerit, vel tempor lorem tristique. Mauris tincidunt semper venenatis. Nam nec leo id elit luctus auctor id ac ante. Praesent luctus porttitor porta. Pellentesque quis magna ac nulla congue mattis a sed sem."
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
            <ScrollView style={styles.mainPage}>
                <Text style={styles.bigText}>How do you feel?</Text>
                <InlineBigComponent
                    content = "😢🙁😐🙂"
                />
                <Text style={styles.bigText}>Alarm</Text>
                <InlineBigComponent
                    content = "PLACEHOLDER ALARM ITEM"
                    tdb = {true}
                />
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
            <ScrollView style={styles.mainPage}>
                <Text style={styles.bigText}>Friends</Text>
                <InlineBigComponent
                    content = "Joe Bloggs"
                />
            </ScrollView>
        );
    } else {
        return (
            <ScrollView style={styles.mainPage}>
                <Text style={styles.bigText}>Buy in-app currency</Text>
                <InlineBigComponent
                    content = "PLACEHOLDER SHOP ITEM"
                    tbd = {true}
                />
                <Text style={styles.bigText}>Coupons</Text>
                <InlineBigComponent
                    content = "£1 Amazon Voucher\n10% Off Pizza\nFree Potato"
                />
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