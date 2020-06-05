/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import styled from 'styled-components/native';
import {widthPercentageToDP} from '../../utils/util';
import {BTN} from '../common/View';
import {NBGBText} from '../common/Text';

const TabView = styled.View`
  margin-top: ${widthPercentageToDP(10)};
  flex-direction: row;
  width: 100%;
`;

const PagiNationBTN = styled(BTN)`
  padding-bottom: ${widthPercentageToDP(10)};
  border-bottom-color: ${props =>
    props.index === props.page ? '#24a0fa' : '#dbdbdb'}
  border-right-color: #dbdbdb;
  border-right-width: ${widthPercentageToDP(1)};
  border-bottom-width: ${widthPercentageToDP(3)};
`;

export const PagiNationTab = ({type, index, page1, page2, page3, onPress}) => {
  return (
    <TabView>
      <PagiNationBTN
        index={index}
        page={page1.index}
        onPress={() => {
          onPress(page1.index);
        }}>
        <NBGBText
          align={'center'}
          fontSize={15}
          color={index === 0 ? '#259ffa' : '#dbdbdb'}
          style={{
            width: !type
              ? widthPercentageToDP(375 / 3)
              : widthPercentageToDP(375 / 2),
          }}>
          {page1.title}
        </NBGBText>
      </PagiNationBTN>
      <PagiNationBTN
        index={index}
        page={page2.index}
        onPress={() => {
          onPress(page2.index);
        }}>
        <NBGBText
          align={'center'}
          fontSize={15}
          color={index === 1 ? '#259ffa' : '#dbdbdb'}
          style={{
            width: !type
              ? widthPercentageToDP(375 / 3)
              : widthPercentageToDP(375 / 2),
          }}>
          {page2.title}
        </NBGBText>
      </PagiNationBTN>
      {!type ? (
        <PagiNationBTN
          index={index}
          page={page3.index}
          onPress={() => {
            onPress(page3.index);
          }}>
          <NBGBText
            align={'center'}
            fontSize={15}
            color={index === 2 ? '#259ffa' : '#dbdbdb'}
            style={{width: widthPercentageToDP(375 / 3)}}>
            {page3.title}
          </NBGBText>
        </PagiNationBTN>
      ) : null}
    </TabView>
  );
};
