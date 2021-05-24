import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, LogBox, Pressable, Text, Alert } from 'react-native';
import { Provider, useSelector } from 'react-redux';
import { Account, ChatPage, Journal, Shop, Friends, Groups, GroupChatPage } from './pages';
import { Advertisement, LogIn, Calendar, Registration, Settings } from './components';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { capitalize } from './utils/StringUtils';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import store from './src/features/store/store';
import Profile from './components/Profile';
import * as Notifications from 'expo-notifications';
import * as Updates from 'expo-updates';
import GroupInfo from './components/GroupInfo';
import PublicProfile from './components/PublicProfile';

LogBox.ignoreLogs(['Setting a timer']);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const announceUpdate = () => {
  Alert.alert(
    'New update available!',
    'A newer version of the app is available and is ready to be launched. Would you like to launch it now?',
    [
      {
        text: 'No',
      },
      {
        text: 'Yes',
        onPress: () => {
          Updates.reloadAsync();
        },
      },
    ],
    { cancelable: false }
  );
};

Updates.addListener((eventListener) => {
  if (eventListener.type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
    announceUpdate();
  }
});

String.prototype.capitalize = capitalize;

const LOGIN = 'Log-In';
const JOURNAL = 'journal';
const ME = 'me';
const PUBLIC = 'groups';
const FRIENDS = 'friends';
const SHOP = 'shop';

// Temporary solution
var tempVarFriend = { displayName: 'N/A' };
function setFriend(x) {
  tempVarFriend = x;
}

var tempVarGroup = { name: 'N/A' };
function setGroup(x) {
  tempVarGroup = x;
}

var tempVarPublicUser = { displayName: 'N/A' };
function setPublicUser(x) {
  tempVarPublicUser = x;
}

function LogInScreen({ navigation }) {
  return (
    <View stlye={styles.container}>
      <LogIn />
    </View>
  );
}

function JournalScreen({ navigation }) {
  let auth = useSelector((state) => state.auth);
  let premiumStatus = auth.currentUser ? auth.currentUser.premium : false;
  return (
    <View style={styles.container}>
      <Journal premium={premiumStatus} />
      {!premiumStatus && (
        <Advertisement type="banner" content="ADVERTISEMENT" />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

function AccountScreen({ navigation }) {
  let auth = useSelector((state) => state.auth);
  let premiumStatus = auth.currentUser ? auth.currentUser.premium : false;
  return (
    <View style={styles.container}>
      <Account premium={premiumStatus} />
      {!premiumStatus && (
        <Advertisement type="banner" content="ADVERTISEMENT" />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

function GroupsHomeScreen({ navigation }) {
  let auth = useSelector((state) => state.auth);
  let premiumStatus = auth.currentUser ? auth.currentUser.premium : false;
  return (
    <View style={styles.container}>
      <Groups
        nav={navigation}
        premium={premiumStatus} loadGroupData={setGroup}/>
      {!premiumStatus && (
        <Advertisement type="banner" content="ADVERTISEMENT" />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

function groupsChatScreen({ navigation }) {
  const viewProfile = (user) => {
    setPublicUser(user);
    navigation.navigate('groupMemberProfile');
  };
  return (
    <View style={styles.container}>
      <GroupChatPage viewProfile={viewProfile} group={tempVarGroup}/>
      <StatusBar style="auto" />
    </View>
  );
}

function groupsInfoScreen({ navigation }) {
  const viewProfile = (user) => {
    setPublicUser(user);
    navigation.navigate('groupMemberProfile');
  };
  return (
    <View style={styles.container}>
      <GroupInfo viewProfile={viewProfile} group={tempVarGroup}/>
      <StatusBar style="auto" />
    </View>
  );
}

function groupMemberProfile({ navigation }) {

  return (
    <View style={styles.container}>
      <PublicProfile user={tempVarPublicUser}/>
      <StatusBar style="auto" />
    </View>
  );
}

function GroupsScreen({ navigation }) {
  const button = (
    <Pressable
      onPress={() => {
        navigation.navigate('groupsInfoScreen');
      }}
      style={styles.profileButton}
    >
      <Text>Info</Text>
    </Pressable>
  );

  return (
    <Stack.Navigator initialRouteName="groupsHomeScreen">
      <Stack.Screen
        name="groupsHomeScreen"
        options={{ headerShown: false, title: 'Groups' }}
        component={GroupsHomeScreen}
      />
      <Stack.Screen
        name="groupsChatScreen"
        options={{
          headerShown: true,
          title: tempVarGroup.name,
          headerRight: () => button,
          headerRightContainerStyle: {
            marginTop: 5,
            marginRight: 10,
            padding: 5,
            paddingHorizontal: 15,
            height: '70%',
            backgroundColor: '#eee',
            borderRadius: 10,
          },
        }}
        component={groupsChatScreen}
      />
      <Stack.Screen
        name="groupsInfoScreen"
        options={{
          headerShown: true,
          title: tempVarGroup.name + '\'s Info',
        }}
        component={groupsInfoScreen}
      />
      <Stack.Screen
        name="groupMemberProfile"
        options={{
          headerShown: true,
          title: tempVarPublicUser.displayName + '\'s Profile',
        }}
        component={groupMemberProfile}
      />
    </Stack.Navigator>
  );
}

const Stack = createStackNavigator();

function socialHomeScreen({ navigation }) {
  let auth = useSelector((state) => state.auth);
  let premiumStatus = auth.currentUser ? auth.currentUser.premium : false;
  return (
    <View style={styles.container}>
      <Friends nav={navigation} loadFriendData={setFriend} />
      {!premiumStatus && (
        <Advertisement type="banner" content="ADVERTISEMENT" />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

function socialChatScreen({ navigation }) {
  let auth = useSelector((state) => state.auth);
  let premiumStatus = auth.currentUser ? auth.currentUser.premium : false;
  return (
    <View style={styles.container}>
      <ChatPage friend={tempVarFriend} />
      <StatusBar style="auto" />
    </View>
  );
}

function socialProfileScreen({ navigation }) {
  let auth = useSelector((state) => state.auth);
  let premiumStatus = auth.currentUser ? auth.currentUser.premium : false;
  return (
    <View style={styles.container}>
      <Profile friend={tempVarFriend} />
      {!premiumStatus && (
        <Advertisement type="banner" content="ADVERTISEMENT" />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

function SocialScreen({ navigation }) {
  const button = (
    <Pressable
      onPress={() => {
        navigation.navigate('socialProfileScreen');
      }}
      style={styles.profileButton}
    >
      <Text>Profile</Text>
    </Pressable>
  );

  return (
    <Stack.Navigator initialRouteName="socialHomeScreen">
      <Stack.Screen
        name="socialHomeScreen"
        options={{ headerShown: false, title: 'Social' }}
        component={socialHomeScreen}
      />
      <Stack.Screen
        name="socialChatScreen"
        options={{
          headerShown: true,
          title: tempVarFriend.displayName,
          headerRight: () => button,
          headerRightContainerStyle: {
            marginTop: 5,
            marginRight: 10,
            padding: 5,
            paddingHorizontal: 15,
            height: '70%',
            backgroundColor: '#eee',
            borderRadius: 10,
          },
        }}
        component={socialChatScreen}
      />
      <Stack.Screen
        name="socialProfileScreen"
        options={{
          headerShown: true,
          title: tempVarFriend.displayName + '\'s Profile',
        }}
        component={socialProfileScreen}
      />
    </Stack.Navigator>
  );
}

function ShopScreen({ navigation }) {
  let auth = useSelector((state) => state.auth);
  let premiumStatus = auth.currentUser ? auth.currentUser.premium : false;
  return (
    <View style={styles.container}>
      <Shop premium={premiumStatus} />
      {!premiumStatus && (
        <Advertisement type="banner" content="ADVERTISEMENT" />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

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
            case FRIENDS.capitalize():
              iconName = focused ? 'people-alt' : 'people-alt';
              break;
            case PUBLIC.capitalize():
              iconName = focused ? 'public' : 'public';
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
      <Tab.Screen name={PUBLIC.capitalize()} component={GroupsScreen} />
      <Tab.Screen name={FRIENDS.capitalize()} component={SocialScreen} />
      <Tab.Screen name={SHOP.capitalize()} component={ShopScreen} />
    </Tab.Navigator>
  );
}

const stackOptions = {
  headerShown: false,
};

function StackApp() {
  const auth = useSelector((state) => state.auth);
  let loggedIn = false;
  if (auth.currentUser) {
    loggedIn = true;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!loggedIn && <Stack.Screen name="Log In" component={LogIn} />}
        {!loggedIn && (
          <Stack.Screen name="Registration" component={Registration} />
        )}
        <Stack.Screen
          name="Journal"
          component={AppTabs}
          options={stackOptions}
        />
        <Stack.Screen name="Calendar" component={Calendar} />
        {/* TODO: Make GDPR Page */}
        <Stack.Screen name="Settings" component={Settings} />
        {/* any personal data will be processed and stored in strict accordance with UK GDPR guidelines, if you have any concerns or questions with regards to this survey, please email (@data protection officer) (example@email.com) and we will attempt to resolve them. */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <StackApp />
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
