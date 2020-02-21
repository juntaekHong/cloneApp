/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, Text, Platform} from 'react-native';
import {TopView, TopContainerView} from '../../components/common/View';
import {Card} from '../../components/home/View';
import {widthPercentageToDP} from '../../utils/util';
import {UIActivityIndicator} from 'react-native-indicators';

const HospitalDetail = props => {
  return (
    <TopContainerView>
      <TopView
        marginBottom={5}
        title={props.navigation.state.params.hospitalName}
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
          hospitalName={props.navigation.state.params.hospitalName}
          rating={4.0}
          reviewCount={50}
          phoneNumber={'02 - 760 - 4238'}
          isSrap={false}
          shared={() => {}}
        />
      </ScrollView>
    </TopContainerView>
  );
};

export default HospitalDetail;
