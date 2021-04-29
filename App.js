import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { Advertisement, Journal, Account, Social, Shop, LogIn, Calendar } from './components';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { capitalize } from './utils/StringUtils';
import store from './src/features/store/store';

String.prototype.capitalize = capitalize;

const LOGIN = 'Log-In';
const JOURNAL = 'journal';
const ME = 'me';
const SOCIAL = 'social';
const SHOP = 'shop';

function LogInScreen({ navigation }) {
    return (
        <View stlye={styles.container}>
            <LogIn />
        </View>
    );
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

function SocialScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Social />
      <Advertisement type="banner" content="ADVERTISEMENT" />
      <StatusBar style="auto" />
    </View>
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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AppTabs() {
    return (
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
    );
}

const stackOptions = {
    headerShown: false
};

export default function App() {
  return (
    <Provider store={store}>
        <NavigationContainer>
            <Stack.Navigator>
                {/*<Stack.Screen name="Log In" component={LogIn}></Stack.Screen>*/}
                <Stack.Screen name="App" component={AppTabs} options={stackOptions} />
                <Stack.Screen name="Calendar" component={Calendar} options={stackOptions} />
            </Stack.Navigator>
        </NavigationContainer>
    </Provider>
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
