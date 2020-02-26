/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useRef} from 'react';
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
import Swiper from 'react-native-swiper';
import OfficeHours from '../hospitalDetail/OfficeHours';
import TreatmentItem from '../hospitalDetail/TreatmentItem';
import HospitalIntroduction from '../hospitalDetail/HospitalIntroduction';
import {PagiNationTab} from '../../components/home/PagiNation';

const HospitalDetail = props => {
  const [detailData, setDetailData] = useState(props.hospital_detail);

  // 페이지네이션 탭 인덱스
  const [paginationIndex, setPaginationIndex] = useState(0);

  const [NameEncoding, setNameEncoding] = useState();
  // 길찾기 클릭 시, 길찾기 모달(알림창) visible
  const [roadMapModal, setRoadMapModal] = useState(false);

  const focus = useRef();

  // 병원 상세 데이터가 들어오면 네이버 길찾기에 대한 한글 인코딩 해주는 것.
  useEffect(() => {
    setNameEncoding(encodeURI(encodeURIComponent(detailData.dutyName)));
  }, [detailData]);

  useEffect(() => {
    focus.current = paginationIndex;
  }, [paginationIndex]);

  const KakaoMapNaivgate = () => {
    Linking.openURL(
      'daummaps://search?q=' +
        detailData.dutyName +
        '&p=' +
        detailData.wgs84Lat +
        ',' +
        detailData.wgs84Lon +
        '',
    ).catch(() => {
      props.navigation.navigate('KakaoMap', {
        uri:
          'https://map.kakao.com/link/map/' +
          detailData.dutyName +
          ',' +
          detailData.wgs84Lat +
          ',' +
          detailData.wgs84Lon +
          '',
      });
    });
  };

  // 네이버 지도 앱 or 웹으로 길찾기 기능
  const NaverMapNavigate = () => {
    Linking.openURL(
      'nmap://place?lat=' +
        detailData.wgs84Lat +
        '&lng=' +
        detailData.wgs84Lon +
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
        height={220}
        visible={roadMapModal}
        close={false}
        children={
          <View style={{marginLeft: widthPercentageToDP(20)}}>
            <NBGBText fontSize={20}>길찾기 선택</NBGBText>
            <BTN
              onPress={() => {
                setRoadMapModal(false);
                KakaoMapNaivgate();
              }}
              style={{marginTop: widthPercentageToDP(30)}}>
              <NBGText fontSize={17}>카카오맵으로 길찾기</NBGText>
            </BTN>
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
        // 추후 검색기능 활성화?
        searchBtn={false}
      />
      {/* <ScrollView> */}
      <Card
        hospitalName={detailData.dutyName}
        rating={4.0}
        reviewCount={50}
        dutyAddr={detailData.dutyAddr}
        dutyMapimg={detailData.dutyMapimg}
        phoneNumber={detailData.dutyTel1}
        isSrap={false}
        shared={() => {}}
        naviModal={() => {
          setRoadMapModal(true);
        }}
      />
      <PagiNationTab
        ref={focus}
        index={paginationIndex}
        page1={{title: '진료시간 정보', index: 0}}
        page2={{title: '진료항목 정보', index: 1}}
        page3={{title: '병원소개', index: 2}}
        onPress={index => {
          // 탭 클릭, 페이지게이션 버그로 현재는 임시로 클릭 막아놓음.
        }}
      />
      <Swiper
        index={paginationIndex}
        onIndexChanged={index => {
          setPaginationIndex(index);
        }}
        showsButtons={true}
        loop={false}
        showsPagination={false}>
        <OfficeHours />
        <TreatmentItem />
        <HospitalIntroduction />
      </Swiper>

      {/* </ScrollView> */}
    </TopContainerView>
  );
};

export default connect(state => ({
  hospital_detail: state.common.hospital_detail,
}))(HospitalDetail);
