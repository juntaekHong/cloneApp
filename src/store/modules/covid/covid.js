import {createAction, handleActions} from 'redux-actions';
import {produce} from 'immer';
import axios from 'axios';
import {parseString} from 'xml2js';
import config from '../../../configs/config';

const COVID_LIST = 'covid/COVID_LIST';

const covidListAction = createAction(COVID_LIST);

const initState = {
  covidList: [],
};

// 코로나관련 데이터
export const getCovidList = () => async dispatch => {
  try {
    let today = new Date();

    let year = String(today.getFullYear());
    let month =
      today.getMonth() < 9
        ? '0' + String(today.getMonth() + 1)
        : String(today.getMonth() + 1);
    let day =
      today.getDate() < 10
        ? '0' + String(today.getDate())
        : String(today.getDate());
    let now = year + month + day;

    let succuess;

    await axios
      .get(
        `${config.covid_url}serviceKey=${
          config.covid_serviceKey
        }&pageNo=1&numOfRows=10&startCreateDt=${now}&endCreateDt=${now}&`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      )
      .then(async result => {
        if (
          result.data.response.body &&
          result.data.response.body.totalCount !== 0
        ) {
          await dispatch(covidListAction(result.data.response.body.items.item));
          succuess = true;
          // console.log('1');
          return true;
        } else {
          // console.log('2');
          return false;
        }
      });

    if (!succuess) {
      await axios
        .get(
          `${config.covid_url}serviceKey=${
            config.covid_serviceKey
          }&pageNo=1&numOfRows=10&startCreateDt=${now}&endCreateDt=${now}&`,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          },
        )
        .then(async result => {
          if (
            result.data.response.body &&
            result.data.response.body.totalCount !== 0
          ) {
            await dispatch(
              covidListAction(result.data.response.body.items.item),
            );
            succuess = true;
            // console.log('3');
            return true;
          } else {
            // console.log('4');
            return false;
          }
        });
    }

    if (!succuess) {
      day =
        today.getDate() <= 10
          ? '0' + String(today.getDate() - 1)
          : String(today.getDate() - 1);
      now = year + month + day;

      await axios
        .get(
          `${config.covid_url}serviceKey=${
            config.covid_serviceKey
          }&pageNo=1&numOfRows=10&startCreateDt=${now}&endCreateDt=${now}&`,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          },
        )
        .then(async result => {
          if (
            result.data.response.body &&
            result.data.response.body.totalCount !== 0
          ) {
            await dispatch(
              covidListAction(result.data.response.body.items.item),
            );
            succuess = true;
            // console.log('5');
            return true;
          } else {
            // console.log('6');
            return false;
          }
        });
    }

    if (!succuess) {
      await axios
        .get(
          `${config.covid_url}serviceKey=${
            config.covid_serviceKey
          }&pageNo=1&numOfRows=10&startCreateDt=${now}&endCreateDt=${now}&`,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          },
        )
        .then(async result => {
          if (
            result.data.response.body &&
            result.data.response.body.items.totalCount !== 0
          ) {
            await dispatch(
              covidListAction(result.data.response.body.items.item),
            );
            succuess = true;
            // console.log('7');
            return true;
          } else {
            // console.log('8');
            return false;
          }
        });
    }
  } catch (e) {
    // 병원 리스트 공공 api 요청 실패 => 서버 연동 실패
    console.log('covid list insert fail');
    return false;
  }
};

export default handleActions(
  {
    [COVID_LIST]: (state, {payload}) =>
      produce(state, draft => {
        draft.covidList = payload;
      }),
  },
  initState,
);
