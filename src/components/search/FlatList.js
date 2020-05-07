/* eslint-disable react/react-in-jsx-scope */
import React, {useState} from 'react';
import styled from 'styled-components/native';
import {widthPercentageToDP} from '../../utils/util';
import {FlatList, Text} from 'react-native';
import {StandardView} from '../common/View';
import {NBGBText, NBGLText} from '../common/Text';
import {AutoCompelteBtn} from './Button';
import Switch from 'react-native-switch-pro';
import {AutoCompleteView} from './View';

const AutoComplete = styled.FlatList`
  width: 100%;
  border-left-width: ${widthPercentageToDP(1)};
  border-right-width: ${widthPercentageToDP(1)};
  border-bottom-width: ${widthPercentageToDP(1)};
  border-color: #dbdbdb;
`;

export const AutoCompleteList = ({
  data,
  onChangeText,
  autoCompleteSet,
  setAutoCompleteSet,
}) => {
  return (
    <AutoComplete
      scrollEnabled={false}
      data={autoCompleteSet ? data : []}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => {
        return (
          <AutoCompelteBtn
            hospitalName={item._source.dutyName._text}
            hpId={item._source.hpid._text}
            onChangeText={text => {
              onChangeText(text);
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
