import React, {useState, useRef, useEffect} from 'react';
import {connect} from 'react-redux';
import {TopContainerView, TopView} from '../../components/common/View';
import {SearchView} from '../../components/search/View';
import {SearchActions} from '../../store/actionCreator';
import {ScrollView} from 'react-native';
import {storeData, getData} from '../../utils/util';
import {handleSearchHistoryList} from '../../store/modules/search/search';

const Search = props => {
  const scrollRef = useRef(null);

  const [searchText, setSearchText] = useState('');
  // 검색 기록 데이터
  const [historyData, setHistoryData] = useState(props.searchHistoryList);

  // 자동 완성 기능 설정 유무
  const [autoCompleteSet, setAutoCompleteSet] = useState(false);

  return (
    <TopContainerView>
      <TopView title="검색 페이지" />
      <ScrollView ref={scrollRef}>
        <SearchView
          // 검색 창 바깥 공백 및 보더
          marginHorizontal={30}
          borderRadius={15}
          // 검색 창 안에 텍스트 입력 내부 공백
          innerPaddingVertical={15}
          innerPaddingHorizontal={15}
          // 검색어 텍스트 변경 및 값 저장 기능
          onChangeText={async text => {
            await setSearchText(text);
            text === '' ? null : await SearchActions.searchHospital(text);
          }}
          autoScroll={async () => {
            await scrollRef.current.scrollTo({
              x: 0,
              y: 0,
              animated: true,
            });
          }}
          value={searchText}
          // 검색 버튼 핸들러
          SearchHandler={async () => {
            if (searchText.trim() !== '') {
              let searchHistoryList = [];
              const data = await getData('search_history');

              if (data === null) {
                searchHistoryList.push(searchText);
                searchHistoryList = JSON.stringify(searchHistoryList);

                await storeData('search_history', searchHistoryList);
              } else {
                searchHistoryList = JSON.parse(data);

                if (searchHistoryList.indexOf(searchText) !== -1) {
                } else {
                  searchHistoryList.push(searchText);
                }

                searchHistoryList = JSON.stringify(searchHistoryList);

                await storeData('search_history', searchHistoryList);
              }

              searchHistoryList = JSON.parse(searchHistoryList);
              await handleSearchHistoryList(searchHistoryList);
              await setHistoryData(searchHistoryList);

              await SearchActions.handleSearchLoading(true);
              await props.navigation.navigate('SearchResult');
            } else {
              setSearchText('');
            }
          }}
          // 검색된 목록
          searchData={props.searchList}
          // 자동 완성 설정
          autoCompleteSet={autoCompleteSet}
          setAutoCompleteSet={async () => {
            await setAutoCompleteSet(!autoCompleteSet);
          }}
          // 검색 기록
          historyData={historyData}
          setHistoryData={setHistoryData}
          // 검색 후, 검색 결과 페이지 이동
          navigation={props.navigation}
        />
      </ScrollView>
    </TopContainerView>
  );
};

export default connect(state => ({
  searchList: state.search.searchList,
  searchHistoryList: state.search.searchHistoryList,
}))(Search);
