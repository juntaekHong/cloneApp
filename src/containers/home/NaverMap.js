/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {WebView} from 'react-native-webview';
import {connect} from 'react-redux';
import {TopView, TopContainerView} from '../../components/common/View';
import {widthPercentageToDP} from '../../utils/util';
import {UIActivityIndicator} from 'react-native-indicators';

const NaverMap = props => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <TopView
        marginBottom={5}
        title={'네이버 지도'}
        backHandler={() => {
          props.navigation.goBack();
        }}
        closeBtn={true}
      />
      <WebView source={{uri: props.navigation.state.params.uri}} />
    </SafeAreaView>
  );
};

export default NaverMap;
