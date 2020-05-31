import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {TopContainerView} from '../../components/common/View';
import {ReservationActions} from '../../store/actionCreator';
import {NBGBText} from '../../components/common/Text';
import {HistoryList} from '../../components/medicalHistory/FlatList';

const ReservationHistory = props => {
  useEffect(() => {
    props.user !== null ? ReservationActions.getReservation() : null;
  }, []);

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
        <HistoryList
          data={props.reservation_list}
          navigation={props.navigation}
        />
      ) : props.user.token ? (
        // 예약 내역없을 때, 보이는 뷰(로그인 한 상태)
        <NBGBText align={'center'} color={'gray'} fontSize={15}>
          예약한 내역이 없습니다.
        </NBGBText>
      ) : props.user.userNickName ? (
        // 이메일 미인증 상태 시, 보이는 뷰
        <NBGBText align={'center'} color={'gray'} fontSize={15}>
          이메일 인증 후, 사용하실 수 있습니다.
        </NBGBText>
      ) : (
        // 이메일 미인증 상태 시, 보이는 뷰
        <NBGBText align={'center'} color={'gray'} fontSize={15}>
          {'카카오톡은 추가 정보를 입력해야\n사용하실 수 있습니다.'}
        </NBGBText>
      )}
    </TopContainerView>
  );
};

export default connect(state => ({
  user: state.signin.user,
  reservation_list: state.reservation.reservation_list,
}))(ReservationHistory);
