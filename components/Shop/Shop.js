import React from 'react';
import { Text, View, ScrollView, Pressable } from 'react-native';
import mainStyles from '../../styles/styles';
import shopStyles from './styles';
import InlineBigComponent from '../InlineBigComponent/InlineBigComponent';
import UpperContents from '../UpperContents/UpperContents';
import { becomePremium, leavePremium, incrementBalance } from '../../src/firebase/firestore/firestoreService';
import { useDispatch, useSelector } from 'react-redux';
import { addToBalance, setPremium } from '../../src/features/auth/authSlice';
import AvatarShop from '../AvatarShop'

export const Shop = (props) => {
  let dispatch = useDispatch();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={mainStyles.mainPage}
    >
      <UpperContents content="currency" />
      <Text style={mainStyles.bigText}>Buy in-app currency</Text>
      <View style={shopStyles.shopContainer}>
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
      <AvatarShop type="skintone" />
      <Text style={mainStyles.bigText}>Avatar Shirt</Text>
      <AvatarShop type="shirtcolour" />
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
