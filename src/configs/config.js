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
  signDataKey: ['token', 'userId', 'pass_locking', 'lock_pass'],
};

export default config;
