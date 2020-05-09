/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {TopContainerView, TopView} from '../../components/common/View';
import {List} from '../../components/common/DataList';
import {CommonActions} from '../../store/actionCreator';
import {widthPercentageToDP} from '../../utils/util';
import {UIActivityIndicator} from 'react-native-indicators';

const SearchResult = props => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    let listData = [];
    let data;

    const promise1 = props.searchList.map(async item => {
      data = await CommonActions.getHospital(item._source.hpid._text);
      await listData.push(data);
    });

    Promise.all([promise1]).then(async () => {
      await setData(listData);
      await setLoading(false);
    });
  }, [props.searchList]);

  return (
    <TopContainerView>
      <TopView
        marginBottom={5}
        title={`검색결과`}
        backBtn={true}
        backHandler={() => {
          props.navigation.goBack();
        }}
        closeBtn={false}
        searchBtn={false}
      />
      {loading ? (
        <UIActivityIndicator color={'gray'} size={widthPercentageToDP(500)} />
      ) : (
        <List data={data} navigation={props.navigation} />
      )}
    </TopContainerView>
  );
};

export default connect(state => ({
  searchList: state.search.searchList,
}))(SearchResult);
