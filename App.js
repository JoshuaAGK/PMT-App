import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, View, Button, LogBox, Pressable, Text} from 'react-native';
import {useAsync} from 'react-async';
import {Provider, useSelector} from 'react-redux';
import {Advertisement, Journal, Account, Social, Shop, LogIn, Calendar, Registration} from './components';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {capitalize} from './utils/StringUtils';
import {ChatPage} from './components/ChatPage/ChatPage';
import store from './src/features/store/store';
import Profile from './components/Profile/Profile';
import {Touchable} from 'react-native-web';

LogBox.ignoreLogs(['Setting a timer']);

String.prototype.capitalize = capitalize;

const LOGIN = 'Log-In';
const JOURNAL = 'journal';
const ME = 'me';
const SOCIAL = 'social';
const SHOP = 'shop';

// Temporary solution
var tempVarFriend = {displayName: 'N/A'};

function setFriend(x) {
    tempVarFriend = x;
}

function LogInScreen({navigation}) {
    return (
        <View stlye={styles.container}>
            <LogIn/>
        </View>
    );
}

function JournalScreen({navigation}) {
    let auth = useSelector(state => state.auth);
    let premiumStatus = auth.currentUser ? auth.currentUser.premium : false;
    return (
        <View style={styles.container}>
            <Journal premium={premiumStatus}/>
            {!premiumStatus &&
            <Advertisement type="banner" content="ADVERTISEMENT"/>
            }
            <StatusBar style="auto"/>
        </View>
    );
}

function AccountScreen({navigation}) {
    let auth = useSelector(state => state.auth);
    let premiumStatus = auth.currentUser ? auth.currentUser.premium : false;
    return (
        <View style={styles.container}>
            <Account premium={premiumStatus}/>
            {!premiumStatus &&
            <Advertisement type="banner" content="ADVERTISEMENT"/>
            }
            <StatusBar style="auto"/>
        </View>
    );
}

const Stack = createStackNavigator();

function socialHomeScreen({navigation}) {
    let auth = useSelector(state => state.auth);
    let premiumStatus = auth.currentUser ? auth.currentUser.premium : false;
    return (
        <View style={styles.container}>
            <Social nav={navigation} loadFriendData={setFriend}/>
            {!premiumStatus &&
            <Advertisement type="banner" content="ADVERTISEMENT"/>
            }
            <StatusBar style="auto"/>
        </View>
    );
}

function socialChatScreen({navigation}) {
    let auth = useSelector(state => state.auth);
    let premiumStatus = auth.currentUser ? auth.currentUser.premium : false;
    return (
        <View style={styles.container}>
            <ChatPage friend={tempVarFriend}/>
            {/*{!premiumStatus &&*/}
            {/*<Advertisement type="banner" content="ADVERTISEMENT"/>*/}
            {/*}*/}
            <StatusBar style="auto"/>
        </View>
    );
}

function socialProfileScreen({navigation}) {
    let auth = useSelector(state => state.auth);
    let premiumStatus = auth.currentUser ? auth.currentUser.premium : false;
    return (
        <View style={styles.container}>
            <Profile friend={tempVarFriend}/>
            {!premiumStatus &&
            <Advertisement type="banner" content="ADVERTISEMENT"/>
            }
            <StatusBar style="auto"/>
        </View>
    );
}

function SocialScreen({navigation}) {

    const button = (
        <Pressable onPress={() => { navigation.navigate('socialProfileScreen');}}
            style={styles.profileButton}>
            <Text>Profile</Text>
        </Pressable>
    );

    return (
        <Stack.Navigator
            initialRouteName="socialHomeScreen"
        >
            <Stack.Screen name="socialHomeScreen" options={{headerShown: false, title: 'Social'}}
                          component={socialHomeScreen}/>
            <Stack.Screen name="socialChatScreen" options={{
                headerShown: true,
                title: tempVarFriend.displayName,
                headerRight: () => (button),
                headerRightContainerStyle: {
                    marginTop: 5,
                    marginRight: 10,
                    padding: 5,
                    paddingHorizontal: 15,
                    height: "70%",
                    backgroundColor: '#eee',
                    borderRadius: 10,
                },
            }}
                          component={socialChatScreen}/>
            <Stack.Screen name="socialProfileScreen"
                          options={{headerShown: true, title: tempVarFriend.displayName + '\'s Profile'}}
                          component={socialProfileScreen}/>
        </Stack.Navigator>
    );
}

function ShopScreen({navigation}) {
    let auth = useSelector(state => state.auth);
    let premiumStatus = auth.currentUser ? auth.currentUser.premium : false;
    return (
        <View style={styles.container}>
            <Shop premium={premiumStatus}/>
            {!premiumStatus &&
            <Advertisement type="banner" content="ADVERTISEMENT"/>
            }
            <StatusBar style="auto"/>
        </View>
    );
}

const Tab = createBottomTabNavigator();

function AppTabs() {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
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

                    return <MaterialIcons name={iconName} size={size} color={color}/>;
                },
            })}
        >
            <Tab.Screen name={JOURNAL.capitalize()} component={JournalScreen}/>
            <Tab.Screen name={ME.capitalize()} component={AccountScreen}/>
            <Tab.Screen name={SOCIAL.capitalize()} component={SocialScreen}/>
            <Tab.Screen name={SHOP.capitalize()} component={ShopScreen}/>
        </Tab.Navigator>
    );
}

const stackOptions = {
    headerShown: false
};

function StackApp() {
    const auth = useSelector(state => state.auth);
    let loggedIn = false;
    if (auth.currentUser) {
        loggedIn = true;
    }
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {!loggedIn &&
                <Stack.Screen name="Log In" component={LogIn}/>}
                {!loggedIn &&
                <Stack.Screen name="Registration" component={Registration}/>}
                <Stack.Screen name="App" component={AppTabs} options={stackOptions}/>
                <Stack.Screen name="Calendar" component={Calendar} options={stackOptions}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default function App() {
    return (
        <Provider store={store}>
            <StackApp/>
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
