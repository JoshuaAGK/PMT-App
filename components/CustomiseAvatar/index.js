import React from 'react';
import { UseState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, Button } from 'react-native';
import { addToBalance } from '../../src/features/auth/authSlice';
import { getShirtColour, getSkinTone, setShirtColour, setSkinTone } from '../../src/firebase/firestore/firestoreService';
import styles from './styles';

const SKIN_TONE = "skin_tone";
const LIGHTER = "lighter";
const LIGHT = "light";
const MID = "mid";
const DARK = "dark";
const DARKER = "darker";
const GOLD = "gold";
const SKIN_TONES = {};
SKIN_TONES[LIGHTER] = {
        name: "Lighter",
        image: require("../../assets/avatar_images/skintones/skin-lighter.png")
    };
SKIN_TONES[LIGHT] = {
        name: "Light",
        image: require("../../assets/avatar_images/skintones/skin-light.png")
    };
SKIN_TONES[MID] = {
        name: "Mid",
        image: require("../../assets/avatar_images/skintones/skin-mid.png")
    };
SKIN_TONES[DARK] = {
        name: "Dark",
        image: require("../../assets/avatar_images/skintones/skin-dark.png")
    };
SKIN_TONES[DARKER] = {
        name: "Darker",
        image: require("../../assets/avatar_images/skintones/skin-darker.png")
    };
SKIN_TONES[GOLD] = {
        name: "Gold",
        image: require("../../assets/avatar_images/skintones/skin-gold.png")
    };

const SHIRT_COLOUR = "shirt_colour";
const CRIMSON = "crimson";
const FOREST_GREEN = "forestGreen";
const BLUE = "blue";
const SKY_BLUE = "skyBlue";
const DARK_ORANGE = "darkOrange";
const SHIRT_COLOURS = {};
SHIRT_COLOURS[CRIMSON] = {
        name: "Crimson",
        image: require("../../assets/avatar_images/shirtcolours/shirt-crimson.png")
    };
SHIRT_COLOURS[FOREST_GREEN] = {
        name: "Forest Green",
        image: require("../../assets/avatar_images/shirtcolours/shirt-forestgreen.png")
    };
SHIRT_COLOURS[BLUE] = {
        name: "Blue",
        image: require("../../assets/avatar_images/shirtcolours/shirt-blue.png")
    };
SHIRT_COLOURS[SKY_BLUE] = {
        name: "Sky Blue",
        image: require("../../assets/avatar_images/shirtcolours/shirt-skyblue.png")
    };
SHIRT_COLOURS[DARK_ORANGE] = {
        name: "Dark Orange",
        image: require("../../assets/avatar_images/shirtcolours/shirt-darkorange.png")
    };
SHIRT_COLOURS[GOLD] = {
        name: "Gold",
        image: require("../../assets/avatar_images/shirtcolours/shirt-gold.png")
    };

class CustomiseAvatar extends React.Component {
    state = {
        skinTone: null,
        shirtColour: null
    };

    constructor(props) {
        super(props);
        this.updateSkinTone = this.updateSkinTone.bind(this);
        this.updateShirtColour = this.updateShirtColour.bind(this);
    }

    componentDidMount() {
        getSkinTone().then(
            skinTone => {
                console.log("SET SKIN TONE");
                this.setState({skinTone: skinTone});
            }
        );
        getShirtColour().then(
            shirtColour => {
                console.log("SET SHIRT COLOUR");
                this.setState({shirtColour: shirtColour});
            }
        )
    }

    updateSkinTone(value) {
        this.setState({skinTone: value});
        setSkinTone(value);
        this.forceUpdateHandler();
    }

    updateShirtColour(value) {
        this.setState({shirtColour: value});
        setShirtColour(value);
        this.forceUpdateHandler();
    }

    forceUpdateHandler() {
        this.forceUpdate();
    };

    render() {
        let avatarContent;
        console.log(this.state);

        if (!this.state.skinTone || !this.state.shirtColour) {
            avatarContent = (
                <Text>Loading...</Text>
            );
        } else {
            avatarContent = (
                <View style={styles.myAvatar}>
                    <Image
                    style={styles.myImage}
                    source={SKIN_TONES[this.state.skinTone].image}
                    />
                    <Image
                    style={styles.myImage}
                    source={SHIRT_COLOURS[this.state.shirtColour].image}
                    />
                </View>
            );
        }

        return (
        <View style={styles.customiseAvatar}>
            <View style={styles.avatarUpper}>
                {avatarContent}
            </View>
            <View style={styles.avatarLower}>
            <Text style={styles.itemHeader}>Skin tone</Text>
            <View style={styles.itemGrid}>
                <AvatarItem propFunction={this.updateSkinTone} all={SKIN_TONES} value={LIGHTER}/>
                <AvatarItem propFunction={this.updateSkinTone} all={SKIN_TONES} value={LIGHT}/>
                <AvatarItem propFunction={this.updateSkinTone} all={SKIN_TONES} value={MID}/>
                <AvatarItem propFunction={this.updateSkinTone} all={SKIN_TONES} value={DARK}/>
                <AvatarItem propFunction={this.updateSkinTone} all={SKIN_TONES} value={DARKER}/>
            </View>
            <Text style={styles.itemHeader}>Shirt colour</Text>
            <View style={styles.itemGrid}>
                <AvatarItem propFunction={this.updateShirtColour} all={SHIRT_COLOURS} value={CRIMSON}/>
                <AvatarItem propFunction={this.updateShirtColour} all={SHIRT_COLOURS} value={FOREST_GREEN}/>
                <AvatarItem propFunction={this.updateShirtColour} all={SHIRT_COLOURS} value={BLUE}/>
                <AvatarItem propFunction={this.updateShirtColour} all={SHIRT_COLOURS} value={SKY_BLUE}/>
                <AvatarItem propFunction={this.updateShirtColour} all={SHIRT_COLOURS} value={DARK_ORANGE}/>
            </View>
            </View>
        </View>
        );
    }
}

class AvatarItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Pressable
          style={styles.gridItem}
          onPress={() => {
            this.props.propFunction(this.props.value)
          }}
        >
          <Image
            style={styles.itemImage}
            source={this.props.all[this.props.value].image}
          />
          <Text style={styles.gridItemText}>{this.props.all[this.props.value].name}</Text>
        </Pressable>
      </View>
    )
  }
}

export default CustomiseAvatar;