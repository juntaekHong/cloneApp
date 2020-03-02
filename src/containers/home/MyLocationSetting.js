/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import Styled from 'styled-components/native';
import {View, TouchableOpacity, Text} from 'react-native';
import {connect} from 'react-redux';
import {TopContainerView, TopView} from '../../components/common/View';
import {widthPercentageToDP} from '../../utils/util';
// 내 위치 정보 확인
import MapView, {Marker} from 'react-native-maps';

const Label = Styled.Text`
    font-size: 24px;
`;

const MyLocationSetting = props => {
  return (
    <TopContainerView>
      <TopView
        marginBottom={5}
        title={'My Location Setting Page'}
        backHandler={() => {
          props.navigation.goBack(null);
        }}
        closeBtn={true}
        closeHandler={() => {
          props.navigation.goBack(null);
        }}
      />
      {/* 지도 범위 뷰 작업중 */}
      <Text>위치 설정 페이지</Text>
      {props.latitude && props.longitude ? (
        <>
          <View
            style={{
              width: '100%',
              height: widthPercentageToDP(250),
            }}>
            <MapView
              style={{
                width: widthPercentageToDP(375),
                height: widthPercentageToDP(207),
              }}
              initialRegion={{
                latitude: parseFloat(props.latitude),
                longitude: parseFloat(props.longitude),
                latitudeDelta: 0.0121,
                longitudeDelta: 0.0121,
              }}>
              <Marker
                coordinate={{
                  latitude: parseFloat(props.latitude),
                  longitude: parseFloat(props.longitude),
                }}
              />
            </MapView>
          </View>
          <Label>Latitude: {parseFloat(props.latitude)}</Label>
          <Label>longtiude: {parseFloat(props.longitude)}</Label>
        </>
      ) : (
        <Label>Loading...</Label>
      )}
    </TopContainerView>
  );
};

export default connect(state => ({
  latitude: state.common.latitude,
  longitude: state.common.longitude,
  hospitalList: state.common.hospitalList,
}))(MyLocationSetting);
