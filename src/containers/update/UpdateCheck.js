/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {connect} from 'react-redux';
import {widthPercentageToDP, getData} from '../../utils/util';
import {CenterView} from '../../components/common/Extra';
import navigators from '../../utils/navigators';
import {CommonActions} from '../../store/actionCreator';

const UpdateCheck = props => {
  // 초기 처음 사용시, 내 위치 설정
  const [location, setLocation] = useState(null);
  // 초기 내 위치 설정 이후 내 위치 불러오기
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [error, setError] = useState(null);

  useEffect(() => {
    CommonActions.handleLoading(true);

    const promise1 = CommonActions.locationInit();

    Promise.all([promise1]).then(async () => {
      const lat = await getData('location_lat');
      const long = await getData('location_long');

      if (lat === null || long === null) {
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
            setError(error.message);
          },
          // enableHighAccuracy: true 시, 실제 디바이스에서 내 위치 설정 요청 오류남.
          {enableHighAccuracy: false, timeout: 10000, maximumAge: 10000},
        );
        let timeout = setInterval(async () => {
          await CommonActions.handleLoading(false);
          clearInterval(timeout);
        }, 1000);
      } else {
        setLatitude(lat);
        setLongitude(long);

        CommonActions.handleLoading(false);
      }
    });
  }, []);

  return latitude === null && location === null ? null : (
    <>
      <CenterView>
        <Text>Version Check Page</Text>
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
            const long = longitude === null ? location.longitude : longitude;
            const lat = latitude === null ? location.latitude : latitude;

            await CommonActions.loadingAction(true);
            const promise1 = CommonActions.getHospitalList(long, lat, 500);
            Promise.all([promise1]).then(async () => {
              props.navigation.navigate('home');
              await CommonActions.loadingAction(false);
            });
          }}>
          <Text>홈 화면으로 이동</Text>
        </TouchableOpacity>
      </CenterView>
    </>
  );
};

export default connect(state => ({
  loading: state.common.loading,
  latitude: state.common.latitude,
  longitude: state.common.longitude,
  hospitalList: state.common.hospitalList,
}))(UpdateCheck);
