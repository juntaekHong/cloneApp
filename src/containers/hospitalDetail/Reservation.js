/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {widthPercentageToDP} from '../../utils/util';
import {
  TopContainerView,
  TopView,
  BTN,
  StandardView,
} from '../../components/common/View';
import {NBGBText, NBGLText} from '../../components/common/Text';
import {Img} from '../../components/common/Image';
import {ReservationBtn} from '../../components/reservation.js/Button';

const Reservation = (props) => {
  const [MedicalOffice, setMedicalOffice] = useState();
  const [medicalOfficeSelected, setMedicalOfficeSelected] = useState(false);

  return (
    <TopContainerView>
      <TopView
        marginBottom={5}
        title={`접수하기(${props.hospital_detail.hospitalName})`}
        backBtn={true}
        backHandler={() => {
          props.navigation.goBack(null);
        }}
        closeBtn={false}
        searchBtn={false}
        sharedBtn={false}
      />
      {/* 주요 내용 들어올 곳 뷰 */}
      <StandardView>
        <ReservationBtn
          paddingHorizontal={20}
          paddingBottom={20}
          title={'진료대상'}
          noClick={true}
          necessary={false}
          value={props.user.userName}
        />
        <ReservationBtn
          noClick={false}
          paddingHorizontal={20}
          paddingBottom={20}
          title={'진료실'}
          necessary={true}
          value={MedicalOffice}
          selected={medicalOfficeSelected}
          onPress={() => {
            setMedicalOfficeSelected(!medicalOfficeSelected);
          }}
        />
      </StandardView>
      {/* 날짜 / 시간 선택 임시 버튼 */}
      <BTN
        style={{
          marginLeft: widthPercentageToDP(20),
          width: widthPercentageToDP(120),
          padding: widthPercentageToDP(5),
          borderWidth: widthPercentageToDP(1),
          borderColor: '#dbdbdb',
          borderRadius: widthPercentageToDP(20),
        }}
        onPress={() => {
          props.navigation.navigate('Calendars');
        }}>
        <NBGBText align={'center'}>날짜/시간 선택</NBGBText>
      </BTN>
    </TopContainerView>
  );
};

export default connect((state) => ({
  user: state.signin.user,
  hospital_detail: state.common.hospital_detail,
}))(Reservation);
