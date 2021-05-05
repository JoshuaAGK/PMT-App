import React, { useState } from 'react';
import { Text, View, ScrollView, TextInput, FlatList } from 'react-native';
import mainStyles from '../../styles/styles';
import socialStyles from './styles';
import UpperContents from '../UpperContents/UpperContents';
import FriendsList from '../FriendsList'
import InlineBigComponent from '../InlineBigComponent/InlineBigComponent'

var listOfFriends = [
  { id: '0', text: 'Joe Bloggs' },
  { id: '1', text: 'Gernot Liebchen' },
  { id: '2', text: 'Firstname Lastname' },
  { id: '3', text: 'This is just an example name' },
  { id: '4', text: 'Yeet' },
  { id: '5', text: 'General Kenobi' },
];


class Social extends React.Component {
  constructor(props) {
    super(props)

    var sugma = this.props.test

    this.state = {
      listOfFriends: listOfFriends,
      aidsass: sugma
    }
  }

  

  render() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={mainStyles.mainPage}
      >
        <UpperContents content="none" />
        <Text style={mainStyles.bigText}>Add Friend</Text>
        <TextInput
          style={mainStyles.textInput}
          placeholder="Friend's username"
          returnKeyType="search"
          clearButtonMode="while-editing"
          onSubmitEditing={(event) => addElement(event.nativeEvent.text)}
        />
        <Text style={mainStyles.bigText}>My Friends</Text>

        <FriendsList listOfFriends={this.state.listOfFriends} nav={this.props.nav} loadFriendData={this.props.loadFriendData} />
      </ScrollView>
    );
  }
};

export default Social;
