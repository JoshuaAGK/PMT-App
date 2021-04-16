import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import Advertisement from './components/Advertisement';
import VerticalPage from './components/VerticalPage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function JournalScreen({navigation}) {
  return (
<View style={styles.container}>
  <VerticalPage
    page = "journal"
  />

  <Advertisement
    type="banner"
    content="ADVERTISEMENT"
  />
  <StatusBar style="auto" />
</View>
  )
}

function MeScreen({navigation}) {
  return (
<View style={styles.container}>
  <VerticalPage
    page = "me"
  />

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
  <VerticalPage
    page = "social"
  />

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
  <VerticalPage
    page = "shop"
  />

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

            if (route.name === 'Journal') {
              iconName = focused
                ? 'book'
                : 'book';
            } else if (route.name === 'Me') {
              iconName = focused
                ? 'person'
                : 'person';
            } else if (route.name === 'Social') {
              iconName = focused
                ? 'people-alt'
                : 'people-alt';
            } else if (route.name === 'Shop') {
              iconName = focused
                ? 'shopping-cart'
                : 'shopping-cart';
            }

            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Journal" component={JournalScreen} />
        <Tab.Screen name="Me" component={MeScreen} />
        <Tab.Screen name="Social" component={SocialScreen} />
        <Tab.Screen name="Shop" component={ShopScreen} />
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