/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {CommonActions} from '../../store/actionCreator';
import {
  TopView,
  TopContainerView,
  StandardView,
} from '../../components/common/View';
import {
  BottomView,
  InnerBottomView,
} from '../../components/myLocationSetting/View';
import MapView, {Marker} from 'react-native-maps';
import {widthPercentageToDP} from '../../utils/util';
import {Img} from '../../components/common/Image';
import {NBGBText, NBGLText} from '../../components/common/Text';
import {UIActivityIndicator} from 'react-native-indicators';
import {LatSetBTN} from '../../components/myLocationSetting/Button';

const LocationSearch = props => {
  const [lat, setLat] = useState(props.navigation.state.params.y);
  const [long, setLong] = useState(props.navigation.state.params.x);
  const [address, setAddress] = useState(
    props.navigation.state.params.address === undefined
      ? props.extra_address
      : props.navigation.state.params.address,
  );
  // 위치 이동 시, 로딩
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    props.navigation.state.params.test !== undefined
      ? props.navigation.state.params.test()
      : null;

    return async () => {
      await Keyboard.dismiss();
      await CommonActions.handleExtraAddressInit();
    };
  }, []);

  const submit = async () => {
    await CommonActions.handleLoading(true);
    await CommonActions.resetMyLocation();
    await CommonActions.myLocation(lat, long);
    await CommonActions.getMyAddress(long, lat);
    await CommonActions.handleHospitalListInit();
    await CommonActions.getHospitalList(long, lat, 500);
    await CommonActions.handleLoading(false);
    await props.navigation.navigate('home');
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 43 : 0}
      enabled>
      <TouchableWithoutFeedback
        onPressIn={() => {
          Keyboard.dismiss();
        }}>
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
              height: '100%',
            }}
            initialRegion={{
              latitude: lat,
              longitude: long,
              latitudeDelta: 0.00121,
              longitudeDelta: 0.00121,
            }}
            onRegionChange={async region => {
              await setLoading(true);
              await setLat(region.latitude);
              await setLong(region.longitude);
            }}
            onRegionChangeComplete={async region => {
              await CommonActions.getMyAddress(long, lat, true, address);
              await setLoading(false);
            }}>
            <Marker
              coordinate={{
                latitude: lat,
                longitude: long,
              }}>
              <StandardView
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
              </StandardView>
            </Marker>
          </MapView>
          <BottomView>
            <InnerBottomView>
              <NBGBText fontSize={13}>주소: </NBGBText>
              {loading ? (
                <UIActivityIndicator size={15} color={'gray'} />
              ) : (
                <NBGLText marginRight={20} fontSize={13}>
                  {props.extra_address === null ? address : props.extra_address}
                </NBGLText>
              )}
            </InnerBottomView>
            <LatSetBTN
              title={'위치 설정 완료하기'}
              onPress={async () => {
                Keyboard.dismiss();
                // 위치 재설정 및 병원 리스트 새로 요청
                await submit();
              }}
            />
          </BottomView>
        </TopContainerView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default connect(state => ({
  extra_address: state.common.extra_address,
}))(LocationSearch);
