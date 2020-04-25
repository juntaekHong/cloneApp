/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {TopContainerView, StandardView} from '../../components/common/View';
import {TopView} from '../../components/common/View';
import {ReviewWriteView} from '../../components/review/View';
import ImageCropPicker from 'react-native-image-crop-picker';
import {ReviewActions, CommonActions} from '../../store/actionCreator';
import {KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {showMessage} from '../../utils/util';
import Toast from 'react-native-root-toast';

const ReviewWrite = props => {
  // 리뷰 작성하는 병원 id
  const [hpid, setHpid] = useState(props.navigation.state.params.hpid);
  // 입력 리뷰 데이터
  const [inputReview, setInputReview] = useState('');

  // 이미지 선택 여부 및 이미지 데이터 저장
  const [selected, setSelected] = useState(false);
  const [ImgData, setImgData] = useState();

  // 병원 별점
  const [currentRating, setCurrentRating] = useState(0);

  const [loading, setLoading] = useState(false);

  const checkSpace = str => {
    if (str.replace(/(\s*)/g, '') == '') {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    if (
      props.navigation.state.params !== null &&
      props.navigation.state.params.reviewData
    ) {
      const reviewData = props.navigation.state.params.reviewData;

      setCurrentRating(reviewData.rating);
      setInputReview(reviewData.contents);

      if (reviewData.img !== null) {
        setSelected(true);
        setImgData(reviewData.img);
      }
    }
  }, [props.navigation]);

  return (
    <TopContainerView style={{flex: 1, backgroundColor: 'white'}}>
      <TopView
        marginBottom={5}
        title={'리뷰 작성'}
        backBtn={true}
        backHandler={() => {
          props.navigation.goBack(null);
        }}
        closeBtn={false}
        searchBtn={false}
        uploadBtn={true}
        uploadLoading={loading}
        uploadHandler={async () => {
          if (
            inputReview.trim().length >= 10 && checkSpace(inputReview)
              ? false
              : true
          ) {
            showMessage('리뷰를 10자 이상 작성해주세요!', {
              position: Toast.positions.CENTER,
            });
          } else if (inputReview === '' || currentRating === 0) {
            showMessage('리뷰 댓글 또는 병원 평가를 하지 않았습니다!', {
              position: Toast.positions.CENTER,
            });
          } else {
            await setLoading(true);

            const ReviewData = selected
              ? {
                  contents: inputReview.trim(),
                  rating: currentRating,
                  url: ImgData,
                }
              : {contents: inputReview.trim(), rating: currentRating};

            if (
              props.navigation.state.params !== null &&
              props.navigation.state.params.modify
            ) {
              // 리뷰 수정
              await ReviewActions.updateReview(
                props.navigation.state.params.reviewData.reviewIndex,
                ReviewData,
              );
            } else {
              // 리뷰 작성
              await ReviewActions.postReview(hpid, ReviewData);
            }

            await ReviewActions.handleReviewListInit();

            const promise1 = ReviewActions.getAllReview(hpid);
            const promise2 = ReviewActions.getMyReview();

            Promise.all([promise1, promise2]).then(async () => {
              const obj = await CommonActions.getHospital(hpid);

              if (
                props.navigation.state.params !== null &&
                props.navigation.state.params.modify
              ) {
                await props.navigation.navigate('HospitalDetail', {
                  modify: props.navigation.state.params.modify,
                  object: obj,
                  reviewComplete: props.navigation.state.params.reviewCompleteModal(
                    true,
                  ),
                });
              } else {
                await props.navigation.navigate('HospitalDetail', {
                  modify: false,
                  object: obj,
                  reviewComplete: props.navigation.state.params.reviewCompleteModal(
                    true,
                  ),
                });
              }
            });

            await setLoading(false);
          }
        }}
      />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 43 : 0}
        enabled>
        <ScrollView>
          {/* 리뷰 작성 뷰 */}
          <ReviewWriteView
            maxHeight={360}
            marginHorizontal={20}
            borderRadius={20}
            // 입력 댓글
            inputReview={inputReview}
            changeInputReview={text => {
              setInputReview(text);
            }}
            // 이미지 선택 및 버튼 액션
            selected={selected}
            selectedImg={ImgData}
            ImgSelect={async () => {
              try {
                let image = await ImageCropPicker.openPicker({
                  width: 200,
                  height: 200,
                  mediaType: 'photo',
                  // cropping: true,
                  includeBase64: true,
                  cropperToolbarTitle: '',
                });

                const formData = new FormData();
                formData.append('img', {
                  uri: image.path,
                  type: `${image.mime}`,
                  name: `.${image.mime.substr(
                    image.mime.indexOf('/') + 1,
                    image.mime.length - 1,
                  )}`,
                });

                const ImageFormat = await ReviewActions.uploadImg(formData);

                await setImgData(ImageFormat);
                await setSelected(true);

                // Promise.all([ImageFormat]).then(async () => {
                //   await ReviewActions.postReview(ImageFormat);
                //   await ReviewActions.getMyReview();
                // });
              } catch (err) {
                console.log(err);
              } finally {
                await ImageCropPicker.clean();
              }
            }}
            deleteImg={async () => {
              await setSelected(false);
              await setImgData();
            }}
            rating={currentRating}
            selectedRating={current => {
              setCurrentRating(current);
            }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </TopContainerView>
  );
};

export default connect(state => ({}))(ReviewWrite);
