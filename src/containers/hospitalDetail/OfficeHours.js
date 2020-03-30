/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TopContainerView} from '../../components/common/View';
import {HourView} from '../../components/homeDetail/View';
import {NBGText} from '../../components/common/Text';

const OfficeHours = ({detailData}) => {
  return (
    <TopContainerView marginTop={10} marginBottom={100}>
      <HourView hoursInfo={detailData} />
      <NBGText marginTop={30} fontSize={20}>
        {' '}
        병원소개 내용{' '}
      </NBGText>
    </TopContainerView>
  );
};

export default OfficeHours;
