/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {TopContainerView, TopView, BTN} from '../../components/common/View';
import {BoardSearchView} from '../../components/community/View';
import {CommunityActions} from '../../store/actionCreator';
import {ScrollView, FlatList} from 'react-native';
import {widthPercentageToDP} from '../../utils/util';
import {NBGText} from '../../components/common/Text';

const Community = props => {
  // 검색어
  const [searchText, setSearchText] = useState('');

  // 해쉬태그 데이터
  const [hashTagData, setHashTagData] = useState([]);

  useEffect(() => {
    const promise1 = CommunityActions.listHashtag();

    Promise.all([promise1]).then(async () => {
      await setHashTagData(props.hashTagList);
    });
  }, []);

  return (
    <TopContainerView>
      <TopView
        marginBottom={5}
        title={'게시판 페이지'}
        backBtn={false}
        closeBtn={false}
        searchBtn={false}
      />
      <ScrollView>
        <BoardSearchView
          marginHorizontal={30}
          borderRadius={15}
          innerPaddingVertical={15}
          innerPaddingHorizontal={15}
          onChangeText={async text => {
            await setSearchText(text);
          }}
          value={searchText}
          // 검색 버튼 핸들러
          searchHandler={() => {}}
        />
        <FlatList
          style={{
            flexGrow: 1,
            width: '100%',
            height: widthPercentageToDP(40),
            marginTop: widthPercentageToDP(10),
            paddingHorizontal: widthPercentageToDP(10),
          }}
          horizontal={true}
          keyExtractor={(item, index) => index.toString()}
          data={hashTagData}
          renderItem={({item, index}) => {
            return (
              <BTN
                style={{
                  justifyContent: 'center',
                  paddingHorizontal: widthPercentageToDP(10),
                  marginHorizontal: widthPercentageToDP(10),
                }}>
                <NBGText color={'#0066CC'}>#{item.hashtagName}</NBGText>
              </BTN>
            );
          }}
        />
      </ScrollView>
    </TopContainerView>
  );
};

export default connect(state => ({
  hashTagList: state.community.hashTagList,
}))(Community);
