/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TopContainerView, TopView} from '../../components/common/View';
import {WebView} from 'react-native-webview';
import {UIActivityIndicator} from 'react-native-indicators';
import {widthPercentageToDP} from '../../utils/util';

const UserOpinion = props => {
  return (
    <TopContainerView>
      <TopView
        marginBottom={5}
        title={'사용자 의견 보내기'}
        backBtn={true}
        backHandler={() => {
          props.navigation.goBack();
        }}
        closeBtn={false}
        searchBtn={false}
      />
      <WebView
        source={{
          uri: 'https://forms.gle/XoWXU2oYjnGTcy2x5',
        }}
        renderLoading={() => {
          return (
            <UIActivityIndicator
              style={{justifyContent: 'flex-start'}}
              color={'gray'}
              size={widthPercentageToDP(30)}
            />
          );
        }}
        startInLoadingState={true}
      />
    </TopContainerView>
  );
};

export default UserOpinion;
