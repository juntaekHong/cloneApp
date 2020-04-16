/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {connect} from 'react-redux';
import {widthPercentageToDP, getData, removeData} from '../../utils/util';
import {CenterView} from '../../components/common/Extra';
import navigators from '../../utils/navigators';
import {CommonActions, HospitalActions} from '../../store/actionCreator';
import {CustomModal} from '../../components/common/Modal';
import {BTN} from '../../components/common/View';
import {NBGBText, NBGText} from '../../components/common/Text';
import {UIActivityIndicator} from 'react-native-indicators';

const UpdateCheck = props => {
  // 초기 처음 사용시, 내 위치 설정
  const [location, setLocation] = useState();
  // 초기 내 위치 설정 이후 내 위치 불러오기
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [error, setError] = useState(null);

  useEffect(() => {
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
          await CommonActions.handleFirstScreenLoading(false);
          clearInterval(timeout);
        }, 1500);
      } else {
        setLatitude(lat);
        setLongitude(long);

        if (props.firstScreenLoading === false) {
          await props.navigation.navigate('root');
        } else {
          let timeout = setInterval(async () => {
            await CommonActions.getHospitalList(long, lat);
            await CommonActions.getMyAddress(long, lat);
            await CommonActions.handleFirstScreenLoading(false);
            await props.navigation.navigate('root');

            await HospitalActions.getAllHospitalSubscribers();

            clearInterval(timeout);
          }, 1500);
        }
      }
    });
  }, []);

  return location === undefined && latitude === null ? (
    <CenterView>
      {error !== null ? (
        <NBGText
          style={{
            width: widthPercentageToDP(350),
            textAlign: 'center',
          }}>
          {
            '서버 요청이 실패하였거나 위치설정을 위한\n GPS를 키지 않으셨습니다!\nGPS를 켜신 후에 재실행하여 주세요!\n 이 과정은 첫 위치 설정 시에만 보여집니다!'
          }
        </NBGText>
      ) : null}
    </CenterView>
  ) : (
    <>
      {props.firstScreenLoading === true &&
      (latitude !== null && longitude !== null) ? null : (
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
              const promise1 = CommonActions.getHospitalList(long, lat);
              const promise2 = CommonActions.getMyAddress(long, lat);
              Promise.all([promise1, promise2]).then(async () => {
                await props.navigation.navigate('root');
                await CommonActions.loadingAction(false);
                await HospitalActions.getAllHospitalSubscribers();
              });
            }}>
            <Text>홈 화면으로 이동</Text>
          </TouchableOpacity>
        </CenterView>
      )}
    </>
  );
};

export default connect(state => ({
  firstScreenLoading: state.common.firstScreenLoading,
  loading: state.common.loading,
  latitude: state.common.latitude,
  longitude: state.common.longitude,
  hospitalList: state.common.hospitalList,

  // user: state.signin.user,
}))(UpdateCheck);
