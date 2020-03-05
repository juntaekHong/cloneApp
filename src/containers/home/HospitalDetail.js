/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  Platform,
  View,
  Linking,
} from 'react-native';
import {connect} from 'react-redux';
import {
  TopView,
  TopContainerView,
  BTN,
  StandardView,
} from '../../components/common/View';
import {NBGText, NBGBText} from '../../components/common/Text';
import {Card, BottomView} from '../../components/home/View';
import {widthPercentageToDP} from '../../utils/util';
import {UIActivityIndicator} from 'react-native-indicators';
import {CustomModal} from '../../components/common/Modal';
import Swiper from 'react-native-swiper';
import OfficeHours from '../hospitalDetail/OfficeHours';
import {PagiNationTab} from '../../components/home/PagiNation';
import {CommonActions} from '../../store/actionCreator';
import HospitalMap from '../hospitalDetail/HospitalMap';
import HospitalReview from '../hospitalDetail/HospitalReview';

const HospitalDetail = props => {
  const [detailData, setDetailData] = useState(props.hospital_detail);

  const [NameEncoding, setNameEncoding] = useState();
  // 길찾기 클릭 시, 길찾기 모달(알림창) visible
  const [roadMapModal, setRoadMapModal] = useState(false);
  // 택시 모달
  const [taxiModal, setTaxiModal] = useState(false);

  // 병원 상세 데이터가 들어오면 네이버 길찾기에 대한 한글 인코딩 해주는 것.
  useEffect(() => {
    setNameEncoding(encodeURI(encodeURIComponent(detailData.dutyName)));
  }, [detailData]);

  useEffect(() => {
    return async () => {
      await CommonActions.handlePageIndex(0);
    };
  }, []);

  // 탭 버튼 스와이프 연동
  const swipe = useRef();

  // 스와이프 후, 자동 상향 스크롤
  const focusing = useRef();

  const KakaoMapNaivgate = async () => {
    await Linking.openURL(
      'daummaps://search?q=' +
        detailData.dutyName +
        '&p=' +
        detailData.wgs84Lat +
        ',' +
        detailData.wgs84Lon +
        '',
    ).catch(async () => {
      await props.navigation.navigate('KakaoMap', {
        uri:
          'https://map.kakao.com/link/map/' +
          detailData.dutyName +
          ',' +
          detailData.wgs84Lat +
          ',' +
          detailData.wgs84Lon +
          '',
      });
    });
  };

  // 네이버 지도 앱 or 웹으로 길찾기 기능
  const NaverMapNavigate = async () => {
    await Linking.openURL(
      'nmap://place?lat=' +
        detailData.wgs84Lat +
        '&lng=' +
        detailData.wgs84Lon +
        '&name=' +
        detailData.dutyName +
        '&appname=클론프로젝트',
    ).catch(async () => {
      await props.navigation.navigate('NaverMap', {
        uri:
          'https://m.map.naver.com/directions/#/poiSearch/destination/' +
          NameEncoding,
      });
    });
  };

  // 카카오택시 앱 열기
  const KakaoTaxi = useCallback(async () => {
    await Linking.openURL('kakaotaxi://').catch(async () => {
      await setTaxiModal(true);
    });
  }, []);

  const openStore = useCallback(async () => {
    Platform.OS === 'android'
      ? await Linking.openURL(
          'https://play.google.com/store/apps/details?id=com.kakao.taxi',
        ).catch(() => {
          // 플레이 스토어 열기 실패 시
        })
      : await Linking.openURL(
          // 앱 스토어 테스트 불가. 일단, 모바일 웹페이지로 연결
          'https://apps.apple.com/kr/app/카카오-t/id981110422',
          // 밑에는 앱스토어 url 임.
          // http://itunes.apple.com/<country>/app/<app–name>/id<app-ID>?mt=8
        ).catch(() => {
          // 앱 스토어 열기 실패 시
        });
  }, []);

  const changPageIndex = useCallback(async index => {
    await CommonActions.handlePageIndex(index);
    await focusing.current.scrollTo({
      x: 0,
      y: widthPercentageToDP(290),
      animated: true,
    });
  }, []);

  return (
    <TopContainerView>
      <CustomModal
        width={300}
        height={220}
        visible={roadMapModal}
        close={false}
        children={
          <View style={{marginLeft: widthPercentageToDP(20)}}>
            <NBGBText fontSize={20}>길찾기 선택</NBGBText>
            <BTN
              onPress={async () => {
                await setRoadMapModal(false);
                await KakaoMapNaivgate();
              }}
              style={{marginTop: widthPercentageToDP(30)}}>
              <NBGText fontSize={17}>카카오맵으로 길찾기</NBGText>
            </BTN>
            <BTN
              onPress={async () => {
                await setRoadMapModal(false);
                await NaverMapNavigate();
              }}
              style={{
                marginTop: widthPercentageToDP(30),
              }}>
              <NBGText fontSize={17}>네이버지도로 길찾기</NBGText>
            </BTN>
          </View>
        }
        renderFooter={() => {
          return (
            <BTN
              style={{
                marginRight: widthPercentageToDP(30),
                marginBottom: widthPercentageToDP(20),
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}
              onPress={async () => {
                await setRoadMapModal(false);
              }}>
              <NBGText fontSize={15}>취소</NBGText>
            </BTN>
          );
        }}
      />
      <CustomModal
        width={300}
        height={200}
        visible={taxiModal}
        close={false}
        children={
          <View style={{marginLeft: widthPercentageToDP(20)}}>
            <NBGBText fontSize={15}>카카오택시 앱이 없습니다.</NBGBText>
            <StandardView style={{marginTop: widthPercentageToDP(30)}}>
              <NBGText fontSize={13}>
                {
                  '카카오택시 앱이\n설치되어 있지 않습니다.\n카카오택시앱을 설치 하시겠습니까?'
                }
              </NBGText>
            </StandardView>
          </View>
        }
        renderFooter={() => {
          return (
            <StandardView
              style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <BTN
                style={{
                  marginRight: widthPercentageToDP(30),
                  marginBottom: widthPercentageToDP(20),
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}
                onPress={async () => {
                  await setTaxiModal(false);
                }}>
                <NBGText fontSize={15}>취소</NBGText>
              </BTN>
              <BTN
                style={{
                  marginRight: widthPercentageToDP(30),
                  marginBottom: widthPercentageToDP(20),
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}
                onPress={async () => {
                  await setTaxiModal(false);
                  await openStore();
                }}>
                <NBGText fontSize={15}>설치</NBGText>
              </BTN>
            </StandardView>
          );
        }}
      />
      <TopView
        marginBottom={5}
        title={detailData.dutyName}
        backHandler={() => {
          props.navigation.goBack(null);
        }}
        closeBtn={false}
        searchBtn={false}
        sharedBtn={true}
        sharedHandler={() => {}}
      />
      <ScrollView ref={focusing}>
        <Card
          hospitalName={detailData.dutyName}
          rating={4.0}
          reviewCount={50}
          dutyAddr={detailData.dutyAddr}
          dutyMapimg={detailData.dutyMapimg}
          isSrap={false}
          phoneNumber={detailData.dutyTel1}
          naviModal={async () => {
            await setRoadMapModal(true);
          }}
          taxiModal={async () => {
            await KakaoTaxi();
          }}
        />
        <PagiNationTab
          index={props.page_index}
          page1={{title: '진료시간 정보', index: 0}}
          page2={{title: '길찾기', index: 1}}
          page3={{title: '리뷰', index: 2}}
          onPress={async index => {
            if (props.page_index !== index) {
              await swipe.current.scrollBy(index - props.page_index);
            }
          }}
        />
        <View
          style={{
            flex: 1,
            minHeight: widthPercentageToDP(340),
          }}>
          <Swiper
            ref={swipe}
            height={'100%'}
            index={props.page_index}
            onIndexChanged={async index => {
              await changPageIndex(index);
            }}
            loop={false}
            showsPagination={false}>
            <OfficeHours />
            <HospitalMap />
            <HospitalReview />
          </Swiper>
        </View>
      </ScrollView>
      {/* 예약 페이지로 이동 */}
      <BottomView reservation={() => {}} />
    </TopContainerView>
  );
};

export default connect(state => ({
  hospital_detail: state.common.hospital_detail,
  page_index: state.common.page_index,

  latitude: state.common.latitude,
  longitude: state.common.longitude,
}))(HospitalDetail);
