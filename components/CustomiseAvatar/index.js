import React from 'react';
import { Text, View, Image, Pressable } from 'react-native';
import { getShirtColour, getSkinTone, setShirtColour, setSkinTone } from '../../src/firebase/firestore/firestoreService';
import styles from './styles';
import * as Constants from './avatar';

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
                this.setState({skinTone: skinTone});
            }
        );
        getShirtColour().then(
            shirtColour => {
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

        if (!this.state.skinTone || !this.state.shirtColour) {
            avatarContent = (
                <Text>Loading...</Text>
            );
        } else {
            avatarContent = (
                <View style={styles.myAvatar}>
                    <Image
                    style={styles.myImage}
                    source={Constants.SKIN_TONES[this.state.skinTone].image}
                    />
                    <Image
                    style={styles.myImage}
                    source={Constants.SHIRT_COLOURS[this.state.shirtColour].image}
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
                <AvatarItem propFunction={this.updateSkinTone} all={Constants.SKIN_TONES} value={Constants.LIGHTER}/>
                <AvatarItem propFunction={this.updateSkinTone} all={Constants.SKIN_TONES} value={Constants.LIGHT}/>
                <AvatarItem propFunction={this.updateSkinTone} all={Constants.SKIN_TONES} value={Constants.MID}/>
                <AvatarItem propFunction={this.updateSkinTone} all={Constants.SKIN_TONES} value={Constants.DARK}/>
                <AvatarItem propFunction={this.updateSkinTone} all={Constants.SKIN_TONES} value={Constants.DARKER}/>
            </View>
            <Text style={styles.itemHeader}>Shirt colour</Text>
            <View style={styles.itemGrid}>
                <AvatarItem propFunction={this.updateShirtColour} all={Constants.SHIRT_COLOURS} value={Constants.CRIMSON}/>
                <AvatarItem propFunction={this.updateShirtColour} all={Constants.SHIRT_COLOURS} value={Constants.FOREST_GREEN}/>
                <AvatarItem propFunction={this.updateShirtColour} all={Constants.SHIRT_COLOURS} value={Constants.BLUE}/>
                <AvatarItem propFunction={this.updateShirtColour} all={Constants.SHIRT_COLOURS} value={Constants.SKY_BLUE}/>
                <AvatarItem propFunction={this.updateShirtColour} all={Constants.SHIRT_COLOURS} value={Constants.DARK_ORANGE}/>
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