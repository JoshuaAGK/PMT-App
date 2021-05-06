import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import convo from './convo.json';

class Conversation extends React.Component {
  constructor(props) {
    super(props);
  }

  forceUpdateHandler() {
    this.forceUpdate();
  }

  render() {
    return (
      <View style={styles.container}>
        {convo.map((message, index) => {
          var timestamp = message[Object.keys(message)[0]]['timestamp'];
          var sender = message[Object.keys(message)[0]]['sender'];
          var contents = message[Object.keys(message)[0]]['contents'];

          return (
            <Message key={index} sender={sender} contents={contents} timestamp={timestamp}/>
          );
      })}
      </View>
    );
  }
}

class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.sender == 'you') {
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