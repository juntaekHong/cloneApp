/* eslint-disable prettier/prettier */
/* eslint-disable no-fallthrough */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import styled from 'styled-components/native';
import {widthPercentageToDP} from '../../utils/util';
import {StandardView} from '../common/View';
import {NBGBText, NBGLText} from '../common/Text';
import {CommentTI} from './TextInput';

// 구분선
export const DivisionView = styled(StandardView)`
  border-bottom-width: ${widthPercentageToDP(10)}
  border-bottom-color: #F6F7F9;
  margin-bottom: ${widthPercentageToDP(20)};
`;

// 예약 시, 코멘트 뷰
const Comment = styled(StandardView)`
  margin-bottom: ${widthPercentageToDP(20)};
  padding-left: ${({paddingHorizontal}) =>
    paddingHorizontal
      ? widthPercentageToDP(paddingHorizontal)
      : widthPercentageToDP(0)};
  padding-right: ${({paddingHorizontal}) =>
    paddingHorizontal
      ? widthPercentageToDP(paddingHorizontal)
      : widthPercentageToDP(0)};
  padding-bottom: ${({paddingBottom}) =>
    paddingBottom
      ? widthPercentageToDP(paddingBottom)
      : widthPercentageToDP(0)};
`;

export const CommentView = ({paddingHorizontal}) => {
  return (
    <Comment paddingHorizontal={paddingHorizontal}>
      <StandardView marginBottom={20} style={{flexDirection: 'row'}}>
        <NBGLText fontSize={14}>원장님께 하고 싶은 말 </NBGLText>
        <NBGLText fontSize={14} color={'gray'}>
          [선택]
        </NBGLText>
      </StandardView>
      <CommentTI marginBottom={20} placeholder={'ex) 어제부터 열이 나요.'} />
      <NBGLText marginLeft={5}>
        ※ 병원에 도착하시면 데스크에 도착여부를 알려주세요.
      </NBGLText>
      <NBGLText marginTop={5} marginLeft={5}>
        ※ 예약한 시간에 병원 방문 후 데스크에 방문하지 않으면 예약이 취소됩니다.
      </NBGLText>
      {/* <NBGLText marginLeft={5}>
        ※ 병원 사정으로 예약이 취소되는 경우 Push 메시지로 알려드립니다.
      </NBGLText> */}
    </Comment>
  );
};
