/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import Styled from 'styled-components/native';
import {View, TouchableOpacity, Text} from 'react-native';
import {TopContainerView, TopView} from '../../components/common/View';
import {widthPercentageToDP} from '../../utils/util';
// 내 위치 정보 확인
import Geolocation from '@react-native-community/geolocation';

const Label = Styled.Text`
    font-size: 24px;
`;

const MyLocationSetting = props => {
  const [location, setLocation] = useState();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({
          latitude,
          longitude,
        });
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  return (
    <TopContainerView>
      <TopView
        marginBottom={5}
        title={'My Location Setting Page'}
        backHandler={() => {
          props.navigation.goBack(null);
        }}
        closeHandler={() => {
          props.navigation.goBack(null);
        }}
      />
      {/* 지도 범위 뷰 작업중 */}
      <View
        style={{
          backgroundColor: 'red',
          width: '100%',
          height: widthPercentageToDP(250),
        }}
      />
      <Text>위치 설정 페이지</Text>
      {location ? (
        <>
          <Label>Latitude: {location.latitude}</Label>
          <Label>Latitude: {location.longitude}</Label>
        </>
      ) : (
        <Label>Loading...</Label>
      )}
    </TopContainerView>
  );
};

export default MyLocationSetting;
