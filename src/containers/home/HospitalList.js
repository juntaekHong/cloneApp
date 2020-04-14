/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import {CustomTopView} from '../../components/home/View';
import {List} from '../../components/common/DataList';
import {HospitalActions} from '../../store/actionCreator';

const HospitalList = props => {
  const [data, setData] = useState(
    props.navigation.state.params.hospitalCategoryName === '즐겨찾기'
      ? props.subscriber_list
      : props.hospitalList,
  );
  const [name, setName] = useState(
    props.navigation.state.params.hospitalCategoryName,
  );

  useEffect(() => {
    if (props.navigation.state.params.hospitalCategoryName === '즐겨찾기') {
      setData(props.subscriber_list);
    }
  }, [props.subscriber_list]);

  // 홈(메인) 페이지에서 항목에 맞는 병원 리스트만 보여지는 것으로 가정.
  useEffect(() => {
    const Matching = findData => {
      let searchData = [];

      data.map((item, index) => {
        item.category.map(categorys => {
          if (categorys.indexOf(findData) !== -1) {
            searchData.push(item);
          } else {
            return;
          }
        });
      });

      searchData = [...new Set(searchData)];

      if (findData === '모두') {
        return props.hospitalList;
      } else {
        if (searchData.length === 0) return;
      }

      return searchData;
    };

    if (name === undefined || name === '즐겨찾기') {
      if (name === '즐겨찾기') {
        HospitalActions.getAllHospitalSubscribers();
      } else {
        setData([]);
      }
    } else {
      setData(Matching(name));
    }
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

  subscriber_list: state.hospital.subscriber_list,
}))(HospitalList);
