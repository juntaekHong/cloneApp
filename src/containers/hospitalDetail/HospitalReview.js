import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {TopContainerView} from '../../components/common/View';
import {NBGBText} from '../../components/common/Text';
import {RatingAvgView, Division} from '../../components/review/View';
import {ReviewActions} from '../../store/actionCreator';

const HospitalReview = ({hpId, ratingAvg}) => {
  // 평균 평점
  const [ratingScore, setRatingScore] = useState(
    ratingAvg !== null ? parseFloat(ratingAvg).toFixed(2) : 0,
  );

  useEffect(() => {
    ReviewActions.getAllReview(hpId);
  }, []);

  // 리뷰 작성 및 삭제 등 해당 병원의 평점 변경 시, 변경된 데이터 적용
  useEffect(() => {
    setRatingScore(ratingAvg !== null ? parseFloat(ratingAvg).toFixed(2) : 0);
  }, [ratingAvg]);

  return (
    <TopContainerView marginTop={10}>
      {/* 병원 별점(평점) 뷰 */}
      <RatingAvgView
        title={'평균 별점'}
        marginHorizontal={50}
        marginVertical={30}
        paddingVertical={30}
        ratingScore={ratingScore}
      />
      <Division />
      {/*  */}
    </TopContainerView>
  );
};

export default connect(state => ({}))(HospitalReview);
