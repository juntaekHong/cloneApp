/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {widthPercentageToDP} from '../../utils/util';
import {BackImg, CloseImg} from './Image';
import {NBGBText} from './Text';

export const TopContainerView = styled.SafeAreaView`
  flex: 1;
  background-color: white;
  margin-horizontal: ${props =>
    props.marginHorizontal ? widthPercentageToDP(props.marginHorizontal) : 0};
  margin-bottom: ${props =>
    props.marginBottom ? widthPercentageToDP(props.marginBottom) : 0};
`;

export const StandardView = styled.View``;

const TopContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-left: ${widthPercentageToDP(7)};
  padding-right: ${widthPercentageToDP(14)};
  margin-top: ${props =>
    props.marginTop ? widthPercentageToDP(props.marginTop) : 0};
  margin-bottom: ${props =>
    props.marginBottom
      ? widthPercentageToDP(props.marginBottom)
      : widthPercentageToDP(5)};
  height: ${widthPercentageToDP(60)};
`;

export const BTN = styled.TouchableOpacity``;

export const TopView = props => {
  return (
    <TopContainer marginBottom={props.marginBottom}>
      <BTN
        onPress={() => {
          props.backHandler();
        }}>
        <BackImg
          width={28}
          height={28}
          source={require('../../../assets/image/common/back.png')}
        />
      </BTN>

      {props.title ? (
        <NBGBText
          fontSize={17}
          align={'center'}
          numberOfLines={1}
          style={{width: widthPercentageToDP(265)}}>
          {props.title}
        </NBGBText>
      ) : null}

      {props.closeBtn ? (
        <BTN
          onPress={() => {
            props.closeHandler();
          }}>
          <CloseImg
            width={28}
            height={28}
            source={require('../../../assets/image/common/close.png')}
          />
        </BTN>
      ) : props.searchBtn ? (
        <BTN
          onPress={() => {
            props.searchHandler();
          }}>
          <CloseImg
            width={28}
            height={28}
            source={require('../../../assets/image/home/search.png')}
          />
        </BTN>
      ) : props.sharedBtn ? (
        <BTN
          onPress={() => {
            props.sharedHandler();
          }}>
          <CloseImg
            width={20}
            height={20}
            source={require('../../../assets/image/home/share.png')}
          />
        </BTN>
      ) : (
        <View
          style={{
            width: widthPercentageToDP(28),
            height: widthPercentageToDP(28),
          }}
        />
      )}
    </TopContainer>
  );
};

export const ListView = styled(BTN)`
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding-left: ${props =>
    props.padding ? widthPercentageToDP(props.padding) : 0};
  padding-right: ${props =>
    props.padding ? widthPercentageToDP(props.padding) : 0};
  padding-top: ${props =>
    props.padding ? widthPercentageToDP(props.padding) : 0};
  padding-bottom: ${props =>
    props.padding ? widthPercentageToDP(props.padding) : 0};
  border-bottom-width: ${widthPercentageToDP(1)};
  border-bottom-color: #dbdbdb;
`;

export const ContentDataView = styled.View`
  margin-left: ${widthPercentageToDP(10)};
`;

export const EvaluationView = styled(StandardView)`
  margin-top: ${props =>
    props.marginTop ? widthPercentageToDP(props.marginTop) : 0};
  margin-bottom: ${props =>
    props.marginBottom ? widthPercentageToDP(props.marginBottom) : 0};
`;
