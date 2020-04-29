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
import {
  DivisionView,
  CommentView,
  SelectOfficeListView,
  SelectObjectListView,
} from '../../components/reservation/View';
import {ReservationBtn, DateBTN} from '../../components/reservation/Button';
import Toast from 'react-native-root-toast';
import {ScrollView} from 'react-native';

const Reservation = props => {
  // 진료실 관련 데이터
  const [officeIndex, setOfficeIndex] = useState();
  const [medicalOffice, setMedicalOffice] = useState();
  const [medicalOfficeSelected, setMedicalOfficeSelected] = useState(false);

  // 진료항목 관련 데이터
  const [medicalObject, setMedicalObject] = useState();
  const [medicalObjectSelected, setMedicalObjectSelected] = useState(false);

  // 진료실 선택 후, 선택한 진료실에 해당하는 진료항목 데이터
  const [medicalObjectList, setMedicalObjectList] = useState([]);

  const [comment, setComment] = useState('');

  // 선택한 진료실에 맞는 진료항목 데이터 저장
  const getObjectList = async value => {
    if (value !== undefined) {
      let objectList = [];

      await props.hospital_detail.office.map(item => {
        if (item.officeName === value) {
          objectList.push(item.treatment);
        }
      });

      await setMedicalObjectList([]);

      for (let i = 0; i < objectList[0].length; i++) {
        let dataToObject = new Object();

        dataToObject.treatment = objectList[0][i];
        await setMedicalObjectList(pre => [...pre, dataToObject]);
      }

      objectList[0].length === 0
        ? await setMedicalObject('해당 진료실은 선택 항목이 없습니다.')
        : null;
    }
  };

  return (
    <TopContainerView>
      <ScrollView>
        <TopView
          marginBottom={5}
          title={`접수하기(${props.hospital_detail.hospitalName})`}
          backBtn={true}
          backHandler={() => {
            props.navigation.goBack();
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
          {/* 진료실 선택 리스트 뷰 */}
          {medicalOfficeSelected ? (
            <SelectOfficeListView
              officeIndex={index => {
                setOfficeIndex(index);
              }}
              data={props.hospital_detail.office}
              selectedValue={medicalOffice}
              onPress={async value => {
                await setMedicalOffice(value);
                await setMedicalOfficeSelected(!medicalOfficeSelected);
                await setMedicalObjectSelected(false);
                await setMedicalObject();

                await getObjectList(value);
              }}
            />
          ) : null}
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
              if (medicalOffice === undefined) {
                showMessage('진료실을 선택하여 주세요!', {
                  position: Toast.positions.CENTER,
                });
              } else {
                if (medicalObjectList.length === 0) {
                  showMessage(
                    '선택할 수 있는 진료항목이 없습니다.\n 하단 원장님께 하고 싶은 말에 작성하세요!',
                    {
                      position: Toast.positions.CENTER,
                    },
                  );
                } else {
                  setMedicalObjectSelected(!medicalObjectSelected);
                }
              }
            }}
          />
          {/* 진료항목 선택 리스트 뷰 */}
          {medicalObjectSelected ? (
            <SelectObjectListView
              data={medicalObjectList}
              selectedValue={medicalObject}
              onPress={async value => {
                await setMedicalObject(value);
                await setMedicalObjectSelected(!medicalObjectSelected);
              }}
            />
          ) : null}
          <DivisionView />
          {/* 원장님께 하고싶은 말 */}
          <CommentView
            paddingHorizontal={20}
            onChangeText={text => {
              setComment(text);
            }}
            value={comment}
          />
        </StandardView>
        {/* 날짜/시간 선택 뷰 */}
        <DateBTN
          height={60}
          marginHorizontal={20}
          bgColor={medicalObject === undefined ? '#dbdbdb' : '#FCEE69'}
          disabled={medicalObject === undefined ? true : false}
          onPress={() => {
            medicalObject === undefined
              ? showMessage('진료항목을 선택하여 주세요!', {
                  position: Toast.positions.CENTER,
                })
              : props.navigation.navigate('Calendars', {
                  officeIndex: officeIndex,
                  office: medicalOffice,
                  object: medicalObject,
                  comment: comment.trim(),
                  navigation: props.navigation,
                });
          }}
        />
      </ScrollView>
    </TopContainerView>
  );
};

export default connect(state => ({
  user: state.signin.user,
  hospital_detail: state.common.hospital_detail,
}))(Reservation);
