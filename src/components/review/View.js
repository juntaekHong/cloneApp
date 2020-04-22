/* eslint-disable prettier/prettier */
/* eslint-disable no-fallthrough */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {widthPercentageToDP} from '../../utils/util';
import {StandardView, BTN} from '../common/View';
import {NBGLText, NBGBText} from '../common/Text';
import {
  PullStarImg,
  HalfMoreStarImg,
  HalfStarImg,
  HalfBelowStarImg,
  EmptyStarImg,
} from './Image';

export const Division = styled(StandardView)`
  width: 100%;
  height: ${widthPercentageToDP(1)};
  background-color: #dbdbdb;
`;

const RatingAvg = styled(StandardView)`
  margin-top: ${({marginVertical}) =>
    marginVertical ? widthPercentageToDP(marginVertical) : 0};
  margin-bottom: ${({marginVertical}) =>
    marginVertical ? widthPercentageToDP(marginVertical) : 0};
  margin-left: ${({marginHorizontal}) =>
    marginHorizontal ? widthPercentageToDP(marginHorizontal) : 0};
  margin-right: ${({marginHorizontal}) =>
    marginHorizontal ? widthPercentageToDP(marginHorizontal) : 0};
  padding-bottom: ${({paddingVertical}) =>
    paddingVertical ? widthPercentageToDP(paddingVertical) : 0};
  border-width: ${widthPercentageToDP(1)};
  border-radius: ${widthPercentageToDP(15)};
  border-color: #dbdbdb;
`;

// 텍스트 평점에 따라 별점 표시
const Star = (score, size) => {
  let star = [];
  score = parseFloat(score);

  for (let i = 1; i <= parseInt(score); i++) {
    star.push(1);
  }

  if (parseInt(score) < 5) {
    if (parseFloat(score) % 1 >= 0.9) {
      star.push(1);
    } else if (parseFloat(score) % 1 >= 0.65 && parseFloat(score) % 1 < 0.9) {
      star.push(0.75);
    } else if (parseFloat(score) % 1 >= 0.4 && parseFloat(score) % 1 < 0.65) {
      star.push(0.5);
    } else if (parseFloat(score) % 1 >= 0.2 && parseFloat(score) % 1 < 0.4) {
      star.push(0.25);
    }
  }

  for (let i = star.length; i < 5; i++) {
    star.push(0);
  }

  let StarView = star.map(item => {
    if (item === 1) {
      return <PullStarImg size={size} />;
    } else if (item === 0.75) {
      return <HalfMoreStarImg size={size} />;
    } else if (item === 0.5) {
      return <HalfStarImg size={size} />;
    } else if (item === 0.25) {
      return <HalfBelowStarImg size={size} />;
    } else {
      return <EmptyStarImg size={size} />;
    }
  });

  return StarView;
};

const StarView = styled(StandardView)`
  flex-direction: row;
`;

const InnerView = styled(StarView)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: ${({marginTop}) =>
    marginTop ? widthPercentageToDP(marginTop) : 0};
`;

export const RatingAvgView = ({
  title,
  marginHorizontal,
  marginVertical,
  paddingVertical,
  ratingScore,
}) => {
  return (
    <RatingAvg
      marginHorizontal={marginHorizontal}
      marginVertical={marginVertical}
      paddingVertical={paddingVertical}>
      <NBGLText fontSize={13} marginLeft={20} marginBottom={5}>
        {title}
      </NBGLText>
      <InnerView marginTop={20}>
        <NBGBText fontSize={25} marginBottom={10}>
          {ratingScore}
        </NBGBText>
        <StarView>{Star(ratingScore, 30)}</StarView>
      </InnerView>
    </RatingAvg>
  );
};
