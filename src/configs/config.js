import navigators from '../utils/navigators';
import values from './values';

/**
 * 설정파일
 */

const init = {
  type: 'dev',
  server: {
    dev: 'http://ec2-15-164-221-39.ap-northeast-2.compute.amazonaws.com',
    prod: 'https://ppodeum.site',
  },
  mailServer: {
    dev: 'http://ec2-15-164-221-39.ap-northeast-2.compute.amazonaws.com',
    prod: 'https://ppodeum.site',
  },
};

const config = {
  server: init.server[init.type],
  mailServer: init.mailServer[init.type],
  // androidVersion: "x.x.x",
  // iosVersion: "x.x.x",

  // 출시 시...
  // iosStore: {
  //   appID: 123,
  //   appName: "cloneApp"
  // },
  // androidStore: {
  //   packageName: "com.cloneApp"
  // },

  // 병원 리스트 관련 공공 api
  hospital_url:
    'http://apis.data.go.kr/B552657/HsptlAsembySearchService/getHsptlMdcncLcinfoInqire',
  hospital_detail_url:
    'http://apis.data.go.kr/B552657/HsptlAsembySearchService/getHsptlBassInfoInqire',
  hospital_ServiceKey:
    'I2F%2B1Oce6drCgGSm33cvy%2F3uLnHQ4BY46ALKDYUbKqPqslTOBJTUzx1yH%2FPt%2FsnttC0mZeVuTudJWDJ70xLCnw%3D%3D',
  // 좌표 주소 변환 공공 api
  toAddress_url: 'http://apis.vworld.kr/coord2new.do',
  toAddress_ServiceKey: '597B78FF-588A-39E2-9559-6E64981C808F',
  // 위치 설정 페이지 주소 검색 api
  searchAddress_url: 'https://dapi.kakao.com/v2/local/search/address.json?',
  searchAddress_ServiceKey: 'KakaoAK fe71634c5b50df5707cc477469a282a5',
  // 병원 상세페이지 길찾기에 사용되는 api
  googleMaps_url: 'https://maps.googleapis.com/maps/api/directions/json?',
  googleMaps_ServiceKey: 'AIzaSyDgBRnXW2cAmBWKGd-EFo-P0cZ_zKKp5As',
  // 코로나 데이터 api
  covid_url:
    'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson?',
  covid_serviceKey:
    'EyyXmfDmrjacJ7QcXl3bKKYjcRUCT1GsuQIFDcJlSjkboDRxx0nJAXaoxNNWCFAIlPJ6HBqlmr5Zl4f6KTS0ZA%3D%3D',
  // 약국 데이터 api
  erm_url:
    'http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyLcinfoInqire?',
  // 약국 상세 데이터 api
  erm_detail_url:
    'http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyBassInfoInqire?',
  erm_serviceKey:
    'EyyXmfDmrjacJ7QcXl3bKKYjcRUCT1GsuQIFDcJlSjkboDRxx0nJAXaoxNNWCFAIlPJ6HBqlmr5Zl4f6KTS0ZA%3D%3D',

  signDataKey: [
    'token',
    'email',
    'user_name',
    'user_userNickName',
    'tel',
    'provider',
    'playerId',
  ],
};

export default config;
