import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Advertisement from './components/Advertisement';
import VerticalPage from './components/VerticalPage';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { BottomNavigation, Text, Provider as PaperProvider } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const JournalRoute = () => <View style={styles.container}>
  <VerticalPage
    page = "journal"
  />

  <Advertisement
    type="banner"
    content="ADVERTISEMENT"
  />
  <StatusBar style="auto" />
</View>;

const MeRoute = () => <View style={styles.container}>
  <VerticalPage
    page = "me"
  />

  <Advertisement
    type="banner"
    content="ADVERTISEMENT"
  />
  <StatusBar style="auto" />
</View>;

const SocialRoute = () => <View style={styles.container}>
  <VerticalPage
    page = "social"
  />

  <Advertisement
    type="banner"
    content="ADVERTISEMENT"
  />
  <StatusBar style="auto" />
</View>;

const ShopRoute = () => <View style={styles.container}>
  <VerticalPage
    page = "shop"
  />

  <Advertisement
    type="banner"
    content="ADVERTISEMENT"
  />
  <StatusBar style="auto" />
</View>;

// const theme = {
//   ...DefaultTheme,
//   roundness: 2,
//   colors: {
//     ...DefaultTheme.colors,
//     primary: '#3498db',
//     accent: '#f1c40f',
//   },
// };

const MyComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'journal', title: 'Journal', icon: 'book' },
    { key: 'me', title: 'Me', icon:'person' },
    { key: 'social', title: 'Social', icon: 'people-alt' },
    { key: 'shop', title: 'Shop', icon: 'shopping-cart' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    journal: JournalRoute,
    me: MeRoute,
    social: SocialRoute,
    shop: ShopRoute,
  });

  return (
    <PaperProvider
      settings={{
        icon: props => <MaterialIcons {...props} />,
      }}
    >

      <BottomNavigation
        shifting = {false}
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />

    </PaperProvider>
  );
};

export default MyComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  topblock: {
    height: 100
  }
});