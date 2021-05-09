import React from 'react';
import { Text, View, Image, Pressable } from 'react-native';
import { getShirtColour, getSkinTone, setShirtColour, setSkinTone, getShirts, getSkins } from '../../src/firebase/firestore/firestoreService';
import styles from './styles';
import * as Constants from './avatar';
import mainStyles from '../../styles/styles';

class CustomiseAvatar extends React.Component {
    state = {
        skinTone: null,
        shirtColour: null,
        shirts: null
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
        );
        getShirts().then(
            shirts => {
                this.setState({shirts: shirts});
            }
        );
        getSkins().then(
            skins => {
                this.setState({skins: skins});
            }
        );
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
                <View style={[styles.myAvatar, mainStyles.minorShadow]}>
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

        let skinsContent;
        if (!this.state.skins) {
            skinsContent = (
                <Text>Loading...</Text>
            );
        } else {
            console.log(this.state.skins);
            skinsContent = this.state.skins.map((skin, index) => {
                return (
                    <AvatarItem propFunction={this.updateSkinTone} all={Constants.SKIN_TONES} value={skin} key={index}/>
                );
            });
        }

        let shirtsContent;
        if (!this.state.shirts) {
            shirtsContent = (
                <Text>Loading...</Text>
            );
        } else {
            shirtsContent = this.state.shirts.map((shirt, index) => {
                return (
                    <AvatarItem propFunction={this.updateShirtColour} all={Constants.SHIRT_COLOURS} value={shirt} key={index}/>
                );
            });
        }

        return (
            <View style={styles.customiseAvatar}>
                <View style={styles.avatarUpper}>
                    {avatarContent}
                </View>
                <View style={styles.avatarLower}>
                    <Text style={styles.itemHeader}>Skin tone</Text>
                    <View style={styles.itemGrid}>
                        {skinsContent}
                    </View>
                    <Text style={styles.itemHeader}>Shirt colour</Text>
                    <View style={styles.itemGrid}>
                        {shirtsContent}
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
          style={[styles.gridItem, mainStyles.minorShadow]}
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