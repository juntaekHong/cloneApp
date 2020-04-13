import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';
import {TopContainerView} from '../../components/common/View';
import {ReservationActions} from '../../store/actionCreator';
import {NBGText, NBGBText} from '../../components/common/Text';
import {ReservationHistoryItem} from '../../components/medicalHistory/View';

const ReservationHistory = props => {
  useEffect(() => {
    props.user !== null ? ReservationActions.getReservation() : null;
  }, []);

  console.log(props.reservation_list);

  return (
    <TopContainerView
      backgroundColor={'#F6F7F9'}
      justifyContent={
        props.user === null || props.reservation_list.length === 0
          ? 'center'
          : 'flex-start'
      }>
      {props.user === null ? (
        // 로그인 정보가 없을 때, 보이는 뷰
        <NBGBText align={'center'} color={'gray'} fontSize={15}>
          로그인 후, 사용 가능합니다.
        </NBGBText>
      ) : props.reservation_list.length !== 0 ? (
        // 로그인하면 보이는 뷰
        <ReservationHistoryItem data={props.reservation_list} />
      ) : (
        // 예약 내역없을 때, 보이는 뷰(로그인 한 상태)
        <NBGBText align={'center'} color={'gray'} fontSize={15}>
          예약한 내역이 없습니다.
        </NBGBText>
      )}
    </TopContainerView>
  );
};

export default connect(state => ({
  user: state.signin.user,
  reservation_list: state.reservation.reservation_list,
}))(ReservationHistory);
