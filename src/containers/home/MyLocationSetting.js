/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {CustomModal} from '../../components/common/Modal';
import {TopContainerView, TopView} from '../../components/common/View';
// 내 위치 정보 확인
import {SearchView} from '../../components/myLocationSetting/View';
import {LocationActions} from '../../store/actionCreator';
import {SearchResult} from '../../components/myLocationSetting/FlatList';

const MyLocationSetting = props => {
  const [searchText, setSearchText] = useState();
  // 위치 설정 확인 페이지에서 위치 재설정 후, 돌와왔을 때, 실행
  const [alertModal, setAlertModal] = useState(false);

  // 페이지 unMount되면, 검색 데이터 삭제
  useEffect(() => {
    return async () => {
      await LocationActions.handleSearchAddressInit();
    };
  }, []);

  return (
    <TopContainerView>
      {/* <CustomModal
        width={300}
        height={180}
        visible={alertModal}
        close={false}
        children={
          <StandardView style={{marginLeft: widthPercentageToDP(20)}}>
            <NBGBText fontSize={20}>위치 재설정 확인 알림!</NBGBText>
            <NBGLText fontSize={15} marginTop={30}>
              {
                '위치가 변경되었습니다!\n\n홈으로 돌아가 위치 설정 주소를 확인해 보세요!'
              }
            </NBGLText>
          </StandardView>
        }
        renderFooter={() => {
          return <StandardView />;
        }}
      /> */}
      <TopView
        marginBottom={5}
        title={'위치 설정'}
        backHandler={() => {
          props.navigation.goBack(null);
        }}
        closeBtn={false}
        closeHandler={() => {
          props.navigation.goBack(null);
        }}
      />
      <SearchView marginTop={10} search={value => setSearchText(value)} />
      <SearchResult
        data={props.search_address}
        totalCount={props.search_total}
        searchText={searchText}
        navigation={props.navigation}
      />
    </TopContainerView>
  );
};

export default connect(state => ({
  address: state.common.address,
  latitude: state.common.latitude,
  longitude: state.common.longitude,
  hospitalList: state.common.hospitalList,

  search_address: state.location.search_address,
  search_total: state.location.search_total,
}))(MyLocationSetting);
