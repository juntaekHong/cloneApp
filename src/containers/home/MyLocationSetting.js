/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import Styled from 'styled-components/native';
import {View, TouchableOpacity, Text} from 'react-native';
import {connect} from 'react-redux';
import {TopContainerView, TopView} from '../../components/common/View';
import {widthPercentageToDP} from '../../utils/util';
// 내 위치 정보 확인
import MapView, {Marker} from 'react-native-maps';
import {SearchView} from '../../components/myLocationSetting/View';

const MyLocationSetting = props => {
  return (
    <TopContainerView>
      <TopView
        marginBottom={5}
        title={'위치 설정'}
        backHandler={() => {
          props.navigation.goBack(null);
        }}
        closeBtn={false}
        closeHandler={() => {
          props.navigation.goBack(null);
        }}
      />
      <SearchView marginTop={10} />
      {props.search_address !== [] ? <Text>Success</Text> : null}
    </TopContainerView>
  );
};

export default connect(state => ({
  address: state.common.address,
  latitude: state.common.latitude,
  longitude: state.common.longitude,
  hospitalList: state.common.hospitalList,

  // Test
  search_address: state.location.search_address,
}))(MyLocationSetting);
