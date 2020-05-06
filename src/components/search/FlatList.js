/* eslint-disable react/react-in-jsx-scope */
import React, {useState} from 'react';
import styled from 'styled-components/native';
import {widthPercentageToDP} from '../../utils/util';
import {FlatList, Text} from 'react-native';
import {StandardView} from '../common/View';
import {NBGBText} from '../common/Text';
import {AutoCompelteBtn} from './Button';

const AutoComplete = styled.FlatList`
  width: 100%;
  border-left-width: ${widthPercentageToDP(1)};
  border-right-width: ${widthPercentageToDP(1)};
  border-bottom-width: ${widthPercentageToDP(1)};
  border-color: #dbdbdb;
`;

export const AutoCompleteList = ({data, onChangeText}) => {
  return (
    <AutoComplete
      scrollEnabled={false}
      data={data}
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
        //   임시
        return (
          <StandardView>
            <NBGBText>asdsa</NBGBText>
          </StandardView>
        );
      }}
    />
  );
};
