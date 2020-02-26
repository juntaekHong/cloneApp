import React from 'react';
import {Text} from 'react-native';
import {widthPercentageToDP} from '../../utils/util';
import {TopContainerView} from '../../components/common/View';

const OfficeHours = props => {
  return (
    <TopContainerView marginHorizontal={30}>
      <Text>진료시간 정보 페이지</Text>
    </TopContainerView>
  );
};

export default OfficeHours;
