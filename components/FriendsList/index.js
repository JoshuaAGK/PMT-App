import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import styles from './styles';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

class FriendsList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.bigContainer}>
        <Pressable
          onPress={() => {
            this.props.nav.navigate('socialChatScreen')
            this.props.loadFriendData(this.props.listOfFriends[0].text)
          }}
        >
          <Text>{this.props.listOfFriends[0].text}</Text>
        </Pressable>
        
        <Pressable
          onPress={() => {
            this.props.nav.navigate('socialChatScreen')
            this.props.loadFriendData(this.props.listOfFriends[1].text)
          }}
        >
          <Text>{this.props.listOfFriends[1].text}</Text>
        </Pressable>
      </View>
    )
  }
}


export default FriendsList;

{/*

// import * as React from 'react';
// import { Button, View, Text } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ height: 100, width: '100%', backgroundColor: 'red' }}>
//       <Text>Home Screen</Text>
//       <Button
//         title="Go to Details"
//         onPress={() => navigation.navigate('Details')}
//       />
//     </View>
//   );
// }

// function DetailsScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Details Screen</Text>
//       <Button
//         title="Go to Details... again"
//         onPress={() => navigation.navigate('Details')}
//       />
//     </View>
//   );
// }

// const Stack = createStackNavigator();

// function App() {
//   return (
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="Details" component={DetailsScreen} />
//       </Stack.Navigator>
//   );
// }

// export default App;
*/}