/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, View, Text} from 'react-native';
import {connect} from 'react-redux';
import {CustomTopView} from '../../components/home/View';
import {List} from '../../components/common/DataList';
import {widthPercentageToDP} from '../../utils/util';

// 임시 데이터
const DATA = [
  // {
  //   distance: 0,
  //   dutyAddr: '주소',
  //   dutyDivName: '의원',
  //   dutyName: '병원이름',
  //   dutyTel1: '전화번호',
  //   startTime: '시작시간',
  //   endTime: '종료시간',
  //   latitude: '위도 숫자',
  //   longitude: '경도 숫자',
  // },
  {
    hospitalName: '서울정형외과',
    image: 'image',
    rating: 5,
    reviewCount: 10,
    location: '서울 강남',
    time: '5분',
  },
  {
    hospitalName: '고려정형외과',
    image: 'image',
    rating: 1,
    reviewCount: 5,
    location: '서울 안암',
    time: '30분',
  },
  {
    hospitalName: '경기정형외과',
    image: 'image',
    rating: 3,
    reviewCount: 55,
    location: '경기',
    time: '20분',
  },
  {
    hospitalName: '하남정형외과',
    image: 'image',
    rating: 4.4,
    reviewCount: 4,
    location: '하남',
    time: '11분',
  },
  {
    hospitalName: '강원정형외과',
    image: 'image',
    rating: 2,
    reviewCount: 2,
    location: '강원',
    time: '3분',
  },
  {
    hospitalName: '한성정형외과',
    image: 'image',
    rating: 5,
    reviewCount: 100,
    location: '서울 성북구',
    time: '5분',
  },
];

const HospitalList = props => {
  const [data, setData] = useState([]);

  // 홈(메인) 페이지에서 항목에 맞는 병원 리스트만 보여지는 것으로 가정.
  const Matching = findData => {
    let searchData = [];

    let MatchingData = props.hospitalList.map((item, index) => {
      if (item.dutyName.indexOf(findData) !== -1) {
        return searchData.push(item);
      }
    });

    return searchData;
  };

  useEffect(() => {
    setData(Matching(props.navigation.state.params.object));
  }, [props.navigation.state.params.object]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {/* <TopView
        marginBottom={5}
        title={'HospitalList Page'}
        backHandler={() => {
          props.navigation.goBack();
        }}
        closeHandler={() => {
          props.navigation.goBack();
        }}
      /> */}
      <CustomTopView
        settingLocation={'서울 광진구 자양동 7-7'}
        height={55}
        navigation={props.navigation}
        justifyContent={true}
      />
      {/* <List data={data} navigation={props.navigation} /> */}
      <List data={data} navigation={props.navigation} />
    </SafeAreaView>
  );
};

export default connect(state => ({
  hospitalList: state.common.hospitalList,
}))(HospitalList);
