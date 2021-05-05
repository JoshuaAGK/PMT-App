import React from 'react';
import { UseState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, Button } from 'react-native';
import styles from './styles';

var userSkintone = 0
var userShirtcolour = 0

const SKINTONES = [
  require("../../assets/avatar_images/skintones/skin-lighter.png"),
  require("../../assets/avatar_images/skintones/skin-light.png"),
  require("../../assets/avatar_images/skintones/skin-mid.png"),
  require("../../assets/avatar_images/skintones/skin-dark.png"),
  require("../../assets/avatar_images/skintones/skin-darker.png")
]

const SHIRTCOLOURS = [
  require("../../assets/avatar_images/shirtcolours/shirt-crimson.png"),
  require("../../assets/avatar_images/shirtcolours/shirt-forestgreen.png"),
  require("../../assets/avatar_images/shirtcolours/shirt-blue.png"),
  require("../../assets/avatar_images/shirtcolours/shirt-skyblue.png"),
  require("../../assets/avatar_images/shirtcolours/shirt-darkorange.png"),
]

class CustomiseAvatar extends React.Component {
  constructor(props) {
    super(props)
    this.updateAvatar = this.updateAvatar.bind(this);
  }

  updateAvatar(property, value) {
    if (property == "skintone") {
      userSkintone = value
    }
    if (property == "shirtcolour") {
      userShirtcolour = value
    }
    this.forceUpdateHandler()
  }

  forceUpdateHandler() {
    this.forceUpdate();
  };

  render() {
    return (
      <View style={styles.customiseAvatar}>
        <View style={styles.avatarUpper}>
          <View style={styles.myAvatar}>
            <Image
              style={styles.myImage}
              source={SKINTONES[userSkintone]}
            />
            <Image
              style={styles.myImage}
              source={SHIRTCOLOURS[userShirtcolour]}
            />
          </View>
        </View>
        <View style={styles.avatarLower}>
          <Text style={styles.itemHeader}>Skin tone</Text>
          <View style={styles.itemGrid}>
            <AvatarItem propFunction={this.updateAvatar} value={0} property={"skintone"} name={"Lighter"}/>
            <AvatarItem propFunction={this.updateAvatar} value={1} property={"skintone"} name={"Light"}/>
            <AvatarItem propFunction={this.updateAvatar} value={2} property={"skintone"} name={"Mid"}/>
            <AvatarItem propFunction={this.updateAvatar} value={3} property={"skintone"} name={"Dark"}/>
            <AvatarItem propFunction={this.updateAvatar} value={4} property={"skintone"} name={"Darker"}/>
          </View>
          <Text style={styles.itemHeader}>Shirt colour</Text>
          <View style={styles.itemGrid}>
            <AvatarItem propFunction={this.updateAvatar} value={0} property={"shirtcolour"} name={"Crimson"}/>
            <AvatarItem propFunction={this.updateAvatar} value={1} property={"shirtcolour"} name={"Forest Green"}/>
            <AvatarItem propFunction={this.updateAvatar} value={2} property={"shirtcolour"} name={"Blue"}/>
            <AvatarItem propFunction={this.updateAvatar} value={3} property={"shirtcolour"} name={"Sky Blue"}/>
            <AvatarItem propFunction={this.updateAvatar} value={4} property={"shirtcolour"} name={"Dark Orange"}/>
          </View>
        </View>
      </View>
    );
  }
}

class AvatarItem extends React.Component {
  constructor(props) {
    super(props)
    var beabs = []
    if (props.property == "skintone") {
      beabs = SKINTONES
    }
    if (props.property == "shirtcolour") {
      beabs = SHIRTCOLOURS
    }
    this.state = {
      itemArray: beabs
    }
  }

  render() {
    return (
      <View>
        <Pressable
          style={styles.gridItem}
          onPress={() => {
            this.props.propFunction(this.props.property, this.props.value)
          }}
        >
          <Image
            style={styles.itemImage}
            source={this.state.itemArray[this.props.value]}
          />
          <Text style={styles.gridItemText}>{this.props.name}</Text>
        </Pressable>
      </View>
    )
  }
}

export default CustomiseAvatar;