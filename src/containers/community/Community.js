import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {widthPercentageToDP} from '../../utils/util';
import {Img} from '../../components/common/Image';
import {UIActivityIndicator} from 'react-native-indicators';

// 추천 태그 임시 데이터
const DATA = [
  {title: '두통'},
  {title: '치통'},
  {title: '복통'},
  {title: '...'},
  {title: '기타'},
];

const Community = props => {
  const [searchInputText, setSearchInputText] = useState(null);

  const [DATA2, setDATA2] = useState([
    {title: '두통', content: '두통'},
    {title: '치통', content: '치통'},
    {title: '복통', content: '복통'},
    {title: '...', content: '...'},
    {title: '기타', content: '기타'},
    {title: '기타', content: '기타'},
    {title: '기타', content: '기타'},
  ]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          flexDirection: 'row',
          height: widthPercentageToDP(50),
          margin: widthPercentageToDP(10),
          borderWidth: widthPercentageToDP(2),
          borderColor: 'gray',
          borderRadius: widthPercentageToDP(15),
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TextInput
          placeholder={'입력해주세요~'}
          style={{
            marginLeft: widthPercentageToDP(10),
            width: widthPercentageToDP(300),
          }}
          returnKeyType={'search'}
          onChangeText={text => {
            setSearchInputText(text);
          }}
          value={searchInputText}
          onSubmitEditing={() => {
            // 서버연동 부분
            // 클릭 시, 검색결과 및 인기 검색어 로직 부분도 넣어야 함.
          }}
        />
        <TouchableOpacity
          onPress={() => {
            // 서버연동 부분
            // 클릭 시, 검색결과 및 인기 검색어 로직 부분도 넣어야 함.
          }}
          style={{marginRight: widthPercentageToDP(10)}}>
          <Img
            width={20}
            height={20}
            source={require('../../../assets/image/home/search.png')}
          />
        </TouchableOpacity>
      </View>
      {/* 검색 인풋 확인용 */}
      {/* <View>
        <Text>
          {searchInputText === null
            ? '내용을 입력하지 않았습니다.'
            : searchInputText}
        </Text>
      </View> */}
      <View>
        <Text>인기 검색어 뷰</Text>
      </View>
      {/* 해쉬태그(추천태그) 뷰 */}
      <View
        style={{
          height: widthPercentageToDP(50),
        }}>
        <FlatList
          horizontal={true}
          data={DATA}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => {
            return (
              //해쉬태그 item
              <TouchableOpacity
                onPress={() => {
                  // props.navigation.navigate('CommunityDetail', {data: item});
                  setDATA2([item, item, item, item, item, item]);
                }}
                style={{
                  width: widthPercentageToDP(100),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text> # {item.title}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* 게시판 List View */}
      <FlatList
        style={{flexGrow: 1, width: '100%', height: '100%'}}
        data={DATA2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
          return (
            //List Item Touch
            <TouchableOpacity
              onPress={() => {
                // props.navigation.navigate('CommunityDetail', {data: item});
              }}
              style={{
                marginHorizontal: widthPercentageToDP(10),
                height: widthPercentageToDP(250),
              }}>
              <Text> # {item.title}</Text>
              <Text>글쓴이: 김아무개</Text>
              <Img
                width={300}
                height={100}
                source={require('../../../assets/image/home/hospital.png')}
              />
              <Text>내용: {item.content}</Text>
              {/* Like Touch */}
              <TouchableOpacity>
                <Text>좋아요</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          );
        }}
        ListFooterComponent={() => {
          return (
            <View
              style={{
                width: widthPercentageToDP(100),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <UIActivityIndicator
                size={widthPercentageToDP(30)}
                color={'gray'}
              />
            </View>
          );
        }}
        onEndReachedThreshold={0.01}
        onEndReached={() => {
          setDATA2([
            ...DATA2,
            {title: 'asd', content: 'asd'},
            {title: '123', content: '123'},
            {title: 'asd', content: 'asd'},
            {title: '123', content: '123'},
            {title: 'asd', content: 'asd'},
            {title: '123', content: '123'},
            {title: 'asd', content: 'asd'},
            {title: '123', content: '123'},
            {title: 'asd', content: 'asd'},
            {title: '123', content: '123'},
            {title: 'asd', content: 'asd'},
            {title: '123', content: '123'},
          ]);
        }}
      />
    </SafeAreaView>
  );
};

export default Community;
