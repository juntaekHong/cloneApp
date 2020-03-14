/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView} from 'react-native';
import {WebView} from 'react-native-webview';
import {TopView} from '../../components/common/View';

const KakaoMap = props => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <TopView
        marginBottom={5}
        title={'카카오 지도'}
        backHandler={() => {
          props.navigation.goBack();
        }}
        closeBtn={false}
        searchBtn={false}
      />
      <WebView source={{uri: props.navigation.state.params.uri}} />
    </SafeAreaView>
  );
};

export default KakaoMap;
