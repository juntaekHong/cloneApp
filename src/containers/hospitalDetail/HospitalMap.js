import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {TopContainerView} from '../../components/common/View';
import {CommonActions} from '../../store/actionCreator';
import {NBGBText, NBGLText} from '../../components/common/Text';
import {widthPercentageToDP} from '../../utils/util';
import {
  LegView,
  AddressView,
  DetailView,
} from '../../components/homeDetail/View';

const HospitalMap = ({start_end}) => {
  // 간략 데이터
  const [legs, setLegs] = useState(null);
  // 상세 데이터
  const [detailData, setDetailData] = useState(null);
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

      // Extra List
      let list = [];
      // 상세 길찾기 데이터 - 도보&버스 구분
      Abstract.steps.map((item, index) => {
        let detail = new Object();
        if (item.travel_mode === 'WALKING') {
          // 도보 시 처리 코드
          detail.distance = item.distance.text;
          detail.duration = item.duration.text;
          detail.html_instructions = item.html_instructions;
          detail.travel_mode = item.travel_mode;

          list.push(detail);
        } else if (item.travel_mode === 'TRANSIT') {
          console.log('TRANSIT', item.travel_mode + ' / ' + index);
          // 버스 시 처리 코드
          // 거리, 소요 시간, xx행
          // distance, duration, html_instructions,
          // 출발 정류장 이름, 출발 시간
          // transit_details.departure_stop.name, transit_details.departure_time.text
          // 도착 정류장 이름, 도착 시간
          // transit_details.arrival_stop.name, transit_details.arrival_time.text
          // 예상 대기시간, 정류장 개수
          // transit_details.headway, transit_details.num_stops
          // 타야되는 버스명
          // transit_details.line.short_name
        }
      });
    }
  }, [start_end]);

  return (
    <TopContainerView marginTop={10}>
      {/* 간략 길찾기 정보 뷰 */}
      <LegView legs={legs} />
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
      {/* 상세 길찾기 정보 뷰*/}
      <NBGLText>{detailData}</NBGLText>
      <DetailView detail={detailData} />
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
