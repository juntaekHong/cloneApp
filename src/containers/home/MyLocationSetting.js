/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState, useCallback} from 'react';
import {connect} from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import {CommonActions} from '../../store/actionCreator';
import {CustomModal} from '../../components/common/Modal';
import {
  TopContainerView,
  TopView,
  StandardView,
} from '../../components/common/View';
// 내 위치 정보 확인
import {SearchView} from '../../components/myLocationSetting/View';
import {LocationActions} from '../../store/actionCreator';
import {SearchResult} from '../../components/myLocationSetting/FlatList';
import {NBGLText, NBGBText} from '../../components/common/Text';
import {widthPercentageToDP} from '../../utils/util';

const MyLocationSetting = props => {
  const [searchText, setSearchText] = useState();
  // 위치 설정 확인 페이지에서 위치 재설정 후, 돌와왔을 때, 실행 => 작업 대기
  const [alertModal, setAlertModal] = useState(false);
  // 현 위치 설정 데이터
  const [location, setLocation] = useState();
  // 현 위치 설정 버튼 클릭 시, 위치(GPS) 켜져있지 않으면 모달 띄우기
  const [errorModal, setErrorModal] = useState(false);

  const nowLocationSetting = useCallback(async () => {
    await CommonActions.handleLoading(true);
    await Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({
          latitude,
          longitude,
        });

        const promise1 = CommonActions.getMyAddress(longitude, latitude, true);

        Promise.all([promise1]).then(async () => {
          await props.navigation.navigate('LocationSearch', {
            x: parseFloat(longitude),
            y: parseFloat(latitude),
            address: props.extra_address,
          });
        });
      },
      error => {
        setErrorModal(true);

        let timeout = setInterval(() => {
          setErrorModal(false);
          clearInterval(timeout);
        }, 2000);
      },
      // enableHighAccuracy: true 시, 실제 디바이스에서 내 위치 설정 요청 오류남.
      {enableHighAccuracy: false, timeout: 10000, maximumAge: 10000},
    );
    await CommonActions.handleLoading(false);
  }, []);

  // 페이지 unMount되면, 검색 데이터 삭제
  useEffect(() => {
    return async () => {
      await LocationActions.handleSearchAddressInit();
    };
  }, []);

  return (
    <TopContainerView>
      {/* <CustomModal
        width={300}
        height={180}
        visible={alertModal}
        close={false}
        children={
          <StandardView style={{marginLeft: widthPercentageToDP(20)}}>
            <NBGBText fontSize={20}>위치 재설정 확인 알림!</NBGBText>
            <NBGLText fontSize={15} marginTop={30}>
              {
                '위치가 변경되었습니다!\n\n홈으로 돌아가 위치 설정 주소를 확인해 보세요!'
              }
            </NBGLText>
          </StandardView>
        }
        renderFooter={() => {
          return <StandardView />;
        }}
      /> */}
      <CustomModal
        width={300}
        height={180}
        visible={errorModal}
        close={false}
        children={
          <StandardView style={{marginLeft: widthPercentageToDP(20)}}>
            <NBGBText fontSize={20}>현위치 재설정 알림!</NBGBText>
            <NBGLText fontSize={15} marginTop={30}>
              {
                '위치(GPS) 설정이 꺼져있습니다!\n\n위치 권한을 켜주신 후 이용해주시 바랍니다!'
              }
            </NBGLText>
          </StandardView>
        }
        renderFooter={() => {
          return <StandardView />;
        }}
      />
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
      <SearchView
        marginTop={10}
        search={value => setSearchText(value)}
        autoOnpress={() => {
          nowLocationSetting();
        }}
      />
      <SearchResult
        data={props.search_address}
        totalCount={props.search_total}
        searchText={searchText}
        navigation={props.navigation}
      />
    </TopContainerView>
  );
};

export default connect(state => ({
  address: state.common.address,
  extra_address: state.common.extra_address,
  latitude: state.common.latitude,
  longitude: state.common.longitude,
  hospitalList: state.common.hospitalList,

  search_address: state.location.search_address,
  search_total: state.location.search_total,
}))(MyLocationSetting);
