/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {widthPercentageToDP, showMessage} from '../../utils/util';
import {
  TopContainerView,
  TopView,
  BTN,
  StandardView,
} from '../../components/common/View';
import {DivisionView} from '../../components/reservation/View';
import {NBGBText} from '../../components/common/Text';
import {ReservationBtn} from '../../components/reservation/Button';
import Toast from 'react-native-root-toast';

const Reservation = (props) => {
  const [medicalOffice, setMedicalOffice] = useState();
  const [medicalOfficeSelected, setMedicalOfficeSelected] = useState(false);

  const [medicalObject, setMedicalObject] = useState();
  const [medicalObjectSelected, setMedicalObjectSelected] = useState(false);

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
          title={'진료대상'}
          noClick={true}
          necessary={false}
          value={props.user.userName}
        />
        <DivisionView />
        <ReservationBtn
          activeOpacity={0.3}
          noClick={false}
          paddingHorizontal={20}
          title={'진료실'}
          necessary={true}
          value={medicalOffice}
          selected={medicalOfficeSelected}
          onPress={() => {
            setMedicalOfficeSelected(!medicalOfficeSelected);
          }}
        />
        <DivisionView />
        <ReservationBtn
          noClick={false}
          activeOpacity={medicalOffice === undefined ? 1 : 0.3}
          paddingHorizontal={20}
          title={'진료항목'}
          necessary={true}
          value={medicalObject}
          selected={medicalObjectSelected}
          onPress={() => {
            medicalOffice === undefined
              ? showMessage('진료실을 선택하여 주세요!', {
                  position: Toast.positions.CENTER,
                })
              : setMedicalObjectSelected(!medicalObjectSelected);
          }}
        />
        <DivisionView />
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
