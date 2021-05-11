import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import styles from './styles';
import { decrementBalance, addSkin, addShirt, getShirts, getSkins } from '../../src/firebase/firestore/firestoreService';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromBalance } from '../../src/features/auth/authSlice';
import { current } from 'immer';
import mainStyles from '../../styles/styles';

function AvatarShop({ type, items, inventory }) {
    const [purchasedSkins, setPurchasedSkins] = useState([]);
    const [purchasedShirts, setPurchasedShirts] = useState([]);

    useEffect(() => {
        getShirts().then(shirts => {
            setPurchasedShirts([...shirts, ...purchasedSkins]);
        });
        getSkins().then(skins => {
            setPurchasedSkins([...skins, ...purchasedShirts]);
        });
    }, [setPurchasedSkins, setPurchasedShirts]);
    
    let shopItems = Object.entries(items).map(([itemKey, item], index) => {
        return (
            <ShopItem key={index} 
                purchased={(itemKey) => {
                    return purchasedSkins.includes(itemKey) || purchasedShirts.includes(itemKey);
                }}
                propFunction={(itemKey) => {
                    if (type == "skin") {
                        setPurchasedSkins([...purchasedSkins, itemKey]);
                        addSkin(itemKey);
                    } else if (type == "shirt") {
                        setPurchasedShirts([...purchasedShirts, itemKey]);
                        addShirt(itemKey);
                    }
                }} 
                image={item.image} 
                itemKey={itemKey} 
                price={item.price} 
                name={item.name + " (₩" + item.price + ")"}/>
        );
    });
    return (
        <View style={[styles.avatarShop, mainStyles.platformShadow]}>
            <View style={styles.itemGrid}>
                {shopItems}
            </View>
        </View>
    );
}

const ShopItem = (props) => {
  const dispatch = useDispatch();
  const balanceSelector = useSelector(state => state.auth);
  let currentBalance = balanceSelector.currentUser ? balanceSelector.currentUser.balance : 0;

  return (
      <View>
        <Pressable
            style={[styles.gridItem, mainStyles.minorShadow, props.purchased(props.itemKey) ? styles.purchased : null]}
            onPress={ async () => {
                    if (props.purchased(props.itemKey)) {
                        return;
                    }

                    if (currentBalance >= props.price) {
                        await decrementBalance(currentBalance, props.price);
                        dispatch(removeFromBalance(props.price));
                        props.propFunction(props.itemKey);
                    } else {
                        alert("Insufficient funds! You need ₩" + (props.price - currentBalance) + " more.")
                    }
                }
            }
        >
            <Image
            style={styles.itemImage}
            source={props.image}
            />
            <Text style={styles.gridItemText}>{props.name}</Text>
        </Pressable>
      </View>
  )
}

export default AvatarShop;
