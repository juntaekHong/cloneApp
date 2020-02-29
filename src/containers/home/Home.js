/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {NavigationEvents} from 'react-navigation';
// import LottieView from 'lottie-react-native';
import {widthPercentageToDP} from '../../utils/util';
import {connect} from 'react-redux';
import {TopContainerView} from '../../components/common/View';
import {TopView, HomeAd} from '../../components/home/View';
import {DataList} from '../../components/home/DataList';
import {CommonActions} from '../../store/actionCreator';

// 병원별 이미지 및 타이틀
const DATA = [
  {image: require('../../../assets/image/home/hospital.png'), title: '병원'},
  {
    image: require('../../../assets/image/home/fetus.png'),
    title: '산부인과',
  },
  {image: require('../../../assets/image/home/stomach.png'), title: '내과'},
  {image: require('../../../assets/image/home/doctor.png'), title: '외과'},
  {
    image: require('../../../assets/image/home/acupuncture.png'),
    title: '한의원',
  },
  {image: require('../../../assets/image/home/tooth.png'), title: '치과'},
  {
    image: require('../../../assets/image/home/ear.png'),
    title: '이비인후과',
  },
  {
    image: require('../../../assets/image/home/injury.png'),
    title: '정형외과',
  },
  {
    image: require('../../../assets/image/home/healthcare-and-medical.png'),
    title: '성형외과',
  },
  {
    image: require('../../../assets/image/home/mental-health.png'),
    title: '정신병원',
  },
  {image: require('../../../assets/image/home/pill.png'), title: '약국'},
];

const Home = props => {
  const lottie = useRef(null);

  return (
    <TopContainerView>
      <TopView
        settingLocation={'좌표 주소 변환 예정'}
        height={55}
        navigation={props.navigation}
      />

      {/* 광고 배너 뷰 작업 */}
      <NavigationEvents
        onWillFocus={() => {
          try {
            if (lottie.current) lottie.current.play();
          } catch (e) {}
        }}
        onWillBlur={() => {
          try {
            if (lottie.current) lottie.current.play();
          } catch (e) {}
        }}
      />

      {/* 임시로 아무 이미지 광고 배너 넣음. */}
      <HomeAd
        list={[
          {
            noticeIndex: 1,
            noticeImg:
              'https://littledeep.com/wp-content/uploads/2019/05/littledeep_hospital_sns-1024x552.png',
            info: null,
            createdAt: '2019-05-23T18:21:20.000Z',
            updatedAt: '2019-09-23T10:37:20.000Z',
          },
          {
            noticeIndex: 2,
            noticeImg:
              'https://previews.123rf.com/images/photoplotnikov/photoplotnikov1603/photoplotnikov160300032/53961525-도시-병원-파란색-배경에-플랫-디자인에서-구급차와-헬리콥터-건물-클리닉-벡터-일러스트-레이션.jpg',
            info: null,
            createdAt: '2019-02-12T23:02:06.000Z',
            updatedAt: '2019-09-01T10:45:48.000Z',
          },
        ]}
      />
      <DataList data={DATA} navigation={props.navigation} />
    </TopContainerView>
  );
};

export default connect(state => ({
  hospitalList: state.common.hospitalList,
}))(Home);
