import React, { useState } from 'react';
import { Text, View, ScrollView, Pressable } from 'react-native';
import mainStyles from '../../styles/styles';
import shopStyles from './styles';
import UpperContents from '../../components/UpperContents';
import { becomePremium, leavePremium, incrementBalance, getShirts } from '../../src/firebase/firestore/firestoreService';
import { useDispatch, useSelector } from 'react-redux';
import { addToBalance, setPremium } from '../../src/features/auth/authSlice';
import * as Constants from '../../components/CustomiseAvatar/avatar';
import AvatarShop from '../../components/AvatarShop'

export const Shop = (props) => {
    let dispatch = useDispatch();

    const [skinToneInventory, setSkinToneInventory] = useState(async () => {
        return await getShirts();
    });
    const [shirtInventory, setShirtInventory] = useState(async () => {
        return await getShirts();
    });

    let skinToneShop;
    if (skinToneInventory) {
        skinToneShop = (<AvatarShop items={Constants.SKIN_TONES} inventory={skinToneInventory} type="skin"/>);
    } else {
        skinToneShop = (<Text>Loading...</Text>);
    }

    let shirtShop;
    if (shirtInventory) {
        shirtShop = (<AvatarShop items={Constants.SHIRT_COLOURS} inventory={shirtInventory} type="shirt"/>);
    } else {
        shirtShop = (<Text>Loading...</Text>);
    }

    return (
        <ScrollView
        showsVerticalScrollIndicator={false}
        style={mainStyles.mainPage}
        >
        <UpperContents content="currency" />
        <Text style={mainStyles.bigText}>Buy in-app currency</Text>
        <View style={[shopStyles.shopContainer, mainStyles.platformShadow]}>
            <View style={shopStyles.shopFlex}>
            <PurchaseCurrency amount={1.0} />
            <PurchaseCurrency amount={2.0} />
            <PurchaseCurrency amount={5.0} />
            <PurchaseCurrency amount={10.0} />
            <PurchaseCurrency amount={20.0} />
            <PurchaseCurrency amount="Custom" />
            </View>
            <View style={shopStyles.premiumUpsellContainer}>
            <Text style={shopStyles.premiumTitle}>Premium</Text>
            <Text style={shopStyles.premiumLower}>No adverts, etc</Text>
            <Text style={shopStyles.premiumLower}>
                £X.XX per month, or{'\n'}₩X.XX per month
            </Text>
            <Pressable
                style={shopStyles.premiumButton}
                onPress={
                async () => {
                    if(!props.premium){
                    await becomePremium();
                    dispatch(setPremium(true));
                    alert('Thank you for upgrading! You are now a premium user.');
                    } else {
                    await leavePremium();
                    dispatch(setPremium(false));
                    alert('We\'re sorry to hear you go... You are no longer a premium member.');
                    }
                    
                }
                }
            >
                <Text style={shopStyles.premiumButtonText}>{props.premium ? 'Downgrade' : 'Upgrade'}</Text>
            </Pressable>
            </View>
        </View>
        <Text style={mainStyles.bigText}>Avatar Skin</Text>
        {skinToneShop}
        <Text style={mainStyles.bigText}>Avatar Shirt</Text>
        {shirtShop}
        </ScrollView>
    );
};

const PurchaseCurrency = (props) => {
  const dispatch = useDispatch();
  const balanceSelector = useSelector(state => state.auth);
  let currentBalance = balanceSelector.currentUser ? balanceSelector.currentUser.balance : 0;
  return (
    <Pressable
      style={shopStyles.shopItem}
      onPress={ async () => {
        await incrementBalance(currentBalance,props.amount);
        dispatch(addToBalance(props.amount));
        alert(`Thank you for purchasing ₩${props.amount} of in-app currency!`);
        }
      }
    >
      <Text style={shopStyles.shopItemText}>₩{props.amount}</Text>
    </Pressable>
  );
};

export default Shop;
