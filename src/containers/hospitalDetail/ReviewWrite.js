/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {TopContainerView, StandardView} from '../../components/common/View';
import {TopView} from '../../components/common/View';
import {ReviewWriteView} from '../../components/review/View';
import ImageCropPicker from 'react-native-image-crop-picker';
import {ReviewActions} from '../../store/actionCreator';

const ReviewWrite = props => {
  // 이미지 선택 여부 및 이미지 데이터 저장
  const [selected, setSelected] = useState(false);
  const [ImgData, setImgData] = useState();

  return (
    <TopContainerView style={{flex: 1, backgroundColor: 'white'}}>
      <TopView
        marginBottom={5}
        title={'리뷰 작성'}
        backBtn={true}
        backHandler={() => {
          props.navigation.goBack();
        }}
        closeBtn={false}
        searchBtn={false}
      />
      {/* 리뷰 작성 뷰 */}
      <ReviewWriteView
        maxHeight={250}
        marginHorizontal={20}
        borderRadius={20}
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

            // let crop = await ImageCropPicker.openCropper({
            //   path: image.path,
            //   width: 200,
            //   height: 200,
            //   cropperToolbarTitle: '',
            // });

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
      />
    </TopContainerView>
  );
};

export default ReviewWrite;
