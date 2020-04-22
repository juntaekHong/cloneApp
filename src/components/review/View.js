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
import {StarImg} from '../common/Image';

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
  align-items: center;
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
const ReviewItem = styled(StandardView)`
  margin-bottom: ${widthPercentageToDP(30)};
`;

const ReviewHeaderView = styled(StandardView)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${widthPercentageToDP(10)};
  margin-horizontal: ${widthPercentageToDP(15)};
`;

export const ReviewFooterView = styled(ReviewHeaderView)``;

export const ReviewItemView = ({item}) => {
  // 작성자 인덱스 reviewList[0].userIndex

  // 리뷰 글이 5줄 이상이면, 클릭을 통해 보기.
  const [contentVisible, setContentVisible] = useState(false);

  return (
    <ReviewItem>
      {/* 리뷰 상단뷰, 작성자 및 수정&삭제 버튼 */}
      <ReviewHeaderView>
        <NBGText>적성자: {item.user.userNickName}</NBGText>
        {/* 작성자가 본인일 시 보임. */}
        <DotsBtn width={20} height={20} onPress={() => {}} />
      </ReviewHeaderView>
      {/* 이미지 뷰 */}
      {item.img ? (
        <ReviewImg width={375} height={300} source={{uri: item.img}} />
      ) : null}
      {/* 리뷰 하단 뷰, 리뷰 코멘트 및 작성(수정)일, 리뷰 점수 뷰 */}
      <StandardView>
        <ReviewFooterView>
          <BTN
            activeOpacity={0.7}
            // 리뷰 글이 5줄 이상이면, 클릭을 통해 보기.
            onPress={() => {
              setContentVisible(!contentVisible);
            }}>
            <NBGBText
              numberOfLines={contentVisible ? 5 : 2}
              style={{width: widthPercentageToDP(250)}}>
              {item.contents}
            </NBGBText>
          </BTN>
          <StarView>
            <PullStarImg
              size={21}
              source={require('../../../assets/image/home/star-0.png')}
            />
            <NBGBText marginTop={3} marginLeft={5}>
              {item.rating}
            </NBGBText>
          </StarView>
        </ReviewFooterView>
        <NBGLText align={'right'} marginTop={10} marginRight={15}>
          {item.createdAt === item.updatedAt
            ? '작성일: ' + timeSince(item.createdAt)
            : '수정일: ' + timeSince(item.updatedAt)}
        </NBGLText>
      </StandardView>
    </ReviewItem>
  );
};
