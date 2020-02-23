/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {connect} from 'react-redux';
import {widthPercentageToDP} from '../../utils/util';
import {CenterView} from '../../components/common/Extra';
import navigators from '../../utils/navigators';
import {CommonActions} from '../../store/actionCreator';

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
        onPress={async () => {
          await CommonActions.loadingAction(true);
          await CommonActions.getHospitalList(
            127.085156592737,
            37.4881325624879,
            500,
          );
          props.navigation.navigate('home');
          await CommonActions.loadingAction(false);
        }}>
        <Text>홈 화면으로 이동</Text>
      </TouchableOpacity>
    </CenterView>
  );
};

export default connect(state => ({
  hospitalList: state.common.hospitalList,
}))(UpdateCheck);
