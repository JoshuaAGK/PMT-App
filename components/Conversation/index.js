import React from 'react';
import { UseState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, Button } from 'react-native';
import styles from './styles';
import convo from './convo.json'

const CONVOLENGTH = Object.keys(convo).length


// const TEMPCONVO = [
//   {
//     "message-1620216745": {
//       "timestamp": 1620216745,
//       "sender": "you",
//       "contents": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
//     }
//   },
//   {
//     "message-1620216891": {
//       "timestamp": 1620216891,
//       "sender": "Gernot Liebchen",
//       "contents": "Etiam consequat eu mauris quis ultrices."
//     }
//   }
// ]

const TEMPCONVO = [
  {
    "message-1620216745": {
      "timestamp": 1620216745,
      "sender": "you",
      "contents": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    }
  }
]


class Conversation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      contents0: convo[Object.keys(convo)[0]]["contents"],
      sender0: convo[Object.keys(convo)[0]]["sender"],
      timestamp0: convo[Object.keys(convo)[0]]["timestamp"],
      contents1: convo[Object.keys(convo)[1]]["contents"],
      sender1: convo[Object.keys(convo)[1]]["sender"],
      timestamp1: convo[Object.keys(convo)[1]]["timestamp"]
    }
  }

  forceUpdateHandler() {
    this.forceUpdate();
  };

  render() {
    return (
      // <View style={styles.container}>
      //   <Message sender={this.state.sender0} contents={this.state.contents0} timestamp={this.state.timestamp0}/>
      //   <Message sender={this.state.sender1} contents={this.state.contents1} timestamp={this.state.timestamp1}/>
      // </View>
      <View style={styles.container}>
        {TEMPCONVO.map((message) => {
          var myObj = message[Object.keys(message)[0]]
          myObj = JSON.stringify(myObj)


          return (
            <Text>{myObj}</Text>
          );
      })}
      </View>
    );
  }
}

class Message extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.sender == "you") {
      return (
        <View style={styles.messageContainerMe}>
          <Text>{this.props.contents}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.messageContainerOther}>
          <Text>{this.props.contents}</Text>
        </View>
      );
    }
  }
}

export default Conversation;