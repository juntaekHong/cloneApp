/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {widthPercentageToDP, showMessage} from '../../utils/util';
import {BTN, StandardView} from '../common/View';
import {NBGText} from '../common/Text';
import {FlatList, Linking, Image} from 'react-native';
import Toast from 'react-native-root-toast';
import {UIActivityIndicator} from 'react-native-indicators';

// 해쉬태그 리스트
const HashList = styled(FlatList)`
  flex-grow: 1;
  width: 100%;
  height: 100%;
  padding-vertical: ${widthPercentageToDP(10)};
`;

export const HashListView = ({data, searchHandler}) => {
  return (
    <HashList
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      data={data}
      renderItem={({item, index}) => {
        return (
          <BTN
            style={{
              justifyContent: 'center',
              paddingHorizontal: widthPercentageToDP(10),
            }}
            onPress={async () => {
              await searchHandler(item.hashtagName);
            }}>
            {/* item.hashtagIndex */}
            <NBGText color={'#0066CC'}>#{item.hashtagName}</NBGText>
          </BTN>
        );
      }}
    />
  );
};

// 게시판 리스트
const PostList = styled(FlatList)`
  flex-grow: 1;
  width: 100%;
`;

export const PostListView = ({data, searchHandler}) => {
  const [listLength, setListLength] = useState(0);
  const [nextListLoading, setNextListLoading] = useState(false);

  return (
    <PostList
      keyExtractor={(item, index) => index.toString()}
      data={data}
      renderItem={({item, index}) => {
        let hashText = [];
        let hashView = [];

        setListLength(index);

        for (let i = 0; i < item._source['hashtag._text'].length; i++) {
          hashText.push(
            <NBGText color={'#0066CC'} marginRight={10}>
              #{item._source['hashtag._text'][i]}
            </NBGText>,
          );

          if (i % 3 === 2) {
            hashView.push(
              <StandardView style={{flexDirection: 'row'}}>
                {hashText}
              </StandardView>,
            );
          }
        }
        return (
          <BTN
            style={{marginVertical: widthPercentageToDP(20)}}
            onPress={() => {
              Linking.openURL(item._source['url._text']).catch(e => {
                showMessage(
                  '해당 게시물 주소로 이동을 실패하였습니다.\n잠시후, 다시시도 해주세요!',
                  {
                    position: Toast.positions.CENTER,
                  },
                );
              });
            }}>
            <NBGText marginLeft={10}>
              제목: {item._source['title._text']}
            </NBGText>
            <Image
              style={{
                width: '100%',
                marginVertical: widthPercentageToDP(20),
                height: widthPercentageToDP(200),
              }}
              source={{
                uri: item._source['img._text']
                  ? item._source['img._text']
                  : 'https://cdn.icon-icons.com/icons2/1465/PNG/512/588hospital_100778.png',
              }}
            />
            <StandardView style={{marginLeft: widthPercentageToDP(10)}}>
              {hashView}
            </StandardView>
          </BTN>
        );
      }}
      onEndReachedThreshold={0.01}
      onEndReached={async () => {
        await setNextListLoading(true);
        await searchHandler(listLength);
        await setNextListLoading(false);
      }}
      ListFooterComponent={() => {
        return nextListLoading ? (
          <UIActivityIndicator
            style={{marginVertical: widthPercentageToDP(30)}}
            color={'gray'}
            size={widthPercentageToDP(30)}
          />
        ) : null;
      }}
    />
  );
};
