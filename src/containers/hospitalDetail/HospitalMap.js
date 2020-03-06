import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {TopContainerView} from '../../components/common/View';
import {CommonActions} from '../../store/actionCreator';
import {NBGBText, NBGLText} from '../../components/common/Text';
import {widthPercentageToDP} from '../../utils/util';
import {LegView, AddressView} from '../../components/homeDetail/View';

// Test
// const DATA = [
//         steps: [
//           {
//             distance: {
//               text: '0.1 km',
//               value: 112,
//             },
//             duration: {
//               text: '2분',
//               value: 113,
//             },
//             html_instructions: '성자초등학교앞까지 도보',
//               },
//             ],
//             travel_mode: 'WALKING',
//           },
//           {
//             distance: {
//               text: '0.1 km',
//               value: 116,
//             },
//             duration: {
//               text: '1분',
//               value: 38,
//             },
//             end_location: {
//               lat: 37.531602,
//               lng: 127.081327,
//             },
//             html_instructions: '버스 신자초교행',
//             polyline: {
//               points: 'ckadFkysfWA?BdA?J?t@OvB?@@?',
//             },
//             start_location: {
//               lat: 37.53154,
//               lng: 127.082618,
//             },
//             transit_details: {
//               arrival_stop: {
//                 location: {
//                   lat: 37.531602,
//                   lng: 127.081327,
//                 },
//                 name: '국민은행자양지점앞',
//               },
//               arrival_time: {
//                 text: '오전 10:18',
//                 time_zone: 'Asia/Seoul',
//                 value: 1583457537,
//               },
//               departure_stop: {
//                 location: {
//                   lat: 37.53154,
//                   lng: 127.082618,
//                 },
//                 name: '성자초등학교앞',
//               },
//               departure_time: {
//                 text: '오전 10:18',
//                 time_zone: 'Asia/Seoul',
//                 value: 1583457499,
//               },
//               headsign: '신자초교',
//               headway: 420,
//               line: {
//                 agencies: [
//                   {
//                     name: '서울특별시버스운송사업조합',
//                     url:
//                       'http://www.odsay.com/Bus/Seoul_Main.asp?CID=1000&LMenu=1',
//                   },
//                 ],
//                 color: '#0abb0c',
//                 name: '서울 마을버스',
//                 short_name: '광진05',
//                 text_color: '#ffffff',
//                 vehicle: {
//                   icon: '//maps.gstatic.com/mapfiles/transit/iw2/6/bus2.png',
//                   name: '버스',
//                   type: 'BUS',
//                 },
//               },
//               num_stops: 1,
//             },
//             travel_mode: 'TRANSIT',
//           },
//           {
//             distance: {
//               text: '51 m',
//               value: 51,
//             },
//             duration: {
//               text: '1분',
//               value: 52,
//             },
//             end_location: {
//               lat: 37.531606,
//               lng: 127.080739,
//             },
//             html_instructions:
//               '대한민국 서울특별시 자양2동 국민은행자양지점앞까지 도보',
//             polyline: {
//               points: 'okadFiqsfWAtB',
//             },
//             start_location: {
//               lat: 37.531602,
//               lng: 127.081327,
//             },
//             steps: [
//               {
//                 distance: {
//                   text: '51 m',
//                   value: 51,
//                 },
//                 duration: {
//                   text: '1분',
//                   value: 52,
//                 },
//                 end_location: {
//                   lat: 37.531606,
//                   lng: 127.080739,
//                 },
//                 polyline: {
//                   points: 'okadFiqsfWAtB',
//                 },
//                 start_location: {
//                   lat: 37.531602,
//                   lng: 127.081327,
//                 },
//                 travel_mode: 'WALKING',
//               },
//             ],
//             travel_mode: 'WALKING',
//           },
//         ],
//         traffic_speed_entry: [],
//         via_waypoint: [],
//       },
//     ],
//     overview_polyline: {
//       points: 'wkadFmqsfWP}FBpA?t@OvB@@AtB',
//     },
//     summary: '',
//     warnings: [
//       '도보 경로는 베타 서비스입니다. 주의 – 이 경로에는 인도 또는 보행 경로가 누락되었을 수도 있습니다.',
//     ],
//     waypoint_order: [],
//   },
// ];

const HospitalMap = ({start_end}) => {
  // 간략 데이터
  const [legs, setLegs] = useState(null);
  // 상세 데이터
  const [detailData, setDetailData] = useState();
  // 유의사항 문구
  const warning =
    '도보 경로는 베타 서비스입니다. 주의 – 이 경로에는 인도 또는 보행 경로가 누락되었을 수도 있습니다';

  useEffect(() => {
    // 대략적인 시간 정보
    if (start_end !== null) {
      // 간략 길찾기 데이터
      const Abstract = start_end[0].legs[0];

      const aboutTimeInfo = new Object();

      aboutTimeInfo.start = Abstract.departure_time.text;
      aboutTimeInfo.distance = Abstract.distance.text;
      aboutTimeInfo.duration = Abstract.duration.text;
      aboutTimeInfo.end = Abstract.arrival_time.text;
      aboutTimeInfo.start_address = Abstract.start_address;
      aboutTimeInfo.end_address = Abstract.end_address;

      setLegs(aboutTimeInfo);

      // 상세 길찾기 데이터 - 도보&버스 구분
      // Abstract.steps.map((item, index) => {
      //   if (item.travel_mode === 'WALKING') {
      //     console.log('WALKING', item.travel_mode + ' / ' + index);
      //     // 도보 시 처리 코드
      //   } else if (item.travel_mode === 'TRANSIT') {
      //     console.log('TRANSIT', item.travel_mode + ' / ' + index);
      //     // 버스 시 처리 코드
      //   }
      // });
      setDetailData(Abstract.steps);
    }
  }, [start_end]);

  return (
    <TopContainerView marginTop={10}>
      {/* 간략 길찾기 정보 뷰 */}
      <LegView legs={legs} />
      {/* 상세 길찾기 정보 뷰*/}
      {legs !== null ? (
        <AddressView marginLeft={10} marginRight={10}>
          <NBGBText marginTop={10} fontSize={12} numberOfLines={2}>
            출발지: {legs.start_address}
          </NBGBText>
          <NBGBText marginTop={10} fontSize={12} numberOfLines={2}>
            도착지: {legs.end_address}
          </NBGBText>
        </AddressView>
      ) : null}
      <NBGLText
        marginTop={10}
        marginLeft={10}
        marginRight={10}
        color={'red'}
        fontSize={10}>
        * {warning}
      </NBGLText>
    </TopContainerView>
  );
};

export default connect(state => ({
  start_end: state.common.start_end,
}))(HospitalMap);
