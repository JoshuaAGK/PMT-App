import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import Advertisement from './components/Advertisement';
import Journal from './components/Journal';
import Account from './components/Account';
import Social from './components/Social';
import Shop from './components/Shop';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import capitalize from './utils/StringUtils';

String.prototype.capitalize = capitalize

const JOURNAL = "journal"
const ME = "me"
const SOCIAL = "social"
const SHOP = "shop"

function JournalScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Journal/>
      <Advertisement
        type="banner"
        content="ADVERTISEMENT"
      />
      <StatusBar style="auto" />
    </View>
  )
}

function AccountScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Account/>
      <Advertisement
        type="banner"
        content="ADVERTISEMENT"
      />
      <StatusBar style="auto" />
    </View>
  )
}

function SocialScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Social/>
      <Advertisement
        type="banner"
        content="ADVERTISEMENT"
      />
      <StatusBar style="auto" />
    </View>
  )
}

function ShopScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Shop/>
      <Advertisement
        type="banner"
        content="ADVERTISEMENT"
      />
      <StatusBar style="auto" />
    </View>
  )
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
                iconName = focused
                  ? 'book'
                  : 'book';
                break;
              case ME.capitalize():
                iconName = focused
                  ? 'person'
                  : 'person';
                break;
              case SOCIAL.capitalize():
                iconName = focused
                  ? 'people-alt'
                  : 'people-alt';
                break;
              case SHOP.capitalize():
                iconName = focused
                  ? 'shopping-cart'
                  : 'shopping-cart';
                break;
            }

            return (<MaterialIcons name={iconName} size={size} color={color} />);
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
  }
});