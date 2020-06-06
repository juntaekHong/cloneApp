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
      today.getDay() < 10
        ? '0' + String(today.getDay())
        : String(today.getDay());
    let now = year + month + day;

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
          !result.data.response.body &&
          result.data.response.body.totalCount === 0
        ) {
          let preDay =
            today.getDay() < 10
              ? '0' + String(today.getDay() - 1)
              : String(today.getDay() - 1);
          now = year + month + preDay;

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
            .then(async results => {
              // console.log('1', results.data.response.body.items.item);
              await dispatch(
                covidListAction(results.data.response.body.items.item),
              );
            });
        }
        if (result.data.response.body) {
          // console.log('2', result.data.response.body.items.item);
          await dispatch(covidListAction(result.data.response.body.items.item));
        }
      })
      .catch(async e => {
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
              !result.data.response.body &&
              result.data.response.body.totalCount === 0
            ) {
              let preDay =
                today.getDay() < 10
                  ? '0' + String(today.getDay() - 1)
                  : String(today.getDay() - 1);
              now = year + month + preDay;

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
                .then(async results => {
                  // console.log('3', results.data.response.body.items.item);
                  await dispatch(
                    covidListAction(results.data.response.body.items.item),
                  );
                });
            }
            if (result.data.response.body) {
              // console.log('4', result.data.response.body.items.item);
              await dispatch(
                covidListAction(result.data.response.body.items.item),
              );
            }
          });
      });
  } catch (e) {
    // 병원 리스트 공공 api 요청 실패 => 서버 연동 실패
    console.log('covid list insert fail');
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
