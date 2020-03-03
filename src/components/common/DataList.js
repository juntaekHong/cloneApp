/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components/native';
import {ListView, ContentDataView, EvaluationView} from './View';
import {PhotoImg, StarImg} from './Image';
import {NBGBText, NBGLText, NBGText} from './Text';
import {widthPercentageToDP} from '../../utils/util';
import {CommonActions} from '../../store/actionCreator';

// 데이터 형식
// const DATA = [
//     {
//       hospitalName: '서울정형외과',
//       image: 'image',
//       rating: 5,
//       reviewCount: 10,
//       location: '서울 강남',
//       time: '5분',
//     },
//  ]
// 변경될 데이터 형식
// {
//   distance: 0,
//   dutyAddr: '주소',
//   dutyDivName: '의원',
//   dutyName: '병원이름',
//   dutyTel1: '전화번호',
//   startTime: '시작시간',
//   endTime: '종료시간',
//   이외에 다른 데이터들도 있긴함. 적어놓지 않는 것
// },

const DataList = styled.FlatList`
  flex-grow: 1;
  width: 100%;
  height: 100%;
`;

// 진료시간 포맷 커스텀
const TimeFormat = time => {
  let toStringFormat =
    String(time).substring(0, 2) + ':' + String(time).substring(2, 4);
  return toStringFormat;
};

export const List = props => {
  const _renderItem = ({item, index}) => {
    return (
      // <ListView
      //   index={index}
      //   padding={10}
      //   onPress={async () => {
      //     props.navigation.navigate('HospitalDetail', {
      //       hospitalName: item.hospitalName,
      //     });
      //   }}>
      //   <PhotoImg
      //     source={require('../../../assets/image/navigation/homeblue.png')}
      //     width={80}
      //     height={80}
      //     radius={25}
      //   />
      //   <ContentDataView>
      //     <NBGBText fontSize={16}>{item.hospitalName}</NBGBText>
      //     <EvaluationView marginTop={3} marginBottom={3}>
      //       <StarImg
      //         source={require('../../../assets/image/home/star-0.png')}
      //         width={19}
      //         height={19}
      //       />
      //       <NBGBText fontSize={12}>{item.rating}</NBGBText>
      //       <NBGLText>({item.reviewCount}+)</NBGLText>
      //     </EvaluationView>
      //     <NBGText fontSize={13} color={'#b7b7b7'}>
      //       장소: {item.location}
      //     </NBGText>
      //     <NBGText fontSize={13} color={'#b7b7b7'}>
      //       소요시간: {item.time}
      //     </NBGText>
      //   </ContentDataView>
      // </ListView>
      <ListView
        index={index}
        padding={10}
        onPress={async () => {
          await CommonActions.loadingAction(true);
          await CommonActions.getHospitalDetail(item.hpid);
          props.navigation.navigate('HospitalDetail');
          await CommonActions.loadingAction(false);
        }}>
        <PhotoImg
          source={require('../../../assets/image/navigation/homeblue.png')}
          width={80}
          height={80}
          radius={25}
        />
        <ContentDataView>
          <NBGBText fontSize={14} numberOfLines={1}>
            {item.dutyName}
          </NBGBText>
          <EvaluationView marginTop={3} marginBottom={3}>
            <NBGBText fontSize={12}>전화번호: {item.dutyTel1}</NBGBText>
            <NBGLText>
              진료시간: {TimeFormat(item.startTime)} ~{' '}
              {TimeFormat(item.endTime)}
            </NBGLText>
          </EvaluationView>
          <NBGText
            numberOfLines={1}
            fontSize={13}
            color={'gray'}
            style={{width: widthPercentageToDP(250)}}>
            장소: {item.dutyAddr}
          </NBGText>
          <NBGText fontSize={13} color={'gray'}>
            거리: {item.distance} km
          </NBGText>
        </ContentDataView>
      </ListView>
    );
  };

  return (
    <DataList
      data={props.data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={_renderItem}
    />
  );
};
