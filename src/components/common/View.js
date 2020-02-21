/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import styled from 'styled-components/native';
import {widthPercentageToDP} from '../../utils/util';
import {BackImg, CloseImg} from './Image';
import {NBGBText} from './Text';

export const TopContainerView = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

export const StandardView = styled.View``;

const TopContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-left: ${widthPercentageToDP(7)};
  padding-right: ${widthPercentageToDP(14)};
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

      {props.title ? <NBGBText fontSize={17}>{props.title}</NBGBText> : null}

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
      ) : (
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
      )}
    </TopContainer>
  );
};

export const ListView = styled(BTN)`
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: ${props =>
    props.height
      ? widthPercentageToDP(props.height)
      : widthPercentageToDP(100)};
  padding-left: ${props =>
    props.padding ? widthPercentageToDP(props.padding) : 0};
  padding-right: ${props =>
    props.padding ? widthPercentageToDP(props.padding) : 0};
  border-bottom-width: ${widthPercentageToDP(1)};
  border-bottom-color: #dbdbdb;
`;

export const ContentDataView = styled.View`
  margin-left: ${widthPercentageToDP(10)};
  height: ${widthPercentageToDP(70)};
`;

export const EvaluationView = styled(StandardView)`
  flex-direction: row;
  align-items: center;
  margin-top: ${props =>
    props.marginTop ? widthPercentageToDP(props.marginTop) : 0};
  margin-bottom: ${props =>
    props.marginBottom ? widthPercentageToDP(props.marginBottom) : 0};
`;
