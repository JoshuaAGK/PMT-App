import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  Pressable,
  Modal,
  TextInput,
} from 'react-native';
import mainStyles from '../../styles/styles';
import modalStyles from '../../styles/modalStyles';
import shopStyles from './styles';
import UpperContents from '../../components/UpperContents';
import {
  becomePremium,
  leavePremium,
  incrementBalance,
  getShirts,
} from '../../src/firebase/firestore/firestoreService';
import { useDispatch, useSelector } from 'react-redux';
import { addToBalance, setPremium } from '../../src/features/auth/authSlice';
import * as Constants from '../../components/CustomiseAvatar/avatar';
import AvatarShop from '../../components/AvatarShop';

export const Shop = (props) => {
  let dispatch = useDispatch();

  const [skinToneInventory, setSkinToneInventory] = useState(async () => {
    return await getShirts();
  });
  const [shirtInventory, setShirtInventory] = useState(async () => {
    return await getShirts();
  });

  const [modalVisible, setModalVisible] = useState(false);

  let skinToneShop;
  if (skinToneInventory) {
    skinToneShop = (
      <AvatarShop
        items={Constants.SKIN_TONES}
        inventory={skinToneInventory}
        type="skin"
      />
    );
  } else {
    skinToneShop = <Text>Loading...</Text>;
  }

  let shirtShop;
  if (shirtInventory) {
    shirtShop = (
      <AvatarShop
        items={Constants.SHIRT_COLOURS}
        inventory={shirtInventory}
        type="shirt"
      />
    );
  } else {
    shirtShop = <Text>Loading...</Text>;
  }

  return (
    <ScrollView
      keyboardShouldPersistTaps={'handled'}
      showsVerticalScrollIndicator={false}
      style={mainStyles.mainPage}
    >
      <UpperContents content="currency" />
      <Text style={mainStyles.bigText}>Buy in-app currency</Text>
      <View style={[shopStyles.shopContainer, mainStyles.platformShadow]}>
        <View style={shopStyles.shopFlex}>
          <PurchaseCurrency amount={100.0} />
          <PurchaseCurrency amount={200.0} />
          <PurchaseCurrency amount={500.0} />
          <PurchaseCurrency amount={1000.0} />
          <PurchaseCurrency amount={2000.0} />
          <PurchaseCurrency
            amount="Custom"
            type="custom"
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        </View>
        <View style={shopStyles.premiumUpsellContainer}>
          <Text style={shopStyles.premiumTitle}>Premium</Text>
          <Text style={shopStyles.premiumLower}>No adverts, etc</Text>
          <Text style={shopStyles.premiumLower}>
            £X.XX per month, or{'\n'}₩X.XX per month
          </Text>
          <Pressable
            style={shopStyles.premiumButton}
            onPress={async () => {
              if (!props.premium) {
                await becomePremium();
                dispatch(setPremium(true));
                alert('Thank you for upgrading! You are now a premium user.');
              } else {
                await leavePremium();
                dispatch(setPremium(false));
                alert(
                  'We\'re sorry to hear you go... You are no longer a premium member.'
                );
              }
            }}
          >
            <Text style={shopStyles.premiumButtonText}>
              {props.premium ? 'Downgrade' : 'Upgrade'}
            </Text>
          </Pressable>
        </View>
      </View>
      <Text style={mainStyles.bigText}>Avatar Skin</Text>
      {skinToneShop}
      <Text style={mainStyles.bigText}>Avatar Shirt</Text>
      {shirtShop}
      <CustomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </ScrollView>
  );
};

const PurchaseCurrency = (props) => {
  const dispatch = useDispatch();
  const balanceSelector = useSelector((state) => state.auth);
  let currentBalance = balanceSelector.currentUser
    ? balanceSelector.currentUser.balance
    : 0;
  return (
    <Pressable
      style={shopStyles.shopItem}
      onPress={async () => {
        if (props.type === 'custom') {
          props.setModalVisible(true);
        } else {
          await dispatchPurchaseCurrency(props, currentBalance, dispatch);
        }
      }}
    >
      {props.type !== 'custom' ? (
        <Text style={shopStyles.shopItemText}>₩{props.amount}</Text>
      ) : (
        <Text style={shopStyles.shopItemText}>₩Custom</Text>
      )}
    </Pressable>
  );
};

const dispatchPurchaseCurrency = async (props, currentBalance, dispatch) => {
  await incrementBalance(currentBalance, props.amount);
  dispatch(addToBalance(props.amount));
  alert(`Thank you for purchasing ₩${props.amount} of in-app currency!`);
};

const CustomModal = (props) => {
  let sendAmount;

  const [customAmount, changeCustomAmount] = useState('');
  const dispatch = useDispatch();
  const balanceSelector = useSelector((state) => state.auth);
  let currentBalance = balanceSelector.currentUser
    ? balanceSelector.currentUser.balance
    : 0;

  return (
    <View style={modalStyles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
          props.setModalVisible(!props.modalVisible);
        }}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <TextInput
              keyboardType="numeric"
              style={modalStyles.inputBox}
              maxLength={4}
              placeholder={'Enter an custom amount...'}
              onChangeText={changeCustomAmount}
              value={customAmount.toString()}
              textAlign={'center'}
              ref={(input) => {
                sendAmount = input;
              }}
            />

            <View style={modalStyles.buttonCentered}>
              <Pressable
                style={[modalStyles.button, modalStyles.buttonClose]}
                onPress={() => {
                  props.setModalVisible(!props.modalVisible);
                }}
              >
                <Text style={modalStyles.textStyle}>Cancel</Text>
              </Pressable>

              <Pressable
                style={[modalStyles.button, modalStyles.buttonOpen]}
                onPress={() => {
                  props.setModalVisible(!props.modalVisible);
                  sendAmount.blur();
                  sendAmount.clear();
                  changeCustomAmount(0);
                  const regex = /^[0-9]{1,4}$/.test(customAmount);
                  if (regex) {
                    if (parseInt(customAmount) === 0) {
                      return;
                    }
                    dispatchPurchaseCurrency(
                      { amount: parseInt(customAmount) },
                      currentBalance,
                      dispatch
                    );
                    changeCustomAmount('');
                  }
                }}
              >
                <Text style={modalStyles.textStyle}>
                  Buy {customAmount} joy points
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Shop;
