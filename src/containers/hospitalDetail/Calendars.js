/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import {connect} from 'react-redux';
import {
  TopContainerView,
  TopView,
  BTN,
  StandardView,
} from '../../components/common/View';
import {NBGBText} from '../../components/common/Text';
import {Calendar, Arrow} from 'react-native-calendars';
import {widthPercentageToDP, getData} from '../../utils/util';
import {Img} from '../../components/common/Image';
import {FlatList} from 'react-native';

// 포맷
// // 날짜 선택
// '2020-05-16': {selected: true, marked: false},
// // 해당 날짜 예약 꽉참
// '2020-05-18': {marked: true, dotColor: 'red', activeOpacity: 0},
// // 휴진
// '2020-05-19': {disabled: true, disableTouchEvent: true},

// {"dateString": "2020-04-06", "day": 6, "month": 4, "timestamp": 1586131200000, "year": 2020}

const Calendars = (props) => {
  const [markedDate, setMarkedDate] = useState({});

  const [hourData, setHourData] = useState([]);

  const [selectedIndex, setSelectedIndex] = useState(null);

  const hourListRef = useRef(null);

  const onSelectedChange = (day) => {
    let date = day.dateString;

    setMarkedDate({[date]: {selected: true, marked: false}});

    hourListRef.current.scrollToOffset({
      x: 0,
      y: 0,
      animated: true,
    });
  };

  const selectedDays = (day) => {
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

      setHourData(enabledHour);
    } else {
      setHourData([]);
    }
  };

  return (
    <TopContainerView>
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
      <Calendar
        style={{
          paddingBottom: widthPercentageToDP(10),
          borderBottomWidth: widthPercentageToDP(1),
          borderBottomColor: '#dbdbdb',
        }}
        // Initially visible month. Default = Date()

        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={new Date()}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        maxDate={'2020-05-30'}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={(day) => {
          console.log('selected day', day);
          onSelectedChange(day);

          setSelectedIndex(null);
          selectedDays(day.dateString);
        }}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={(day) => {
          console.log('selected day', day);
        }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={'yyyy MM'}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={(month) => {
          console.log('month changed', month);
        }}
        // Hide month navigation arrows. Default = false

        hideArrows={false}
        // Replace default arrows with custom ones (direction can be 'left' or 'right')
        renderArrow={(direction) =>
          direction === 'left' ? (
            <Img
              width={16}
              height={16}
              source={require('../../../assets/image/reservation/left-arrow.png')}
            />
          ) : (
            <Img
              width={16}
              height={16}
              source={require('../../../assets/image/reservation/next.png')}
            />
          )
        }
        // Do not show days of other months in month page. Default = false
        hideExtraDays={true}
        // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
        // day from another month that is visible in calendar page. Default = false
        disableMonthChange={false}
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
        firstDay={0}
        // Hide day names. Default = false
        hideDayNames={false}
        // Show week numbers to the left. Default = false
        showWeekNumbers={false}
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={(substractMonth) => substractMonth(-1)}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        onPressArrowRight={(addMonth) => addMonth(1)}
        // Disable left arrow. Default = false
        disableArrowLeft={false}
        // Disable right arrow. Default = false
        disableArrowRight={false}
        markedDates={markedDate}
      />
      <NBGBText color={'red'} marginLeft={5} marginTop={10} fontSize={12}>
        * 시간을 선택하시면 하단에 예약가능 시간대가 노출됩니다.
      </NBGBText>
      <StandardView
        style={{
          height: widthPercentageToDP(70),
          marginHorizontal: widthPercentageToDP(10),
        }}>
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
                onPress={() => {
                  setSelectedIndex(index);
                }}
                style={{
                  backgroundColor:
                    selectedIndex === index ? '#54B8ED' : 'white',
                  marginTop: widthPercentageToDP(20),
                  width: widthPercentageToDP(70),
                  height: widthPercentageToDP(30),
                  padding: widthPercentageToDP(5),
                  marginRight: widthPercentageToDP(10),
                  borderWidth: widthPercentageToDP(1),
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
    </TopContainerView>
  );
};
export default connect((state) => ({
  hospital_detail: state.common.hospital_detail,
}))(Calendars);
