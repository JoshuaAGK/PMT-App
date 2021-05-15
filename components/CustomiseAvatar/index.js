import React, { useState } from 'react';
import { Text, View, Image, Pressable } from 'react-native';
import { getShirtColour, getSkinTone, setShirtColour as setDBShirtColour, setSkinTone as setDBSkinTone, attachListenerAndDo } from '../../src/firebase/firestore/firestoreService';
import styles from './styles';
import * as Constants from './avatar';
import mainStyles from '../../styles/styles';
import { useSelector } from 'react-redux';

function CustomiseAvatar(props) {
    let authSelector = useSelector(state => state.auth);

    const [skinTone, setSkinTone] = useState();
    const [shirtColour, setShirtColour] = useState();

    const [skins, setSkins] = useState();
    const [shirts, setShirts] = useState();

    getSkinTone().then(
        skinTone => {
            setSkinTone(skinTone);
        }
    );
    getShirtColour().then(
        shirtColour => {
            setShirtColour(shirtColour);
        }
    );

    attachListenerAndDo(
        authSelector.currentUser?.uid,
        (documentSnapshot) => {
            let data = documentSnapshot.data();
            setShirts(data.shirts);
            setSkins(data.skins);
        },
        [authSelector]
        )
        .then(() => {})
        .catch((error) => alert(error));

    let avatarContent;

    if (!skinTone || !shirtColour) {
        avatarContent = (
            <Text>Loading...</Text>
        );
    } else {
        avatarContent = (
            <View style={[styles.myAvatar, mainStyles.minorShadow]}>
                <Image
                style={styles.myImage}
                source={Constants.SKIN_TONES[skinTone].image}
                />
                <Image
                style={styles.myImage}
                source={Constants.SHIRT_COLOURS[shirtColour].image}
                />
            </View>
        );
    }

    let skinsContent;
    if (!skins) {
        skinsContent = (
            <Text>Loading...</Text>
        );
    } else {
        skinsContent = skins.map((skin, index) => {
            return (
                <AvatarItem propFunction={(s) => {
                    setDBSkinTone(s);
                }} all={Constants.SKIN_TONES} value={skin} key={index}/>
            );
        });
    }

    let shirtsContent;
    if (!shirts) {
        shirtsContent = (
            <Text>Loading...</Text>
        );
    } else {
        shirtsContent = shirts.map((shirt, index) => {
            return (
                <AvatarItem propFunction={(s) => {
                    setDBShirtColour(s);
                }} all={Constants.SHIRT_COLOURS} value={shirt} key={index}/>
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
            this.props.propFunction(this.props.value);
          }}
        >
          <Image
            style={styles.itemImage}
            source={this.props.all[this.props.value].image}
          />
          <Text style={styles.gridItemText}>{this.props.all[this.props.value].name}</Text>
        </Pressable>
      </View>
    );
  }
}

export default CustomiseAvatar;