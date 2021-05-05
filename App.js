import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Advertisement, Journal, Account, Social, Shop } from './components';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import capitalize from './utils/StringUtils';
import { createStackNavigator } from '@react-navigation/stack';
import { ChatPage } from './components/ChatPage/ChatPage'

String.prototype.capitalize = capitalize;

const JOURNAL = 'journal';
const ME = 'me';
const SOCIAL = 'social';
const SHOP = 'shop';

// Temporary solution
var tempVarNameOfFriend = "";

function setFriendName(x) {
  tempVarNameOfFriend = x
}

function JournalScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Journal />
      <Advertisement type="banner" content="ADVERTISEMENT" />
      <StatusBar style="auto" />
    </View>
  );
}

function AccountScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Account />
      <Advertisement type="banner" content="ADVERTISEMENT" />
      <StatusBar style="auto" />
    </View>
  );
}

const Stack = createStackNavigator();

function socialHomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Social nav={navigation} loadFriendData={setFriendName}/>
      <Advertisement type="banner" content="ADVERTISEMENT" />
      <StatusBar style="auto" />
    </View>
  );
}

function socialChatScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ChatPage friendName={tempVarNameOfFriend}/>
      <Advertisement type="banner" content="ADVERTISEMENT" />
      <StatusBar style="auto" />
    </View>
  );
}

function SocialScreen({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="socialHomeScreen"
      screenOptions={{
        headerShown: true
      }}
    >
      <Stack.Screen name="socialHomeScreen" options={{ title: "Social" }} component={socialHomeScreen} />
      <Stack.Screen name="socialChatScreen" options={{ title: tempVarNameOfFriend }} component={socialChatScreen} />
    </Stack.Navigator>
  );
}

function ShopScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Shop />
      <Advertisement type="banner" content="ADVERTISEMENT" />
      <StatusBar style="auto" />
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
              case JOURNAL.capitalize():
                iconName = focused ? 'book' : 'book';
                break;
              case ME.capitalize():
                iconName = focused ? 'person' : 'person';
                break;
              case SOCIAL.capitalize():
                iconName = focused ? 'people-alt' : 'people-alt';
                break;
              case SHOP.capitalize():
                iconName = focused ? 'shopping-cart' : 'shopping-cart';
                break;
            }

            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name={JOURNAL.capitalize()} component={JournalScreen} />
        <Tab.Screen name={ME.capitalize()} component={AccountScreen} />
        <Tab.Screen name={SOCIAL.capitalize()} component={SocialScreen} />
        <Tab.Screen name={SHOP.capitalize()} component={ShopScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
