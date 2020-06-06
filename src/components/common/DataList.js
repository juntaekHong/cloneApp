/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import styled from 'styled-components/native';
import {ListView, ContentDataView, EvaluationView} from './View';
import {PhotoImg} from './Image';
import {NBGBText, NBGLText, NBGText} from './Text';
import {widthPercentageToDP, dayToString} from '../../utils/util';
import {CommonActions, HospitalActions} from '../../store/actionCreator';

const DataList = styled.FlatList`
  flex-grow: 1;
  width: 100%;
  height: 100%;
`;

// 진료시간 포맷 커스텀
export const TimeFormat = () => {
  let day = 'dutyTime';
  let index = new Date().getDay();

  if (index !== 0) {
    day = day + index;
  } else {
    day = day + '7';
  }

  return day;
};

// 약국 영업시간 포맷
const ermTimeFormat = time => {
  time = String(time);
  return time[0] + time[1] + ':' + time[2] + time[3];
};

export const List = props => {
  const _renderItem = ({item, index}) => {
    const items = item.hospital === undefined ? item : item.hospital;

    return (
      <ListView
        index={index}
        padding={10}
        onPress={async () => {
          await CommonActions.loadingAction(true);
          let object = await CommonActions.getHospital(items.hpid);
          await props.navigation.navigate('HospitalDetail', {object: object});
          await CommonActions.loadingAction(false);
        }}>
        <PhotoImg
          source={
            items.img
              ? {uri: items.img}
              : require('../../../assets/image/navigation/homeblue.png')
          }
          width={80}
          height={80}
          radius={25}
        />
        <ContentDataView>
          <NBGBText fontSize={14} numberOfLines={1}>
            {items.dutyName}
          </NBGBText>
          <EvaluationView marginTop={3} marginBottom={3}>
            <NBGBText fontSize={12}>전화번호: {items.dutyTel}</NBGBText>
            <NBGLText>
              {dayToString(new Date().getDay())}:{' '}
              {items[TimeFormat()].indexOf('null') !== -1
                ? '휴진'
                : items[TimeFormat()]}
            </NBGLText>
          </EvaluationView>
          <NBGText
            numberOfLines={1}
            fontSize={13}
            color={'gray'}
            style={{width: widthPercentageToDP(250)}}>
            장소: {items.dutyAddr}
          </NBGText>
          {item.distance ? (
            <NBGText fontSize={13} color={'gray'}>
              거리: {item.distance.toFixed(2)}
              km
            </NBGText>
          ) : null}
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

// 약국 리스트
export const ErmList = props => {
  const _renderItem = ({item, index}) => {
    return (
      <ListView
        index={index}
        padding={10}
        onPress={async () => {
          // await CommonActions.loadingAction(true);
          // 약국 상세페이지 데이터 불러오기
          let maskList = await HospitalActions.getMaskList(
            item.latitude,
            item.longitude,
          );

          let mask;

          maskList
            ? await maskList.map(async maskData => {
                if (maskData.name === item.dutyName) {
                  let status;
                  let stock_date;
                  let stock_clock;

                  switch (true) {
                    case maskData.remain_stat === 'plenty':
                      status = '100개 이상';
                      break;
                    case maskData.remain_stat === 'some':
                      status = '30 ~ 100개';
                      break;
                    case maskData.remain_stat === 'few':
                      status = '2 ~ 30개';
                      break;
                    case maskData.remain_stat === 'empty':
                      status = '1개 이하';
                      break;
                    case maskData.remain_stat === 'break':
                      status = '판매 중지(수량 없음)';
                      break;
                  }

                  if (maskData.stock_at) {
                    stock_date = maskData.stock_at.split('/');
                    stock_clock = maskData.stock_at.split(' ')[1].split(':');

                    stock_date =
                      stock_date[0] +
                      '년 ' +
                      stock_date[1] +
                      '월 ' +
                      stock_date[2].split(' ')[0] +
                      '일 ';

                    stock_clock =
                      stock_clock[0] + '시 ' + stock_clock[1] + '분';
                  }

                  mask = {
                    status: status,
                    stock: stock_date
                      ? stock_date + ' ' + stock_clock
                      : maskData.stock_at,
                  };
                }
              })
            : null;

          let object = await HospitalActions.getErmDetail(item.hpid);

          await props.navigation.navigate('HospitalDetail', {
            object: object,
            mask: mask,
          });

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
              영업시간: {ermTimeFormat(item.startTime)} ~{' '}
              {ermTimeFormat(item.endTime)}
            </NBGLText>
          </EvaluationView>
          <NBGText
            numberOfLines={1}
            fontSize={13}
            color={'gray'}
            style={{width: widthPercentageToDP(250)}}>
            장소: {item.dutyAddr}
          </NBGText>
          {item.distance ? (
            <NBGText fontSize={13} color={'gray'}>
              거리: {item.distance.toFixed(2)}
              km
            </NBGText>
          ) : null}
          <NBGBText fontSize={10} color={'#53A6EC'}>
            * 상세페이지에서 마스크 재고 현황을 확인하실 수 있습니다.
          </NBGBText>
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
