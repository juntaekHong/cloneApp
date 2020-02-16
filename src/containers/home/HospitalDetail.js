/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, Text} from 'react-native';
import {TopView, TopContainerView} from '../../components/common/View';
import {widthPercentageToDP} from '../../utils/util';
import {UIActivityIndicator} from 'react-native-indicators';

const HospitalDetail = props => {
  return (
    <TopContainerView>
      <TopView
        marginBottom={5}
        title={'HospitalDetail Page'}
        backHandler={() => {
          props.navigation.goBack();
        }}
        closeHandler={() => {
          props.navigation.goBack();
        }}
      />
      <ScrollView>
        <Text>asd</Text>
      </ScrollView>
    </TopContainerView>
  );
};

export default HospitalDetail;
