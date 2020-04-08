/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {showMessage} from '../../utils/util';
import {
  TopContainerView,
  TopView,
  StandardView,
} from '../../components/common/View';
import {DivisionView, CommentView} from '../../components/reservation/View';
import {ReservationBtn, DateBTN} from '../../components/reservation/Button';
import Toast from 'react-native-root-toast';
import {ScrollView} from 'react-native';

const Reservation = (props) => {
  const [medicalOffice, setMedicalOffice] = useState();
  const [medicalOfficeSelected, setMedicalOfficeSelected] = useState(false);

  const [medicalObject, setMedicalObject] = useState();
  const [medicalObjectSelected, setMedicalObjectSelected] = useState(false);

  const [comment, setComment] = useState('');

  return (
    <TopContainerView>
      <ScrollView>
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
          {/* 원장님께 하고싶은 말 */}
          <CommentView
            paddingHorizontal={20}
            onChangeText={(text) => {
              setComment(text);
            }}
            value={comment}
          />
        </StandardView>
        {/* 날짜/시간 선택 뷰 */}
        <DateBTN
          height={60}
          marginHorizontal={20}
          bgColor={'#FCEE69'}
          onPress={() => {
            props.navigation.navigate('Calendars');
          }}
        />
      </ScrollView>
    </TopContainerView>
  );
};

export default connect((state) => ({
  user: state.signin.user,
  hospital_detail: state.common.hospital_detail,
}))(Reservation);
