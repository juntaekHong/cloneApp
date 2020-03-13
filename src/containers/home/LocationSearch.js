/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useRef, useCallback} from 'react';
import {connect} from 'react-redux';
import {
  View,
  TextInput,
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
  BTN,
} from '../../components/common/View';
import MapView, {Marker, Callout} from 'react-native-maps';
import {widthPercentageToDP} from '../../utils/util';
import {Img} from '../../components/common/Image';
import {NBGBText, NBGLText} from '../../components/common/Text';

const LocationSearch = props => {
  const [lat, setLat] = useState(props.navigation.state.params.y);
  const [long, setLong] = useState(props.navigation.state.params.x);
  const [address, setAddress] = useState(props.navigation.state.params.address);

  useEffect(() => {
    return async () => {
      await Keyboard.dismiss();
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
    await props.navigation.goBack(null);
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
              height: widthPercentageToDP(207),
            }}
            initialRegion={{
              latitude: lat,
              longitude: long,
              latitudeDelta: 0.00121,
              longitudeDelta: 0.00121,
            }}>
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
                    flexDirection: 'row',
                    width: widthPercentageToDP(140),
                    minHeight: widthPercentageToDP(20),
                  }}>
                  <NBGBText fontSize={12}>주소: </NBGBText>
                  <NBGLText
                    fontSize={13}
                    style={{
                      marginRight: widthPercentageToDP(20),
                    }}>
                    {address}
                  </NBGLText>
                </View>
              </Callout>
            </Marker>
          </MapView>
          <StandardView
            style={{
              width: '100%',
              position: 'absolute',
              bottom: 10,
              alignItems: 'center',
            }}>
            {/* 추후 추가 예정 부분들 */}
            {/* <TextInput
              style={{
                width: widthPercentageToDP(335),
                height: widthPercentageToDP(50),
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: widthPercentageToDP(2),
                borderRadius: widthPercentageToDP(10),
                borderColor: '#dbdbdb',
                paddingHorizontal: widthPercentageToDP(20),
                marginBottom: widthPercentageToDP(20),
              }}
              autoFocus={true}
              keyboardType={'default'}
              returnKeyType={'done'}
              placeholder={'상세 주소를 입력하세요.'}
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
            /> */}
            <StandardView
              style={{
                flexDirection: 'row',
                width: widthPercentageToDP(335),
                minHeight: widthPercentageToDP(50),
                alignItems: 'center',
                borderWidth: widthPercentageToDP(2),
                borderRadius: widthPercentageToDP(10),
                borderColor: '#dbdbdb',
                paddingHorizontal: widthPercentageToDP(15),
                marginBottom: widthPercentageToDP(20),
              }}>
              <NBGBText fontSize={13}>주소: </NBGBText>
              <NBGLText marginRight={20} fontSize={13}>
                {address}
              </NBGLText>
            </StandardView>
            <BTN
              onPress={async () => {
                Keyboard.dismiss();
                // 위치 재설정 및 병원 리스트 새로 요청
                await submit();
              }}
              style={{
                width: widthPercentageToDP(335),
                height: widthPercentageToDP(50),
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: widthPercentageToDP(2),
                borderRadius: widthPercentageToDP(10),
                borderColor: '#dbdbdb',
              }}>
              <NBGBText>위치 설정 확인</NBGBText>
            </BTN>
          </StandardView>
        </TopContainerView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default connect(state => ({}))(LocationSearch);
