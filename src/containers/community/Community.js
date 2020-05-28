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
  const [listEnd, setListEnd] = useState();

  useEffect(() => {
    CommunityActions.listHashtag();
    CommunityActions.postList(undefined, {offset: 10, page: 1});
  }, []);

  return (
    <TopContainerView>
      <TopView
        marginBottom={5}
        title={'게시판 페이지'}
        backBtn={false}
        closeBtn={false}
        searchBtn={false}
        refreshBtn={true}
        refreshHandler={async () => {
          await CommunityActions.handlePostListInit();
          await setListEnd();
          await CommunityActions.postList(undefined, {offset: 10, page: 1});
        }}
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
          await CommunityActions.handlePostListInit();
          await setListEnd();
          const pn = {offset: 10, page: 1};

          await CommunityActions.postList(searchText, pn);
        }}
      />
      {/* 해쉬 리스트 뷰 */}
      <StandardView
        style={{
          marginTop: widthPercentageToDP(10),
          height: widthPercentageToDP(40),
        }}>
        <HashListView
          data={props.hashTagList}
          searchHandler={async hashTag => {
            await CommunityActions.handlePostListInit();
            await setListEnd();
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
          let listTotal;

          let list_end;

          if (length !== 0 && length % 9 === 0) {
            listTotal = parseInt(length / 9) + 1;
          } else {
            listTotal = 1;
          }

          if (listTotal !== 1 && listEnd !== 0) {
            const pn = {offset: 10, page: listTotal};

            if (searchText !== '') {
              list_end = await CommunityActions.postList(searchText, pn);
            } else {
              list_end = await CommunityActions.postList(undefined, pn);
            }
            await setListEnd(list_end);
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
