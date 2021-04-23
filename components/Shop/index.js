import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, FlatList, Pressable } from 'react-native';
import mainStyles from '../../styles/styles';
import shopStyles from './styles';
import InlineBigComponent from '../InlineBigComponent';
import UpperContents from '../UpperContents';

export const Shop = (props) => {
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={mainStyles.mainPage}>
            <UpperContents
                content="currency"
            />
            <Text style={mainStyles.bigText}>Buy in-app currency</Text>
            <View style={shopStyles.shopContainer}>
                <View style={shopStyles.shopFlex}>
                    {/* <View style={styles.shopItem}><Text style={styles.shopItemText}>₩1.00</Text></View> */}
                    <PurchaseCurrency amount={1.0}/>
                    <PurchaseCurrency amount={2.0}/>
                    <PurchaseCurrency amount={5.0}/>
                    <PurchaseCurrency amount={10.0}/>
                    <PurchaseCurrency amount={20.0}/>
                    <PurchaseCurrency amount="Custom"/>
                    {/*<Pressable style={shopStyles.shopItem} onPress={() => alert("Thank you for purchasing ₩1.00 of in-app currency!")}>
                        <Text style={shopStyles.shopItemText}>₩1.00</Text>
                    </Pressable>
                
                    <Pressable style={shopStyles.shopItem} onPress={() => alert("Thank you for purchasing ₩2.00 of in-app currency!")}>
                        <Text style={shopStyles.shopItemText}>₩2.00</Text>
                    </Pressable>
                    <Pressable style={shopStyles.shopItem} onPress={() => alert("Thank you for purchasing ₩5.00 of in-app currency!")}>
                        <Text style={shopStyles.shopItemText}>₩5.00</Text>
                    </Pressable>
                    <Pressable style={shopStyles.shopItem} onPress={() => alert("Thank you for purchasing ₩10.00 of in-app currency!")}>
                        <Text style={shopStyles.shopItemText}>₩10.00</Text>
                    </Pressable>
                    <Pressable style={shopStyles.shopItem} onPress={() => alert("Thank you for purchasing ₩20.00 of in-app currency!")}>
                        <Text style={shopStyles.shopItemText}>₩20.00</Text>
                    </Pressable>
                    <Pressable style={shopStyles.shopItem} onPress={() => alert("Thank you for purchasing an indeterminate in-app currency!")}>
                        <Text style={shopStyles.shopItemText}>Custom</Text>
                    </Pressable>*/}
                </View>
                <View style={shopStyles.premiumUpsellContainer}>
                    <Text style={shopStyles.premiumTitle}>Premium</Text>
                    <Text style={shopStyles.premiumLower}>No adverts, etc</Text>
                    <Text style={shopStyles.premiumLower}>£X.XX per month, or{"\n"}₩X.XX per month</Text>
                    <Pressable style={shopStyles.premiumButton} onPress={() => alert("Thank you for upgrading! You are now a premium user.")}>
                        <Text style={shopStyles.premiumButtonText}>Upgrade</Text>
                    </Pressable>
                </View>
            </View>
            <Text style={mainStyles.bigText}>Avatar Accessories</Text>
            <InlineBigComponent
                content = "AVATAR SHOP (TBD)"
                tbd = {true}
            />
        </ScrollView>
    );
};

const PurchaseCurrency = (props) => {
    return (
            <Pressable style={shopStyles.shopItem} onPress={() => alert(`Thank you for purchasing ₩${props.amount} of in-app currency!`)}>
                <Text style={shopStyles.shopItemText}>₩{props.amount}</Text>
            </Pressable>
    );
}

export default Shop;