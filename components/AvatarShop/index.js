import React from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import styles from './styles';
import { decrementBalance } from '../../src/firebase/firestore/firestoreService';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromBalance } from '../../src/features/auth/authSlice';
import { current } from 'immer';

const SKINTONES = [
  require("../../assets/avatar_images/skintones/skin-lighter.png"),
  require("../../assets/avatar_images/skintones/skin-light.png"),
  require("../../assets/avatar_images/skintones/skin-mid.png"),
  require("../../assets/avatar_images/skintones/skin-dark.png"),
  require("../../assets/avatar_images/skintones/skin-darker.png"),
  require("../../assets/avatar_images/skintones/skin-gold.png")
]

const SHIRTCOLOURS = [
  require("../../assets/avatar_images/shirtcolours/shirt-crimson.png"),
  require("../../assets/avatar_images/shirtcolours/shirt-forestgreen.png"),
  require("../../assets/avatar_images/shirtcolours/shirt-blue.png"),
  require("../../assets/avatar_images/shirtcolours/shirt-skyblue.png"),
  require("../../assets/avatar_images/shirtcolours/shirt-darkorange.png"),
  require("../../assets/avatar_images/shirtcolours/shirt-gold.png")
]


// This is set up for a single premium skin & shirt but can be easily modified to allow for multiple different cosmetics if needed

var purchasedSkin = false
var purchasedShirt = false

class AvatarShop extends React.Component {
  constructor(props) {
    super(props)
    var beabs = []
    var price = 0
    this.handlePurchase = this.handlePurchase.bind(this);
    if (props.type == "skintone") {
      beabs = SKINTONES
      price = 2
    }
    if (props.type == "shirtcolour") {
      beabs = SHIRTCOLOURS
      price = 2
    }
    this.state = {
      chosenImage: beabs[5],
      price: price
    }
  }

  handlePurchase(item) {
    if (item == "skintone") {
      purchasedSkin = true
    }
    if (item == "shirtcolour") {
      purchasedShirt = true
    }
    this.forceUpdateHandler()
  }

  forceUpdateHandler() {
    this.forceUpdate();
  };

  render() {
    if (this.props.type == "skintone" && purchasedSkin ||
        this.props.type == "shirtcolour" && purchasedShirt) {
      return (
        <View style={styles.avatarShop}>
          <Text>Purchased!</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.avatarShop}>
          <ShopItem propFunction={this.handlePurchase} chosenImage={this.state.chosenImage} item={this.props.type} price={this.state.price} name={"Gold (₩" + this.state.price + ")"}/>
        </View>
      );
    }
  }
};


const ShopItem = (props) => {
  const dispatch = useDispatch();
  const balanceSelector = useSelector(state => state.auth);
  let currentBalance = balanceSelector.currentUser ? balanceSelector.currentUser.balance : 0;

  return (
    <View style={styles.mainContainer}>
      <Pressable
        style={styles.gridItem}
        onPress={ async () => {
          if (currentBalance >= props.price) {
            await decrementBalance(currentBalance, props.price);
            dispatch(removeFromBalance(props.price));
            props.propFunction(props.item)
          } else {
            alert("Insufficient funds! You need ₩" + (props.price - currentBalance) + " more.")
          }
          
          }
        }
      >
        <Image
          style={styles.itemImage}
          source={props.chosenImage}
        />
        <Text style={styles.gridItemText}>{props.name}</Text>
      </Pressable>
    </View>
  )
}

export default AvatarShop;
