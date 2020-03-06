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
  const [detailData, setDetailData] = useState();
  // 유의사항 문구
  const warning =
    '도보 경로는 베타 서비스입니다. 주의 – 이 경로에는 인도 또는 보행 경로가 누락되었을 수도 있습니다';

  useEffect(() => {}, [detailData]);

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
          detail.travel_mode = item.travel_mode;
          detail.distance = item.distance.text;
          detail.duration = item.duration.text;
          detail.html_instructions = item.html_instructions;
          detail.travel_mode = item.travel_mode;

          // 문자열로 전달 => flatlist 에서 파싱
          list.push(JSON.stringify(detail));
        } else if (item.travel_mode === 'TRANSIT') {
          // 버스 시 처리 코드
          detail.travel_mode = item.travel_mode;
          // 거리, 소요 시간, xx행
          detail.distance = item.distance.text;
          detail.duration = item.duration.text;
          detail.html_instructions = item.html_instructions;
          // 출발 정류장 이름, 출발 시간
          detail.departure_stop_name = item.transit_details.departure_stop.name;
          detail.departure_time_text = item.transit_details.departure_time.text;
          // 도착 정류장 이름, 도착 시간
          detail.arrival_stop_name = item.transit_details.arrival_stop.name;
          detail.arrival_time_text = item.transit_details.arrival_time.text;
          // 예상 대기시간, 정류장 개수
          detail.headway = item.transit_details.headway;
          detail.num_stops = item.transit_details.num_stops;
          // 타야되는 버스명
          detail.short_name = item.transit_details.line.short_name;

          // 문자열로 전달 => flatlist 에서 파싱
          list.push(JSON.stringify(detail));
        }
      });

      setDetailData(list);
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
