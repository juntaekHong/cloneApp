/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TopContainerView} from '../../components/common/View';
import {HourView} from '../../components/homeDetail/View';
import {NBGText} from '../../components/common/Text';

const OfficeHours = ({detailData}) => {
  return (
    <TopContainerView marginTop={10} marginBottom={100}>
      <HourView hoursInfo={detailData} />
      <NBGText marginLeft={15} marginTop={30} fontSize={20}>
        {!detailData.type ? '병원소개 내용' : '약국소개 내용'}
      </NBGText>
      <NBGText marginLeft={15} marginTop={30} fontSize={15}>
        {detailData.dutyInf === null
          ? !detailData.type
            ? '현재 병원 소개 내용이 없습니다.'
            : '현재 약국 소개 내용이 없습니다.'
          : detailData.dutyInf}
      </NBGText>
    </TopContainerView>
  );
};

export default OfficeHours;
