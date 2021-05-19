import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { dateString } from '../../utils/StringUtils';
import styles from './styles';
import { signOutFirebase } from '../../src/firebase/firestore/firebaseService';
import { useSelector } from 'react-redux';
import { removePushNotificationToken } from '../../src/firebase/firestore/firestoreService';
import Icon from 'react-native-vector-icons/AntDesign';

function UpperContents(props) {
  const navigation = useNavigation();
  const auth = useSelector((state) => state.auth);
  const containerType = props.content;
  var streak = auth.currentUser ? auth.currentUser.streak : '0';

  let content = null;
  switch (containerType) {
    case 'logout':
      content = (
        <View style={styles.rightBox}>
          <Pressable
            style={styles.settingsCog}
            onPress={() => {
              navigation.navigate('Settings');
            }}
          >
            <Icon name="setting" size={30} color="#8E8E8F" />
          </Pressable>
          <Pressable
            style={styles.logout}
            onPress={async () => {
              await logOut(navigation, auth);
            }}
          >
            <Text style={styles.logoutText}>Log out</Text>
          </Pressable>
        </View>
      );
      break;
    case 'friends':
      content = (
        <View style={styles.rightBox}>
          <Text style={styles.rightInnerText}>Add Friends</Text>
        </View>
      );
      break;
    case 'currency':
      var currentBalance = auth.currentUser ? auth.currentUser.balance : '0';

      content = (
        <View styles={styles.rightBox}>
          <Pressable
            style={styles.currency}
            onPress={() => navigation.navigate('Shop')}
          >
            <Text style={styles.currencyText}>
              Joy Points: ₩{currentBalance}
            </Text>
          </Pressable>
        </View>
      );
      break;
  }

  return (
    <View style={styles.container}>
      <View style={{ alignSelf: 'center' }}>
        <Text style={styles.dateText}>
          {auth.currentUser ? auth.currentUser.displayName : null}
        </Text>
        <Text style={styles.dateText}>{dateString(new Date())}</Text>
        <Text style={styles.dateText}>Streak: {streak}</Text>
      </View>
      {content}
    </View>
  );
}

async function logOut(navigation, authSelector) {
  if (authSelector.pushNotificationToken) {
    await removePushNotificationToken(authSelector.pushNotificationToken);
  }
  await signOutFirebase();
  navigation.reset({ index: 0, routes: [{ name: 'Log In' }] });
}

export default UpperContents;
