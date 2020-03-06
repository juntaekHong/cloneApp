import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {TopContainerView} from '../../components/common/View';
import {CommonActions} from '../../store/actionCreator';
import {NBGBText, NBGLText} from '../../components/common/Text';
import {widthPercentageToDP} from '../../utils/util';
import {LegView} from '../../components/homeDetail/View';

// Test
// const DATA = [
//   {
//     bounds: {
//       northeast: {
//         lat: 37.531635,
//         lng: 127.0826174,
//       },
//       southwest: {
//         lat: 37.5315283,
//         lng: 127.080739,
//       },
//     },
//     copyrights: 'Map data ©2020 SK telecom',
//     legs: [
//       {
//         arrival_time: {
//           text: '오전 10:19',
//           time_zone: 'Asia/Seoul',
//           value: 1583457589,
//         },
//         departure_time: {
//           text: '오전 10:09',
//           time_zone: 'Asia/Seoul',
//           value: 1583456966,
//         },
//         distance: {
//           text: '0.3 km',
//           value: 279,
//         },
//         duration: {
//           text: '10분',
//           value: 623,
//         },
//         end_address: '대한민국 서울특별시 자양2동 국민은행자양지점앞',
//         end_location: {
//           lat: 37.531606,
//           lng: 127.080739,
//         },
//         start_address: '대한민국 서울특별시 자양1동 국민은행자양지점앞',
//         start_location: {
//           lat: 37.531635,
//           lng: 127.081353,
//         },
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
//             end_location: {
//               lat: 37.53154,
//               lng: 127.082618,
//             },
//             html_instructions: '성자초등학교앞까지 도보',
//             polyline: {
//               points: 'wkadFmqsfWR}F',
//             },
//             start_location: {
//               lat: 37.531635,
//               lng: 127.081353,
//             },
//             steps: [
//               {
//                 distance: {
//                   text: '0.1 km',
//                   value: 112,
//                 },
//                 duration: {
//                   text: '2분',
//                   value: 113,
//                 },
//                 end_location: {
//                   lat: 37.53154,
//                   lng: 127.082618,
//                 },
//                 polyline: {
//                   points: 'wkadFmqsfWR}F',
//                 },
//                 start_location: {
//                   lat: 37.531635,
//                   lng: 127.081353,
//                 },
//                 travel_mode: 'WALKING',
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
  const [legs, setLegs] = useState(null);
  const [step, setStep] = useState();
  const warning =
    '도보 경로는 베타 서비스입니다. 주의 – 이 경로에는 인도 또는 보행 경로가 누락되었을 수도 있습니다';

  useEffect(() => {
    // 대략적인 시간 정보
    if (start_end !== null) {
      const CustomData = start_end[0].legs[0];

      const aboutTimeInfo = new Object();

      aboutTimeInfo.start = CustomData.departure_time.text;
      aboutTimeInfo.distance = CustomData.distance.text;
      aboutTimeInfo.duration = CustomData.duration.text;
      aboutTimeInfo.end = CustomData.arrival_time.text;

      setLegs(aboutTimeInfo);
    }
  }, [start_end]);

  return (
    <TopContainerView marginTop={10}>
      <LegView legs={legs} />
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
