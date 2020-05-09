/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {TopContainerView, TopView} from '../../components/common/View';

const SearchResult = props => {
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
    </TopContainerView>
  );
};

export default connect(state => ({}))(SearchResult);
