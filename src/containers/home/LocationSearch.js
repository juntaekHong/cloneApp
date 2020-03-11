/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {TopView, TopContainerView} from '../../components/common/View';
import MapView, {Marker, Callout} from 'react-native-maps';
import {widthPercentageToDP} from '../../utils/util';
import {UIActivityIndicator} from 'react-native-indicators';
import {Img} from '../../components/common/Image';
import {NBGBText, NBGLText} from '../../components/common/Text';

const LocationSearch = props => {
  const [lat, setLat] = useState(props.navigation.state.params.y);
  const [long, setLong] = useState(props.navigation.state.params.x);
  const [address, setAddress] = useState(props.navigation.state.params.address);

  return (
    <TopContainerView>
      <TopView
        marginBottom={5}
        title={'위치 설정 확인'}
        backHandler={() => {
          props.navigation.goBack(null);
        }}
        closeBtn={false}
        searchBtn={false}
      />
      <MapView
        style={{
          width: widthPercentageToDP(375),
          height: widthPercentageToDP(207),
        }}
        initialRegion={{
          latitude: lat,
          longitude: long,
          latitudeDelta: 0.00121,
          longitudeDelta: 0.00121,
        }}>
        {/* <Marker
          coordinate={{
            latitude: lat,
            longitude: long,
          }}
        />
         */}
        <Marker
          coordinate={{
            latitude: lat,
            longitude: long,
          }}>
          <View
            style={{
              backgroundColor: 'transparent',
              alignItems: 'center',
            }}>
            <Img
              style={{backgroundColor: 'transparent'}}
              width={24}
              height={24}
              source={require('../../../assets/image/home/pin.png')}
            />
            <NBGBText fontSize={13}>설정 위치</NBGBText>
          </View>
          <Callout>
            <View
              style={{
                backgroundColor: 'white',
                width: widthPercentageToDP(120),
                height: widthPercentageToDP(30),
              }}>
              <NBGLText fontSize={13}>주소: {address}</NBGLText>
            </View>
          </Callout>
        </Marker>
      </MapView>
    </TopContainerView>
  );
};

export default LocationSearch;
