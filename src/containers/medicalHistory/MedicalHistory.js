import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {TopContainerView} from '../../components/common/View';
import {ReservationActions, CommonActions} from '../../store/actionCreator';
import {NBGText, NBGBText} from '../../components/common/Text';
import {HistoryList} from '../../components/medicalHistory/FlatList';

const MedicalHistory = props => {
  useEffect(() => {
    props.user !== null ? ReservationActions.getReservationLog() : null;
  }, []);

  return (
    <TopContainerView
      backgroundColor={'#F6F7F9'}
      justifyContent={
        props.user === null || props.history_list.length === 0
          ? 'center'
          : 'flex-start'
      }>
      {props.user === null ? (
        // 로그인 정보가 없을 때, 보이는 뷰
        <NBGBText align={'center'} color={'gray'} fontSize={15}>
          로그인 후, 사용 가능합니다.
        </NBGBText>
      ) : props.history_list.length !== 0 ? (
        // 로그인하면 보이는 뷰
        <HistoryList data={props.history_list} navigation={props.navigation} />
      ) : (
        // 진료 내역없을 때, 보이는 뷰(로그인 한 상태)
        <NBGBText align={'center'} color={'gray'} fontSize={15}>
          진료한 내역이 없습니다.
        </NBGBText>
      )}
    </TopContainerView>
  );
};

export default connect(state => ({
  user: state.signin.user,
  history_list: state.reservation.history_list,
}))(MedicalHistory);
