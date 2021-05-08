import React from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import styles from './styles';
import { decrementBalance, addSkin, addShirt } from '../../src/firebase/firestore/firestoreService';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromBalance } from '../../src/features/auth/authSlice';
import { current } from 'immer';

// This is set up for a single premium skin & shirt but can be easily modified to allow for multiple different cosmetics if needed

var purchasedSkin = false
var purchasedShirt = false

class AvatarShop extends React.Component {
  constructor(props) {
    super(props)
    this.handlePurchase = this.handlePurchase.bind(this);
    this.state = {
        type: props.type,
        items: props.items,
        inventory: props.inventory,
        purchased: []
    };
  }

  hasPurchased(itemKey) {
      return this.state.purchased.includes(itemKey);
  }

  handlePurchase(itemKey) {
    this.state.purchased.push(itemKey);
    if (this.state.type == "skin") {
        addSkin(itemKey);
    } else if (this.state.type == "shirt") {
        addShirt(itemKey);
    }
    this.forceUpdateHandler()
  }

  forceUpdateHandler() {
    this.forceUpdate();
  };

  render() {
    let shopItems = Object.entries(this.state.items).map(([itemKey, item], index) => {
        if (this.hasPurchased(itemKey)) {
            return (
                <Text key={index}>Purchased {item.name}!</Text>
            );
        } else {
            return (
                <ShopItem key={index} propFunction={this.handlePurchase} image={item.image} itemKey={itemKey} price={item.price} name={item.name + " (₩" + item.price + ")"}/>
            );
        }
    });

    return (
        <View style={styles.avatarShop}>
            <View style={styles.itemGrid}>
                {shopItems}
            </View>
        </View>
      );
  }
};


const ShopItem = (props) => {
  const dispatch = useDispatch();
  const balanceSelector = useSelector(state => state.auth);
  let currentBalance = balanceSelector.currentUser ? balanceSelector.currentUser.balance : 0;

  return (
      <View styles={styles.mainContainer}>
        <Pressable
            style={styles.gridItem}
            onPress={ async () => {
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
