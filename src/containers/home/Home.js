/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {NavigationEvents} from 'react-navigation';
// import LottieView from 'lottie-react-native';
import {connect} from 'react-redux';
import {
  TopContainerView,
  StandardView,
  BTN,
} from '../../components/common/View';
import {TopView, HomeAd, CovidView} from '../../components/home/View';
import {DataList} from '../../components/home/DataList';
import {ScrollView} from 'react-native-gesture-handler';
import {NBGBText, NBGText} from '../../components/common/Text';
import {
  widthPercentageToDP,
  storeData,
  getData,
  removeData,
} from '../../utils/util';
import {CovidActions} from '../../store/actionCreator';
import {Platform} from 'react-native';
import OneSignal from 'react-native-onesignal';

// 병원별 이미지 및 타이틀
const DATA = [
  {
    image: require('../../../assets/image/home/star.png'),
    // 일단 임시
    title: '즐겨찾는\n병원',
    // 추가 필요
    hospitalCategoryName: '즐겨찾기',
  },
  {
    image: require('../../../assets/image/home/hospital.png'),
    // 일단 임시
    title: '모든 병원',
    // 추가 필요
    hospitalCategoryName: '모두',
  },
  {
    image: require('../../../assets/image/home/hospital.png'),
    title: '군)\n병원',
    // 추가 필요
    hospitalCategoryName: '보건(의료원)소',
  },
  {
    image: require('../../../assets/image/home/fetus.png'),
    title: '산부인과',
    hospitalCategoryName: '산부인과',
  },
  {
    image: require('../../../assets/image/home/stomach.png'),
    title: '내과',
    hospitalCategoryName: '내과',
  },
  {
    image: require('../../../assets/image/home/doctor.png'),
    title: '외과',
    hospitalCategoryName: '외과',
  },
  {
    image: require('../../../assets/image/home/acupuncture.png'),
    title: '한의원',
    hospitalCategoryName: '한의원',
  },
  {
    image: require('../../../assets/image/home/tooth.png'),
    title: '치과',
    hospitalCategoryName: '치과',
  },
  {
    image: require('../../../assets/image/home/ear.png'),
    title: '이비인후과',
    hospitalCategoryName: '이비인후과',
  },
  {
    image: require('../../../assets/image/home/injury.png'),
    title: '정형외과',
    hospitalCategoryName: '정형외과',
  },
  {
    image: require('../../../assets/image/home/healthcare-and-medical.png'),
    title: '성형외과',
    hospitalCategoryName: '성형외과',
  },
  {
    image: require('../../../assets/image/home/mental-health.png'),
    title: '정신건강의학과',
    hospitalCategoryName: '정신건강의학과',
  },
  {
    image: require('../../../assets/image/home/pill.png'),
    title: '약국',
    hospitalCategoryName: '약국',
  },
  {
    image: require('../../../assets/image/home/facial-treatment.png'),
    title: '피부과',
    hospitalCategoryName: '피부과',
  },
  {
    image: require('../../../assets/image/home/vision.png'),
    title: '안과',
    hospitalCategoryName: '안과',
  },
  {
    image: require('../../../assets/image/home/pediatrics.png'),
    title: '소아과',
    hospitalCategoryName: '소아',
  },
];

const Home = props => {
  const lottie = useRef(null);

  const [covidVisible, setCovidVisble] = useState(false);

  useEffect(() => {
    props.covidList.length === 0 ? CovidActions.getCovidList() : null;
  }, [props.covidList]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      OneSignal.init('ffaa627f-c0ab-48a5-92ff-aab4aba972f3');
      OneSignal.inFocusDisplaying(2);

      OneSignal.addEventListener('received', this.onReceived);
      OneSignal.addEventListener('opened', this.onOpened);
      OneSignal.addEventListener('ids', this.onIds);

      OneSignal.getPermissionSubscriptionState(async status => {
        await removeData('playerId');
        await storeData('playerId', status.userId);
      });
    }
  }, []);

  return (
    <TopContainerView>
      <TopView
        settingLocation={props.address}
        height={55}
        justifyContent={'center'}
        navigation={props.navigation}
      />
      <ScrollView>
        {props.covidList.length > 0 ? (
          <StandardView
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: widthPercentageToDP(15),
              marginBottom: widthPercentageToDP(5),
            }}>
            <BTN
              onPress={() => {
                setCovidVisble(!covidVisible);
              }}>
              <NBGBText color={'#53A6EC'}>
                {covidVisible ? '코로나 현황' : '코로나 현황 보기'}
              </NBGBText>
            </BTN>
            <StandardView>
              <NBGText>* 기준일: {props.covidList[0].stdDay}</NBGText>
              {covidVisible ? (
                <NBGText>* 등록일: {props.covidList[0].createDt}</NBGText>
              ) : null}
            </StandardView>
          </StandardView>
        ) : null}
        <CovidView data={covidVisible ? props.covidList : []} />
        {/* 광고 배너 뷰 작업 */}
        <NavigationEvents
          onWillFocus={() => {
            try {
              if (lottie.current) lottie.current.play();
            } catch (e) {}
          }}
          onWillBlur={() => {
            try {
              if (lottie.current) lottie.current.play();
            } catch (e) {}
          }}
        />

        {/* 임시로 아무 이미지 광고 배너 넣음. */}
        <HomeAd
          list={[
            {
              noticeIndex: 1,
              noticeImg: require('../../../assets/image/1.png'),
              info: null,
              createdAt: '2019-05-23T18:21:20.000Z',
              updatedAt: '2019-09-23T10:37:20.000Z',
            },
            {
              noticeIndex: 2,
              noticeImg: require('../../../assets/image/2.png'),
              info: null,
              createdAt: '2019-02-12T23:02:06.000Z',
              updatedAt: '2019-09-01T10:45:48.000Z',
            },
          ]}
        />
        <DataList data={DATA} navigation={props.navigation} />
      </ScrollView>
    </TopContainerView>
  );
};

export default connect(state => ({
  address: state.common.address,
  covidList: state.covid.covidList,
}))(Home);
