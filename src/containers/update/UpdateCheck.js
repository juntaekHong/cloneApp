/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {connect} from 'react-redux';
import {widthPercentageToDP} from '../../utils/util';
import {CenterView} from '../../components/common/Extra';
import navigators from '../../utils/navigators';
import {CommonActions} from '../../store/actionCreator';

const UpdateCheck = props => {
  const [location, setLocation] = useState();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({
          latitude,
          longitude,
        });
        CommonActions.myLocation(latitude, longitude);
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  return location ? (
    <>
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
              location.longitude,
              location.latitude,
              500,
            );
            props.navigation.navigate('home');
            await CommonActions.loadingAction(false);
          }}>
          <Text>홈 화면으로 이동</Text>
        </TouchableOpacity>
      </CenterView>
    </>
  ) : null;
};

export default connect(state => ({
  latitude: state.common.latitude,
  longitude: state.common.longitude,
  hospitalList: state.common.hospitalList,
}))(UpdateCheck);
