/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useEffect} from 'react';
import {connect} from 'react-redux';
import {
  TopContainerView,
  TopView,
  BTN,
  StandardView,
} from '../../components/common/View';
import {NBGBText} from '../../components/common/Text';
import {widthPercentageToDP, dayToString, showMessage} from '../../utils/util';
import {FlatList} from 'react-native';
import {
  CalendarView,
  ReservationSelectView,
  ReservationBottomView,
} from '../../components/reservation/View';
import {ReservationActions} from '../../store/actionCreator';
import {ReservationModal} from '../../components/reservation/Modal';
import Toast from 'react-native-root-toast';

const Calendars = props => {
  // 내가 선택한 날짜 데이터
  const [markedDate, setMarkedDate] = useState({});

  // 선택한 날짜의 예약 가능한 시간 리스트
  const [hourData, setHourData] = useState([]);

  // 내가 예약할 시간으로 선택한 번호
  const [selectedIndex, setSelectedIndex] = useState(null);

  // 데이터가 없을 때, 휴진 문구 텍스트는 클릭 안되게 설정
  const [closed, setClosed] = useState(false);

  // 내가 선택한 항목들 유저한테 보여지게 객체 데이터
  const [selectsData, setSelectData] = useState({
    name: props.user.useruserName,
  });

  // 접수하기(이전 페이지로 진료실, 진료항목, 코멘트 데이터
  // 서버에서 진료실 데이터 안보내길래 일단 주석처리함. office: props.navigation.state.params.office,
  const [reservationData, setReservationData] = useState({
    office: props.navigation.state.params.office,
    officeIndex: props.navigation.state.params.officeIndex,
    treatmentName: props.navigation.state.params.object,
    comment: props.navigation.state.params.comment,
  });

  // 병원 예약 최종 확인 모달
  const [reservationModal, setReservationModal] = useState(false);

  // 병원 예약 성공 또는 실패 모달
  const [reservationAlertModal, setReservationAlertModal] = useState(false);

  // 자동 스크롤
  const hourListRef = useRef(null);

  // 예약 날짜 선택 로직
  const onSelectedChange = day => {
    let date = day.dateString;

    setMarkedDate({[date]: {selected: true, marked: false}});

    hourListRef.current.scrollToOffset({
      x: 0,
      y: 0,
      animated: true,
    });
  };

  useEffect(() => {
    setReservationData({
      ...reservationData,
      reservationDate: selectsData.date,
      reservationTime: selectsData.time + ':00',
    });
  }, [selectsData]);

  // 선택할 수 있는 시간 리스트 커스텀
  const selectedDays = async day => {
    let getDay = new Date(day).getDay();

    let enabledHour = [];

    let time;

    if (getDay === 0) {
      time = props.hospital_detail['dutyTime' + 7].split('~');
    } else {
      time = props.hospital_detail['dutyTime' + getDay].split('~');
    }

    if (time[0] !== 'null') {
      let startHour = time[0].split(':');
      let endHour = time[1].split(':');

      startHour = parseInt(startHour[0]);
      endHour = parseInt(endHour[0]);

      for (let i = startHour; i <= endHour; i++) {
        enabledHour.push(i + ':00');
      }

      await setClosed(false);
      setHourData(enabledHour);

      setSelectData({...selectsData, date: day, day: dayToString(getDay)});
    } else {
      await setClosed(true);
      setHourData(['해당 날짜는 휴진입니다.']);
    }
  };

  return (
    <TopContainerView>
      {/* 예약 성공 또는 실패 모달 */}

      {/* 예약 최종 확인 모달 */}
      <ReservationModal
        height={600}
        hospitalName={props.hospital_detail.hospitalName}
        reservationData={reservationData}
        userData={props.user}
        visible={reservationModal}
        backHandler={async () => {
          await setReservationModal(false);
        }}
        reservationHandler={async () => {
          let success = await ReservationActions.reserveHospital(
            reservationData,
          );

          if (success) {
            await ReservationActions.getReservation();
            showMessage(
              '정상적으로 해당 병원에 예약되었습니다!\n예약상태는 진료내역 페이지에서 확인 가능합니다!',
              {
                position: Toast.positions.CENTER,
              },
            );
            props.navigation.state.params.navigation.goBack();
          } else {
            showMessage(
              '중복 예약은 불가 합니다!\n예약내역을 확인하여주시기 바랍니다!',
              {
                position: Toast.positions.CENTER,
              },
            );
          }
        }}
      />
      <TopView
        marginBottom={5}
        title={'예약하기'}
        backBtn={true}
        backHandler={() => {
          props.navigation.goBack(null);
        }}
        closeBtn={false}
        searchBtn={false}
        sharedBtn={false}
      />
      {/* 달력 뷰 */}
      <CalendarView
        onDayPress={day => {
          onSelectedChange(day);

          setSelectedIndex(null);
          selectedDays(day.dateString);
        }}
        markedDate={markedDate}
      />
      <StandardView
        style={{
          height: widthPercentageToDP(70),
          marginHorizontal: widthPercentageToDP(10),
        }}>
        {/* 시간 리스트 뷰 */}
        <FlatList
          ref={hourListRef}
          style={{flexGrow: 1, width: '100%', height: '100%'}}
          horizontal={true}
          data={hourData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <BTN
                index={index}
                disabled={closed}
                onPress={async () => {
                  setSelectedIndex(index);

                  await setSelectData({...selectsData, time: item});
                }}
                style={{
                  backgroundColor:
                    selectedIndex === index ? '#54B8ED' : 'white',
                  marginTop: widthPercentageToDP(20),
                  minWidth: widthPercentageToDP(70),
                  height: widthPercentageToDP(30),
                  padding: widthPercentageToDP(5),
                  marginRight: widthPercentageToDP(10),
                  borderWidth: !closed ? widthPercentageToDP(1) : 0,
                  borderColor: '#dbdbdb',
                  borderRadius: widthPercentageToDP(15),
                }}>
                <NBGBText
                  align={'center'}
                  color={selectedIndex === index ? 'white' : 'black'}>
                  {item}
                </NBGBText>
              </BTN>
            );
          }}
        />
      </StandardView>
      {selectedIndex !== null ? (
        <ReservationSelectView
          marginTop={30}
          paddingVertical={15}
          backgroundColor={'#515761'}
          textColor={'white'}
          userName={props.user.userName}
          selecteObjects={selectsData}
        />
      ) : null}
      <ReservationBottomView
        positionValue={true}
        flexDirection={'row'}
        marginTop={15}
        paddingVertical={15}
        backTitle={'이전'}
        confirmTitle={'예약하기'}
        backHandler={() => {
          props.navigation.goBack(null);
        }}
        reservationDisabled={selectedIndex === null ? true : false}
        reservationHandler={() => {
          // 현재 예약한 정보들 최종 확인 모달 띄우기
          setReservationModal(true);
        }}
      />
    </TopContainerView>
  );
};
export default connect(state => ({
  user: state.signin.user,
  hospital_detail: state.common.hospital_detail,
}))(Calendars);
