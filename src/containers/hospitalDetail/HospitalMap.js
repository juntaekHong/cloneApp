import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {TopContainerView, StandardView} from '../../components/common/View';
import {NBGBText} from '../../components/common/Text';
import {widthPercentageToDP} from '../../utils/util';
import {
  LegView,
  AddressView,
  DetailContainerView,
  DetailTitleView,
  DetailView,
  Map,
} from '../../components/homeDetail/View';
import {UIActivityIndicator} from 'react-native-indicators';
import {CommonActions} from '../../store/actionCreator';

const HospitalMap = ({
  start_end,
  hospital_detail,
  end_address,
  startLat,
  startLong,
  endLat,
  endLong,
  abstract_map,
  detail_map,
}) => {
  // 시작, 도착 위도&경도
  const [origin, setOrigin] = useState({
    latitude: startLat,
    longitude: startLong,
  });
  const [destination, setDestination] = useState({
    latitude: endLat,
    longitude: endLong,
  });
  // 간략 데이터
  const [legs, setLegs] = useState(abstract_map ? abstract_map : null);
  // 상세 데이터
  const [detailData, setDetailData] = useState(detail_map ? detail_map : null);
  // 유의사항 문구
  const warning =
    '* 도보 경로는 베타 서비스입니다.\n   주의 – 이 경로에는 인도 또는 보행 경로가 누락되었을 수도 있습니다';

  useEffect(() => {
    // 대략적인 시간 정보
    if (start_end !== null && start_end.length !== 0) {
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
      CommonActions.handleAbstractMapAction(aboutTimeInfo);

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
      CommonActions.handleDetailMapAction(list);
    }

    return async () => {
      await CommonActions.handleStartEndInit();
    };
  }, [start_end]);

  return (
    <TopContainerView marginTop={10} marginBottom={100}>
      {legs === null && (abstract_map === null || detail_map === null) ? (
        <UIActivityIndicator size={widthPercentageToDP(30)} color={'gray'} />
      ) : (
        <StandardView>
          {/* 지도 뷰 */}
          <Map
            distance={legs.distance}
            origin={origin}
            destination={destination}
            // 마커 표시
            start_address={legs.start_address}
            end_address={end_address}
          />
          {/* 간략 길찾기 정보 뷰 */}
          <LegView legs={legs} />
          <AddressView marginLeft={10} marginRight={10}>
            <NBGBText marginTop={10} fontSize={12} numberOfLines={2}>
              출발지: {legs.start_address}
            </NBGBText>
            <NBGBText marginTop={10} fontSize={12} numberOfLines={2}>
              도착지: {end_address}
            </NBGBText>
          </AddressView>
          {/* 상세 길찾기 정보 뷰*/}
          <DetailContainerView>
            <DetailTitleView>
              <NBGBText>상세 길찾기 정보</NBGBText>
            </DetailTitleView>
            <DetailView
              detail={detailData}
              start={legs.start}
              end={legs.end}
              start_address={legs.start_address}
              end_address={end_address}
              warning={warning}
            />
          </DetailContainerView>
        </StandardView>
      )}
    </TopContainerView>
  );
};

export default connect(state => ({
  hospital_detail: state.common.hospital_detail,
  start_end: state.common.start_end,

  abstract_map: state.common.abstract_map,
  detail_map: state.common.detail_map,
}))(HospitalMap);
