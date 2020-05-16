/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {
  widthPercentageToDP,
  getData,
  storeData,
  removeData,
} from '../../utils/util';
import {StandardView, BTN} from '../common/View';
import {NBGLText, NBGBText} from '../common/Text';
import {AutoCompelteBtn} from './Button';
import Switch from 'react-native-switch-pro';
import {AutoCompleteView} from './View';
import {CloseImg, Img} from '../common/Image';
import {handleSearchHistoryList} from '../../store/modules/search/search';

const AutoComplete = styled.FlatList`
  width: 100%;
  border-left-width: ${widthPercentageToDP(1)};
  border-right-width: ${widthPercentageToDP(1)};
  border-bottom-width: ${widthPercentageToDP(1)};
  border-color: #dbdbdb;
  border-bottom-left-radius: ${({data}) =>
    data && data.length !== 0 ? widthPercentageToDP(10) : 0};
  border-bottom-right-radius: ${({data}) =>
    data && data.length !== 0 ? widthPercentageToDP(10) : 0};
`;

export const AutoCompleteList = ({
  data,
  searchText,
  onChangeText,
  autoCompleteSet,
  setAutoCompleteSet,
  SearchHandler,
  historyData,
  setHistoryData,
}) => {
  return (
    <AutoComplete
      scrollEnabled={false}
      data={autoCompleteSet ? data : []}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={() => {
        let format = [];
        let changeData = [];

        for (let i = 0; i < historyData.length; i++) {
          changeData.push(historyData[i]);

          format.push(
            <BTN
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: widthPercentageToDP(10),
                paddingVertical: widthPercentageToDP(10),
                borderBottomWidth: widthPercentageToDP(1),
                borderColor: '#dbdbdb',
              }}
              onPress={async () => {
                await onChangeText(historyData[i]);
                await SearchHandler(historyData[i]);
              }}>
              <StandardView
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Img
                  width={16}
                  height={16}
                  source={require('../../../assets/image/search/wall-clock.png')}
                />
                <NBGLText
                  marginLeft={5}
                  style={{
                    width: widthPercentageToDP(210),
                  }}>
                  {historyData[i]}
                </NBGLText>
              </StandardView>
              <BTN
                style={{
                  paddingHorizontal: widthPercentageToDP(10),
                  paddingVertical: widthPercentageToDP(10),
                }}
                onPress={async () => {
                  let deleteIndex = historyData.indexOf(historyData[i]);

                  changeData.splice(deleteIndex, 1);

                  await setHistoryData(changeData);
                  await handleSearchHistoryList(changeData);
                  changeData = JSON.stringify(changeData);
                  await removeData('search_history');
                  await storeData('search_history', changeData);
                }}>
                <CloseImg
                  width={16}
                  height={16}
                  source={require('../../../assets/image/common/close.png')}
                />
              </BTN>
            </BTN>,
          );
        }

        return historyData.length !== 0 ? (
          <StandardView>{format}</StandardView>
        ) : null;
      }}
      renderItem={({item}) => {
        return (
          <AutoCompelteBtn
            searchText={searchText}
            hospitalName={item._source.dutyName._text}
            hpId={item._source.hpid._text}
            onChangeText={text => {
              onChangeText(text);
            }}
            onPress={async () => {
              await onChangeText(item._source.dutyName._text);
              await SearchHandler();
            }}
          />
        );
      }}
      ListFooterComponent={() => {
        return (
          <StandardView>
            <AutoCompleteView>
              <NBGLText marginRight={7}>자동완성 설정</NBGLText>
              <Switch
                width={widthPercentageToDP(40)}
                height={widthPercentageToDP(21)}
                backgroundActive={'rgb(96, 169, 243)'}
                value={autoCompleteSet}
                onSyncPress={() => {
                  setAutoCompleteSet();
                }}
              />
            </AutoCompleteView>
          </StandardView>
        );
      }}
    />
  );
};
