import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';
import {TopContainerView} from '../../components/common/View';
import {ReservationActions} from '../../store/actionCreator';
import {NBGText, NBGBText} from '../../components/common/Text';
import {ReservationItem} from '../../components/medicalHistory/View';

const ReservationHistory = props => {
  useEffect(() => {
    props.user !== null ? ReservationActions.getReservation() : null;
  }, []);

  console.log(props.reservation_list);

  return (
    <TopContainerView
      backgroundColor={'#F6F7F9'}
      justifyContent={props.user === null ? 'center' : 'flex-start'}>
      {props.user === null ? (
        // 로그인 정보가 없을 때, 보이는 뷰
        <NBGBText align={'center'} color={'gray'} fontSize={15}>
          로그인 후, 사용 가능합니다.
        </NBGBText>
      ) : (
        // 로그인하면 보이는 뷰
        <ReservationItem data={props.reservation_list} />
      )}
    </TopContainerView>
  );
};

export default connect(state => ({
  user: state.signin.user,
  reservation_list: state.reservation.reservation_list,
}))(ReservationHistory);
