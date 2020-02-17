/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {NavigationEvents} from 'react-navigation';
// import LottieView from 'lottie-react-native';
import {widthPercentageToDP} from '../../utils/util';
import {TopContainerView} from '../../components/common/View';
import {TopView, HomeAd} from '../../components/home/View';
import {DataList} from '../../components/home/DataList';

const DATA = [
  {image: '', title: '정형외과'},
  {image: '', title: '대학병원'},
  {image: '', title: '성형외과'},
  {image: '', title: '내과'},
  {image: '', title: '외과'},
  {image: '', title: '한의원'},
  {image: '', title: '치과'},
  {image: '', title: '이비인후과'},
  {image: '', title: '정신병원'},
  {image: '', title: '약국'},
];

const Home = props => {
  const lottie = useRef(null);

  return (
    <TopContainerView>
      <TopView settingLocation={'서울 광진구 자양동 7-7'} height={55} />

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

      {/* 임시로 한담 광고 배너 넣음. */}
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

      {/* 클릭 시, 항목에 해당하는 병원 리스트만 보여지기 구현해야 함. */}
      <DataList data={DATA} navigation={props.navigation} />
    </TopContainerView>
  );
};

export default Home;
