/* eslint-disable prettier/prettier */
/* eslint-disable no-fallthrough */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import styled from 'styled-components/native';
import {widthPercentageToDP} from '../../utils/util';
import {StandardView, BTN} from '../common/View';
import {NBGLText, NBGBText, NBGText} from '../common/Text';
import {DotsImg, PlusImg, MinusImg} from './Image';
import {Img} from '../common/Image';

// 리뷰 다트 버튼(수정, 삭제, 해당 유저 리스트 보기 버튼)
const Dots = styled(BTN)``;

export const DotsBtn = ({width, height, onPress}) => {
  return (
    <Dots
      onPress={async () => {
        await onPress();
      }}>
      <DotsImg width={width} height={height} />
    </Dots>
  );
};

// 리뷰 작성 페이지 - 리뷰 이미지 추가 버튼
const ImgInsert = styled(BTN)`
  justify-content: center;
  align-items: center;
  width: ${widthPercentageToDP(70)};
  height: ${widthPercentageToDP(70)};
  margin-top: ${widthPercentageToDP(10)};
  margin-bottom: ${widthPercentageToDP(10)};
  border-width: ${({selected}) => (!selected ? widthPercentageToDP(2) : 0)};
  border-color: #dbdbdb;
  border-radius: ${widthPercentageToDP(10)};
  border-style: dotted;
`;

const ImgDeleteBtn = styled(BTN)`
  position: absolute;
  top: ${widthPercentageToDP(-8)};
  left: ${widthPercentageToDP(-8)};
`;

export const ImgInsertBtn = ({selected, selectedImg, ImgSelect, deleteImg}) => {
  return (
    <ImgInsert
      selected={selected}
      onPress={() => {
        ImgSelect();
      }}>
      {selected ? (
        <StandardView
          style={{
            width: '100%',
            height: '100%',
          }}>
          <Img
            style={{
              width: '100%',
              height: '100%',
              borderRadius: widthPercentageToDP(10),
            }}
            source={{
              uri: selectedImg,
            }}
          />
          {/* 선택한 이미지 삭제 버튼 */}
          <ImgDeleteBtn
            onPress={() => {
              deleteImg();
            }}>
            <Img
              width={24}
              height={24}
              style={{
                borderRadius: widthPercentageToDP(12),
              }}
              source={require('../../../assets/image/review/minus.png')}
            />
          </ImgDeleteBtn>
        </StandardView>
      ) : (
        <PlusImg width={32} height={32} />
      )}
    </ImgInsert>
  );
};
