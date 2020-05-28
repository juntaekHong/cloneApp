/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
  TopContainerView,
  TopView,
  StandardView,
} from '../../components/common/View';
import {BoardSearchView} from '../../components/community/View';
import {CommunityActions} from '../../store/actionCreator';
import {HashListView, PostListView} from '../../components/community/FlatList';
import {widthPercentageToDP} from '../../utils/util';

const Community = props => {
  // 검색어
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    CommunityActions.listHashtag();
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
      {/* 검색뷰 */}
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
        searchHandler={async () => {
          const pn = {offset: 10, page: 1};

          await CommunityActions.postList(searchText, pn);
        }}
      />
      {/* 해쉬 리스트 뷰 */}
      <StandardView style={{height: widthPercentageToDP(50)}}>
        <HashListView
          data={props.hashTagList}
          searchHandler={async hashTag => {
            const pn = {offset: 10, page: 1};

            await setSearchText(hashTag);
            await CommunityActions.postList(hashTag, pn);
          }}
        />
      </StandardView>
      <PostListView
        // 리스트 헤더뷰 (검색&해쉬태그 뷰)
        data={props.postList}
        searchHandler={async length => {
          let listTotal = length !== 0 ? parseInt(length / 10) + 1 : 1;

          if (listTotal !== 1) {
            const pn = {offset: 10, page: listTotal};

            await CommunityActions.postList(searchText, pn);
          }
        }}
      />
    </TopContainerView>
  );
};

export default connect(state => ({
  hashTagList: state.community.hashTagList,
  postList: state.community.postList,
}))(Community);
