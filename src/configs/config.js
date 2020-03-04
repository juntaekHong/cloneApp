import navigators from '../utils/navigators';
import values from './values';

/**
 * 설정파일
 */

const init = {
  type: 'dev',
  server: {
    dev: '',
    prod: '',
  },
  mailServer: {
    dev: '',
    prod: '',
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
  searchAddress_url: 'http://map.vworld.kr/search.do?',
  searchAddress_ServiceKey: '1024C3D6-E691-3ADA-B8CD-8FF2406FC102',
  signDataKey: ['token', 'userId', 'pass_locking', 'lock_pass'],
};

export default config;
