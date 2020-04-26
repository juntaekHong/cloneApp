/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {TopContainerView, TopView} from '../../components/common/View';
import {List} from '../../components/common/DataList';

const MySubs = props => {
  return (
    <TopContainerView>
      <TopView
        marginBottom={5}
        title={'즐겨찾기 목록'}
        backBtn={true}
        backHandler={() => {
          props.navigation.goBack();
        }}
        closeBtn={false}
        searchBtn={false}
      />
      <List data={props.subscriber_list} navigation={props.navigation} />
    </TopContainerView>
  );
};

export default connect(state => ({
  subscriber_list: state.hospital.subscriber_list,
}))(MySubs);
