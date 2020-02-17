/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {widthPercentageToDP} from '../../utils/util';
import {TopContainerView} from '../../components/common/View';
import {TopView} from '../../components/home/View';
import {DataList} from '../../components/home/DataList';

const DATA = [
  {image: '', title: '정형외과'},
  {image: '', title: '대학병원'},
  {image: '', title: '성형외과'},
  {image: '', title: '내과'},
  {image: '', title: '외과'},
  {image: '', title: '한의원'},
  {image: '', title: '약국'},
];

const Home = props => {
  return (
    <TopContainerView>
      <TopView settingLocation={'서울 광진구 자양동 7-7'} height={55} />
      {/* 항목 별 병원 클릭 임시 버튼 주석처리 */}
      {/* <TouchableOpacity
        style={{
          margin: widthPercentageToDP(2),
          padding: widthPercentageToDP(5),
          borderWidth: widthPercentageToDP(2),
          borderRadius: widthPercentageToDP(6),
          borderColor: 'blue',
        }}
        onPress={() => {
          props.navigation.navigate('HospitalList');
        }}>
        <Text>XX 병원 리스트로 이동</Text>
      </TouchableOpacity> */}
      <DataList data={DATA} navigation={props.navigation} />
    </TopContainerView>
  );
};

export default Home;
