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
  hospital_url:
    'http://apis.data.go.kr/B552657/HsptlAsembySearchService/getHsptlMdcncLcinfoInqire',
  hospital_ServiceKey:
    'I2F%2B1Oce6drCgGSm33cvy%2F3uLnHQ4BY46ALKDYUbKqPqslTOBJTUzx1yH%2FPt%2FsnttC0mZeVuTudJWDJ70xLCnw%3D%3D',
  signDataKey: ['token', 'userId', 'pass_locking', 'lock_pass'],
};

export default config;
