/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useEffect, useState} from 'react';
import {NavigationEvents, FlatList} from 'react-navigation';
// import LottieView from 'lottie-react-native';
import {connect} from 'react-redux';
import {TopContainerView, BTN} from '../../components/common/View';
import {TopView, HomeAd} from '../../components/home/View';
import {DataList} from '../../components/home/DataList';
import {Img} from '../../components/common/Image';
import {Image} from 'react-native';
import {widthPercentageToDP} from '../../utils/util';
import {ReviewActions} from '../../store/actionCreator';
import ImageCropPicker from 'react-native-image-crop-picker';
import {NBGText} from '../../components/common/Text';

// 병원별 이미지 및 타이틀
const DATA = [
  {
    image: require('../../../assets/image/home/star.png'),
    // 일단 임시
    title: '즐겨찾는\n병원',
    // 추가 필요
    hospitalCategoryName: '즐겨찾기',
  },
  {
    image: require('../../../assets/image/home/hospital.png'),
    // 일단 임시
    title: '모든 병원',
    // 추가 필요
    hospitalCategoryName: '모두',
  },
  {
    image: require('../../../assets/image/home/hospital.png'),
    title: '군)\n병원',
    // 추가 필요
    hospitalCategoryName: '보건(의료원)소',
  },
  {
    image: require('../../../assets/image/home/fetus.png'),
    title: '산부인과',
    hospitalCategoryName: '산부인과',
  },
  {
    image: require('../../../assets/image/home/stomach.png'),
    title: '내과',
    hospitalCategoryName: '내과',
  },
  {
    image: require('../../../assets/image/home/doctor.png'),
    title: '외과',
    hospitalCategoryName: '외과',
  },
  {
    image: require('../../../assets/image/home/acupuncture.png'),
    title: '한의원',
    // 추가 필요
  },
  {
    image: require('../../../assets/image/home/tooth.png'),
    title: '치과',
    hospitalCategoryName: '치과',
  },
  {
    image: require('../../../assets/image/home/ear.png'),
    title: '이비인후과',
    hospitalCategoryName: '이비인후과',
  },
  {
    image: require('../../../assets/image/home/injury.png'),
    title: '정형외과',
    hospitalCategoryName: '정형외과',
  },
  {
    image: require('../../../assets/image/home/healthcare-and-medical.png'),
    title: '성형외과',
    hospitalCategoryName: '성형외과',
  },
  {
    image: require('../../../assets/image/home/mental-health.png'),
    title: '정신건강의학과',
    hospitalCategoryName: '정신건강의학과',
  },
  {
    image: require('../../../assets/image/home/pill.png'),
    title: '약국',
  },
];

const Home = props => {
  const lottie = useRef(null);

  return (
    <TopContainerView>
      <TopView
        settingLocation={props.address}
        height={55}
        justifyContent={'center'}
        navigation={props.navigation}
      />
      <BTN
        style={{
          margin: widthPercentageToDP(2),
          height: widthPercentageToDP(50),
          padding: widthPercentageToDP(5),
          borderWidth: widthPercentageToDP(2),
          borderRadius: widthPercentageToDP(6),
          borderColor: '#dbdbdb',
          justifyContent: 'center',
        }}
        onPress={async () => {
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
              location: image.path,
              type: `${image.mime}`,
              name: `test.${image.mime.substr(
                image.mime.indexOf('/') + 1,
                image.mime.length - 1,
              )}`,
            });

            const ImageFormat = await ReviewActions.uploadImg(formData);
            await ReviewActions.postReview(ImageFormat);
          } catch (err) {
            console.log(err);
          } finally {
            await ImageCropPicker.clean();
          }
        }}>
        <NBGText>앨범에서 사진 선택 (이미지 테스트, 임시 생성)</NBGText>
      </BTN>
      {/* <BTN
        style={{
          margin: widthPercentageToDP(2),
          height: widthPercentageToDP(50),
          padding: widthPercentageToDP(5),
          borderWidth: widthPercentageToDP(2),
          borderRadius: widthPercentageToDP(6),
          borderColor: '#dbdbdb',
          justifyContent: 'center',
        }}
        onPress={async () => {
          try {
            let image = await ImageCropPicker.openCamera({
              width: 200,
              height: 200,
              cropping: true,
              cropperToolbarTitle: '',
            });

            const formData = new FormData();
            formData.append('avatar', {
              uri: image.path,
              type: 'image/png',
              name: 'avatar.png',
            });
          } catch (err) {
            console.log(err);
          } finally {
            await ImageCropPicker.clean();
          }
        }}>
        <NBGText>사진찍고 선택</NBGText>
      </BTN> */}
      <FlatList
        style={{flexGrow: 1, width: '100%', height: '100%'}}
        data={props.my_review_list}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          console.log(item.img);
          return item.img !== null ? (
            <Image
              style={{
                width: widthPercentageToDP(50),
                height: widthPercentageToDP(60),
              }}
              source={{uri: item.img}}
            />
          ) : null;
        }}
      />
      {/* 광고 배너 뷰 작업 */}
      <NavigationEvents
        onWillFocus={() => {
          try {
            if (lottie.current) lottie.current.play();
          } catch (e) {}
        }}
        onWillBlur={() => {
          try {
            if (lottie.current) lottie.current.play();
          } catch (e) {}
        }}
      />

      {/* 임시로 아무 이미지 광고 배너 넣음. */}
      <HomeAd
        list={[
          {
            noticeIndex: 1,
            noticeImg:
              'https://littledeep.com/wp-content/uploads/2019/05/littledeep_hospital_sns-1024x552.png',
            info: null,
            createdAt: '2019-05-23T18:21:20.000Z',
            updatedAt: '2019-09-23T10:37:20.000Z',
          },
          {
            noticeIndex: 2,
            noticeImg:
              'https://previews.123rf.com/images/photoplotnikov/photoplotnikov1603/photoplotnikov160300032/53961525-도시-병원-파란색-배경에-플랫-디자인에서-구급차와-헬리콥터-건물-클리닉-벡터-일러스트-레이션.jpg',
            info: null,
            createdAt: '2019-02-12T23:02:06.000Z',
            updatedAt: '2019-09-01T10:45:48.000Z',
          },
        ]}
      />
      <DataList data={DATA} navigation={props.navigation} />
    </TopContainerView>
  );
};

export default connect(state => ({
  address: state.common.address,

  my_review_list: state.review.my_review_list,
}))(Home);
