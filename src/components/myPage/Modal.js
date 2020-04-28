/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import {widthPercentageToDP} from '../../utils/util';
import colors from '../../configs/colors';
import {NBGText, NBGBText, NBGLText} from '../common/Text';
import {StandardView, BTN} from '../common/View';
import {SelectImg} from '../home/Image';
import {CloseImg} from '../common/Image';
import {MyInfoTI} from './TextInput';

const ModalView = styled(StandardView)`
  width: ${({width}) =>
    width ? widthPercentageToDP(width) : widthPercentageToDP(300)};
  height: ${({height}) =>
    height ? widthPercentageToDP(height) : widthPercentageToDP(400)};
  border-radius: ${widthPercentageToDP(15)};
  background-color: white;
`;

const HeaderView = styled(StandardView)`
  align-items: flex-end;
  margin-top: ${widthPercentageToDP(20)};
  padding-right: ${widthPercentageToDP(20)};
`;

const BodyView = styled(StandardView)`
  flex: 1;
  justify-content: center;
`;

const FooterView = styled(StandardView)`
  align-items: center;
  justify-content: flex-end;
`;

export const MyInfoMdal = ({
  animate = 'fade',
  visible = false,
  width,
  height,
  closeHandler,
  title,
  userData,
  setUserData,
  changePass,
  passCheck,
  setPassCheck,
  changeHandler,
}) => {
  return (
    <Modal
      style={{
        margin: 0,
        alignItems: 'center',
      }}
      animationType={animate}
      isVisible={visible}>
      <ModalView width={width} height={height}>
        <HeaderView>
          <BTN
            onPress={() => {
              closeHandler();
            }}>
            <CloseImg
              width={20}
              height={20}
              source={require('../../../assets/image/common/close.png')}
            />
          </BTN>
        </HeaderView>
        <NBGBText align={'center'} marginTop={15} fontSize={17}>
          {title}
        </NBGBText>
        <BodyView>
          <MyInfoTI
            onChangeText={text => setUserData(text)}
            value={userData ? userData : ''}
            returnKeyType={changePass ? 'next' : 'done'}
            onSubmitEditing={async () => {}}
          />
          {changePass ? (
            <MyInfoTI
              marginTop={20}
              onChangeText={text => setPassCheck(text)}
              value={passCheck ? passCheck : ''}
              returnKeyType={'done'}
            />
          ) : null}
        </BodyView>
        <FooterView>
          <BTN
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: widthPercentageToDP(60),
              borderBottomLeftRadius: widthPercentageToDP(15),
              borderBottomRightRadius: widthPercentageToDP(15),
              backgroundColor: colors.active,
            }}
            onPress={() => {
              changeHandler();
            }}>
            <NBGText color={'white'} fontSize={16}>
              확인
            </NBGText>
          </BTN>
        </FooterView>
      </ModalView>
    </Modal>
  );
};
