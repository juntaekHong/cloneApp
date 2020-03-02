/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {connect} from 'react-redux';
import {widthPercentageToDP, getData} from '../../utils/util';
import {CenterView} from '../../components/common/Extra';
import navigators from '../../utils/navigators';
import {CommonActions} from '../../store/actionCreator';
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
  // 첫 위치 권한 허용 전, 위치정보 키라고 알림창(모달) 띄우기.
  const [alertModal, setAlertModal] = useState(false);

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

        await setAlertModal(true);
      } else {
        setLatitude(lat);
        setLongitude(long);

        CommonActions.handleLoading(false);
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
      <CenterView>
        {/* <CustomModal
          width={300}
          height={220}
          visible={alertModal}
          close={true}
          closeHandler={() => setAlertModal(false)}
          children={
            <View
              style={{
                marginLeft: widthPercentageToDP(20),
                marginRight: widthPercentageToDP(50),
              }}>
              <NBGBText fontSize={15}>
                {'GPS 키지 않으셨다면 켜고 재실행해야 주세요!'}
              </NBGBText>
            </View>
          }
          renderFooter={() => {
            return <View />;
          }}
        /> */}
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
            const promise2 = CommonActions.getMyAddress(long, lat);
            Promise.all([promise1, promise2]).then(async () => {
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
