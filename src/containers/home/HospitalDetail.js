/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, Text, Platform} from 'react-native';
import {connect} from 'react-redux';
import {TopView, TopContainerView} from '../../components/common/View';
import {Card} from '../../components/home/View';
import {widthPercentageToDP} from '../../utils/util';
import {UIActivityIndicator} from 'react-native-indicators';

const HospitalDetail = props => {
  const [detailData, setDetailData] = useState(
    props.navigation.state.params.detailData,
  );

  const [NameEncoding, setNameEncoding] = useState();

  // 병원 상세 데이터가 들어오면 네이버 길찾기에 대한 한글 인코딩 해주는 것.
  useEffect(() => {
    setNameEncoding(encodeURI(encodeURIComponent(detailData.dutyName)));
  }, [detailData]);

  return (
    <TopContainerView>
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
          navi={() => {
            props.navigation.navigate('NaverMap', {
              uri:
                'https://m.map.naver.com/directions/#/main//' +
                NameEncoding +
                ',' +
                detailData.latitude +
                ',' +
                detailData.longitude +
                ',,,false,34540408',
            });
          }}
        />
      </ScrollView>
    </TopContainerView>
  );
};

export default connect(state => ({
  hospitalList: state.common.hospitalList,
}))(HospitalDetail);
