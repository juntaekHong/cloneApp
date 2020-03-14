/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import {CommonActions} from '../../store/actionCreator';
import {CustomModal} from '../../components/common/Modal';
import {
  TopContainerView,
  TopView,
  StandardView,
  BTN,
} from '../../components/common/View';
// 내 위치 정보 확인
import {SearchView} from '../../components/myLocationSetting/View';
import {LocationActions} from '../../store/actionCreator';
import {SearchResult} from '../../components/myLocationSetting/FlatList';
import {NBGLText, NBGBText, NBGText} from '../../components/common/Text';
import {widthPercentageToDP} from '../../utils/util';
import {UIActivityIndicator} from 'react-native-indicators';

const MyLocationSetting = props => {
  const [searchText, setSearchText] = useState();
  // 위치 설정 확인 페이지에서 위치 재설정 후, 돌와왔을 때, 실행 => 작업 대기
  const [alert, setAlert] = useState(false);
  // 현 위치 설정 데이터
  const [location, setLocation] = useState();
  // 현 위치 설정 버튼 클릭 시, 위치(GPS) 켜져있지 않으면 모달 띄우기
  const [errorModal, setErrorModal] = useState(false);

  const nowLocationSetting = async () => {
    setAlert(true);
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
            test: () => {
              setAlert(false);
            },
          });
        });
      },
      error => {
        setErrorModal(true);
        setAlert(false);
      },
      // enableHighAccuracy: true 시, 실제 디바이스에서 내 위치 설정 요청 오류남.
      {enableHighAccuracy: false, timeout: 10000, maximumAge: 10000},
    );
  };

  // 페이지 unMount되면, 검색 데이터 삭제
  useEffect(() => {
    return async () => {
      await LocationActions.handleSearchAddressInit();
    };
  }, []);

  return (
    <TopContainerView>
      <CustomModal
        width={300}
        height={180}
        visible={errorModal}
        close={false}
        children={
          <StandardView style={{marginLeft: widthPercentageToDP(20)}}>
            <NBGBText fontSize={20}>현위치 재설정 알림</NBGBText>
            <NBGLText fontSize={15} marginTop={30}>
              {
                '위치(GPS) 설정이 꺼져있습니다!\n위치 권한을 켜주신 후 이용해주시 바랍니다.'
              }
            </NBGLText>
          </StandardView>
        }
        renderFooter={() => {
          return (
            <StandardView style={{alignItems: 'flex-end'}}>
              <BTN
                style={{
                  marginRight: widthPercentageToDP(30),
                  marginBottom: widthPercentageToDP(20),
                }}
                onPress={async () => {
                  await setErrorModal(false);
                }}>
                <NBGText fontSize={15}>닫기</NBGText>
              </BTN>
            </StandardView>
          );
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
      {alert === true ? (
        <StandardView
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <StandardView>
            <UIActivityIndicator
              style={{
                maxHeight: widthPercentageToDP(30),
              }}
              size={30}
              color={'gray'}
            />
            <NBGBText fontSize={14} align={'center'} marginTop={10}>
              {'현재 위치를 불러오고 있는 중입니다!\n잠시만 기다려주세요.'}
            </NBGBText>
          </StandardView>
        </StandardView>
      ) : (
        <StandardView>
          <SearchView
            marginTop={10}
            search={value => setSearchText(value)}
            autoOnpress={async () => {
              await nowLocationSetting();
            }}
          />
          <SearchResult
            data={props.search_address}
            totalCount={props.search_total}
            searchText={searchText}
            navigation={props.navigation}
          />
        </StandardView>
      )}
    </TopContainerView>
  );
};

export default connect(state => ({
  address: state.common.address,
  latitude: state.common.latitude,
  longitude: state.common.longitude,
  hospitalList: state.common.hospitalList,

  search_address: state.location.search_address,
  search_total: state.location.search_total,
}))(MyLocationSetting);
