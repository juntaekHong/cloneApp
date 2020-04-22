/* eslint-disable prettier/prettier */
/* eslint-disable no-fallthrough */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {widthPercentageToDP, timeSince} from '../../utils/util';
import {StandardView, BTN} from '../common/View';
import {NBGLText, NBGBText, NBGText} from '../common/Text';
import {
  PullStarImg,
  HalfMoreStarImg,
  HalfStarImg,
  HalfBelowStarImg,
  EmptyStarImg,
  ReviewImg,
} from './Image';
import colors from '../../configs/colors';
import {DotsBtn} from './Button';

// 별점 컨테이너 뷰
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

// 리뷰 개수 뷰
const ReviewCount = styled(StandardView)`
  width: 100%;
  padding-top: ${({paddingVertical}) =>
    paddingVertical ? widthPercentageToDP(paddingVertical) : 0};
  padding-bottom: ${({paddingVertical}) =>
    paddingVertical ? widthPercentageToDP(paddingVertical) : 0};
  justify-content: center;
  background-color: #f6f7f9;
`;

export const ReviewCountView = ({paddingVertical, total}) => {
  return (
    <ReviewCount paddingVertical={paddingVertical}>
      <StandardView style={{flexDirection: 'row'}}>
        <NBGBText marginLeft={10} color={colors.active}>
          총 리뷰
        </NBGBText>
        <NBGBText> ( {total ? total : 0} ) </NBGBText>
      </StandardView>
    </ReviewCount>
  );
};

// 리뷰 리스트없을 때 뷰
const EmptyReview = styled(StandardView)`
  align-items: center;
  padding-top: ${widthPercentageToDP(70)};
`;

export const EmptyReviewView = ({title}) => {
  return (
    <EmptyReview>
      <NBGBText align={'center'} color={'gray'}>
        {title}
      </NBGBText>
    </EmptyReview>
  );
};

// 리뷰 리스트 뷰(리스트 각 아이템)
const ReviewItem = styled(StandardView)``;

const ReviewHeaderView = styled(StandardView)`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${widthPercentageToDP(10)};
  margin-horizontal: ${widthPercentageToDP(15)};
`;

export const ReviewItemView = ({reviewList}) => {
  // 작성자 인덱스 reviewList[0].userIndex

  console.log(reviewList);
  return (
    <ReviewItem>
      <ReviewHeaderView>
        <NBGBText>{reviewList[0].userIndex}</NBGBText>
        <DotsBtn title={'임시'} />
      </ReviewHeaderView>

      <ReviewImg width={375} height={300} source={{uri: reviewList[0].img}} />
      <NBGBText>{reviewList[0].contents}</NBGBText>
      <NBGBText>{reviewList[0].rating}</NBGBText>
      <NBGBText>
        {reviewList[0].createdAt === reviewList[0].updatedAt
          ? timeSince(reviewList[0].createdAt) + ' 작성'
          : timeSince(reviewList[0].updatedAt) + '수정'}
      </NBGBText>
    </ReviewItem>
  );
};
