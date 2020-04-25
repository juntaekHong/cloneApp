import React from 'react';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import {widthPercentageToDP} from '../../utils/util';
import colors from '../../configs/colors';
import {NBGText, NBGBText} from '../common/Text';
import FastImage from 'react-native-fast-image';
import {UIActivityIndicator} from 'react-native-indicators';
import {BTN, StandardView} from '../common/View';
// import Dialog, {SlideAnimation} from 'react-native-popup-dialog';

const DivisionView = styled.View`
  width: 100%;
  height: ${widthPercentageToDP(1)};
  background-color: gray;
`;

const BottomModalView = styled.View`
  position: absolute;
  bottom: 0;
  width: ${({width}) => widthPercentageToDP(width)};
  border-radius: ${widthPercentageToDP(14)};
  background-color: transparent;
  align-self: center;
`;

// 해당 유저 리뷰 보기 버튼
const UserReviewBtn = styled(BTN)`
  width: 100%;
  height: ${({height}) =>
    height ? widthPercentageToDP(height) : widthPercentageToDP(60)};
  justify-content: center;
  border-top-width: ${({borderTop}) =>
    borderTop ? widthPercentageToDP(1) : 0};
  border-top-left-radius: ${({borderTop}) =>
    borderTop ? widthPercentageToDP(10) : 0};
  border-top-right-radius: ${({borderTop}) =>
    borderTop ? widthPercentageToDP(10) : 0};
  border-bottom-width: ${({borderBottom}) =>
    borderBottom ? widthPercentageToDP(1) : 0};
  border-bottom-left-radius: ${({borderBottom}) =>
    borderBottom ? widthPercentageToDP(10) : 0};
  border-bottom-right-radius: ${({borderBottom}) =>
    borderBottom ? widthPercentageToDP(10) : 0};
  background-color: white;
`;

//수정 버튼
const ModifyBtn = styled(UserReviewBtn)``;

// 삭제 버튼
const DeleteBtn = styled(UserReviewBtn)``;

// 취소 버튼
const CancelBtn = styled(UserReviewBtn)``;

export const BottomMenuModal = ({
  animate = 'fade',
  visible = false,
  width = 295,
  padding,
  user,
  reviewUser,
  closeHandler,
}) => {
  return (
    <Modal style={{margin: 0}} animationType={animate} isVisible={visible}>
      <BottomModalView padding={padding} width={width}>
        {user.userNickName === reviewUser ? (
          <StandardView>
            <ModifyBtn
              borderTop={true}
              onPress={() => {
                closeHandler();
              }}>
              <NBGBText fontSize={20} align={'center'}>
                수정
              </NBGBText>
            </ModifyBtn>
            <DivisionView />
            <DeleteBtn
              onPress={() => {
                closeHandler();
              }}>
              <NBGBText fontSize={20} align={'center'}>
                삭제
              </NBGBText>
            </DeleteBtn>
          </StandardView>
        ) : (
          <UserReviewBtn
            borderTop={true}
            onPress={() => {
              closeHandler();
            }}>
            <NBGBText fontSize={20} align={'center'}>
              {reviewUser}의 모든 리뷰 보기
            </NBGBText>
          </UserReviewBtn>
        )}
        <DivisionView />
        <CancelBtn
          borderBottom={true}
          onPress={() => {
            closeHandler();
          }}>
          <NBGBText fontSize={20} align={'center'}>
            취소
          </NBGBText>
        </CancelBtn>
      </BottomModalView>
    </Modal>
  );
};
