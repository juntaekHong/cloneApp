/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {widthPercentageToDP} from '../../utils/util';
import {CenterView} from '../../components/common/Extra';
import navigators from '../../utils/navigators';

const UpdateCheck = props => {
  return (
    <CenterView>
      <Text>Version Check Page(로그인 페이지)</Text>
      <View style={{marginBottom: widthPercentageToDP(60)}} />
      <TouchableOpacity
        style={{
          margin: widthPercentageToDP(2),
          padding: widthPercentageToDP(5),
          borderWidth: widthPercentageToDP(2),
          borderRadius: widthPercentageToDP(6),
          borderColor: 'blue',
        }}
        onPress={() => {
          props.navigation.navigate('home');
        }}>
        <Text>홈 화면으로 이동</Text>
      </TouchableOpacity>
    </CenterView>
  );
};

export default UpdateCheck;
