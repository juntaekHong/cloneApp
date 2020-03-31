/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import {CustomTopView} from '../../components/home/View';
import {List} from '../../components/common/DataList';

const HospitalList = props => {
  const [data, setData] = useState(props.hospitalList);
  const [name, setName] = useState(props.navigation.state.params.object);

  // 홈(메인) 페이지에서 항목에 맞는 병원 리스트만 보여지는 것으로 가정.

  useEffect(() => {
    const Matching = findData => {
      let searchData = [];

      let MatchingData = data.map((item, index) => {
        if (item.dutyName.indexOf(findData) !== -1) {
          return searchData.push(item);
        }
      });

      return searchData;
    };

    setData(Matching(name));
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <CustomTopView
        settingLocation={props.address}
        height={55}
        navigation={props.navigation}
      />
      <List data={data} navigation={props.navigation} />
    </SafeAreaView>
  );
};

export default connect(state => ({
  address: state.common.address,
  hospitalList: state.common.hospitalList,
}))(HospitalList);
