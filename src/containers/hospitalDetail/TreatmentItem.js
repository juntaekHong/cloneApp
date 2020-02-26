import React from 'react';
import {View, Text} from 'react-native';
import {TopContainerView} from '../../components/common/View';

const TreatmentItem = props => {
  return (
    <TopContainerView marginHorizontal={30}>
      <Text>진료항목 정보 페이지</Text>
    </TopContainerView>
  );
};

export default TreatmentItem;
