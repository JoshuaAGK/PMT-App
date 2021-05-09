import React from 'react';
import { Text, ScrollView, View } from 'react-native';
import mainStyles from '../../styles/styles';
import Advertisement from '../../components/Advertisement';
import UpperContents from '../../components/UpperContents';
import CustomiseAvatar from '../../components/CustomiseAvatar';


export const Account = (props) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={mainStyles.mainPage}
    >
      <UpperContents content="logout" />

      { !props.premium &&
        <Advertisement type="inline" content="ADVERTISEMENT" />
      }
      <Text style={mainStyles.bigText}>Customise Avatar</Text>
      <View style={[mainStyles.platformShadow, mainStyles.lowestElementOnPageToGiveItABottomMarginBecauseAndroidIsWeirdAndDoesntLikeShadowsForSomeReason]}>
        <CustomiseAvatar />
      </View>
    </ScrollView>
  );
};

export default Account;
