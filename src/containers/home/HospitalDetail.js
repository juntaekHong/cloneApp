/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  Platform,
  View,
  Linking,
} from 'react-native';
import {connect} from 'react-redux';
import {TopView, TopContainerView, BTN} from '../../components/common/View';
import {NBGText, NBGBText} from '../../components/common/Text';
import {Card} from '../../components/home/View';
import {widthPercentageToDP} from '../../utils/util';
import {UIActivityIndicator} from 'react-native-indicators';
import {CustomModal} from '../../components/common/Modal';

const HospitalDetail = props => {
  const [detailData, setDetailData] = useState(
    props.navigation.state.params.detailData,
  );

  const [NameEncoding, setNameEncoding] = useState();
  // 길찾기 클릭 시, 길찾기 모달(알림창) visible
  const [roadMapModal, setRoadMapModal] = useState(false);

  // 병원 상세 데이터가 들어오면 네이버 길찾기에 대한 한글 인코딩 해주는 것.
  useEffect(() => {
    setNameEncoding(encodeURI(encodeURIComponent(detailData.dutyName)));
  }, [detailData]);

  const NaverMapNavigate = () => {
    Linking.openURL(
      'nmap://place?lat=' +
        detailData.latitude +
        '&lng=' +
        detailData.longitude +
        '&name=' +
        detailData.dutyName +
        '&appname=클론프로젝트',
    ).catch(() => {
      props.navigation.navigate('NaverMap', {
        // uri:
        //   'https://m.map.naver.com/directions/#/main//' +
        //   NameEncoding +
        //   ',' +
        //   detailData.latitude +
        //   ',' +
        //   detailData.longitude +
        //   ',,,false,34540408',
        // uri:
        //   'https://m.map.naver.com/directions/#/main//' +
        //   NameEncoding +
        //   ',' +
        //   detailData.longitude +
        //   ',' +
        //   detailData.longitude +
        //   ',,,false,34540408',
        uri:
          'https://m.map.naver.com/directions/#/poiSearch/destination/' +
          NameEncoding,
      });
    });
  };

  return (
    <TopContainerView>
      <CustomModal
        width={300}
        height={150}
        visible={roadMapModal}
        close={false}
        children={
          <View style={{marginLeft: widthPercentageToDP(20)}}>
            <NBGBText fontSize={20}>길찾기 선택</NBGBText>
            {/* <BTN
              onPress={() => {
                setRoadMapModal(false);
              }}
              style={{marginTop: widthPercentageToDP(30)}}>
              <NBGText fontSize={17}>카카오맵으로 길찾기</NBGText>
            </BTN> */}
            <BTN
              onPress={() => {
                setRoadMapModal(false);
                NaverMapNavigate();
              }}
              style={{
                marginTop: widthPercentageToDP(30),
              }}>
              <NBGText fontSize={17}>네이버지도로 길찾기</NBGText>
            </BTN>
          </View>
        }
        renderFooter={() => {
          return (
            <BTN
              style={{
                marginRight: widthPercentageToDP(30),
                marginBottom: widthPercentageToDP(20),
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}
              onPress={() => {
                setRoadMapModal(false);
              }}>
              <NBGText fontSize={15}>취소</NBGText>
            </BTN>
          );
        }}
      />
      <TopView
        marginBottom={5}
        title={detailData.dutyName}
        backHandler={() => {
          props.navigation.goBack();
        }}
        closeBtn={false}
        searchHandler={() => {
          // 검색 기능 구현 예정
        }}
      />
      <ScrollView>
        <Card
          hospitalName={detailData.dutyName}
          rating={4.0}
          reviewCount={50}
          phoneNumber={detailData.dutyTel1}
          isSrap={false}
          shared={() => {}}
          naviModal={() => {
            setRoadMapModal(true);
          }}
        />
      </ScrollView>
    </TopContainerView>
  );
};

export default connect(state => ({
  hospitalList: state.common.hospitalList,
}))(HospitalDetail);
