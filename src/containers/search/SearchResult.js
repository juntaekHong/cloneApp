/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {
  TopContainerView,
  TopView,
  StandardView,
} from '../../components/common/View';
import {List} from '../../components/common/DataList';
import {CommonActions, SearchActions} from '../../store/actionCreator';
import {widthPercentageToDP} from '../../utils/util';
import {UIActivityIndicator} from 'react-native-indicators';
import {NBGText} from '../../components/common/Text';

const SearchResult = props => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let listData = [];
    let searchData;
    let promise1;

    if (props.searchList !== undefined) {
      promise1 = props.searchList.map(async item => {
        searchData = await CommonActions.getHospital(item._source.hpid._text);
        searchData ? await listData.push(searchData) : null;
        setData(listData);
      });
    } else {
      setData(listData);
    }

    Promise.all([promise1]).then(async () => {
      await SearchActions.handleSearchLoading(false);
    });
  }, [props.searchList]);

  return (
    <TopContainerView>
      <TopView
        marginBottom={5}
        title={'검색결과'}
        backBtn={true}
        backHandler={() => {
          props.navigation.goBack();
        }}
        closeBtn={false}
        searchBtn={false}
      />
      {props.searchResultLoading ? (
        <UIActivityIndicator color={'gray'} size={widthPercentageToDP(30)} />
      ) : props.searchList === undefined ? (
        <StandardView
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <NBGText fontSize={18} color={'gray'}>
            데이터가 꺼져있거나 서버 오류로 인해 검색할 수 없습니다.
          </NBGText>
        </StandardView>
      ) : props.searchList.length === 0 ? (
        <StandardView
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <NBGText fontSize={18} color={'gray'}>
            검색 결과가 없습니다.
          </NBGText>
        </StandardView>
      ) : (
        <List data={data} navigation={props.navigation} />
      )}
    </TopContainerView>
  );
};

export default connect(state => ({
  searchResultLoading: state.search.searchResultLoading,
  searchList: state.search.searchList,
}))(SearchResult);
