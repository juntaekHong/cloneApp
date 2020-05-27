/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {TopContainerView, TopView, BTN} from '../../components/common/View';
import {BoardSearchView} from '../../components/community/View';
import {CommunityActions} from '../../store/actionCreator';
import {ScrollView, FlatList} from 'react-native';
import {widthPercentageToDP} from '../../utils/util';
import {NBGText} from '../../components/common/Text';
import {HashListView} from '../../components/community/FlatList';

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
        {/* 게시판 검색 뷰 */}
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
        {/* 해쉬 리스트 뷰 */}
        <HashListView data={hashTagData} />
      </ScrollView>
    </TopContainerView>
  );
};

export default connect(state => ({
  hashTagList: state.community.hashTagList,
}))(Community);
