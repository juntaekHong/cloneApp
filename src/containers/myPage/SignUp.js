/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import {widthPercentageToDP} from '../../utils/util';
import {
  TopContainerView,
  TopView,
  StandardView,
  BTN,
} from '../../components/common/View';
import {NBGBText} from '../../components/common/Text';
import {TextInput, Keyboard, ScrollView} from 'react-native';
import {UnSelectImg, SelectImg} from '../../components/home/Image';
import colors from '../../configs/colors';
import Swiper from 'react-native-swiper';

const SignUp = props => {
  const [index, setIndex] = useState(0);

  const [id, setId] = useState('');
  const [pass, setPass] = useState('');
  const [passCheck, setPassCheck] = useState('');

  const [passVisible, setPassVisible] = useState(true);

  const swipe = useRef();

  return (
    <TopContainerView>
      <TopView
        title="회원가입"
        backBtn={true}
        backHandler={() => props.navigation.goBack(null)}
      />
      <ScrollView
        style={{
          flex: 1,
        }}>
        <Swiper
          ref={swipe}
          scrollEnabled={false}
          height={'100%'}
          index={index}
          onIndexChanged={async index => {
            await setIndex(index);
          }}
          loop={false}
          showsPagination={true}>
          <StandardView
            margin={20}
            padding={15}
            style={{
              borderWidth: widthPercentageToDP(1),
              borderColor: '#53A6EC',
              borderRadius: widthPercentageToDP(5),
            }}>
            <TextInput
              style={{
                marginTop: widthPercentageToDP(10),
                height: widthPercentageToDP(40),
                borderWidth: widthPercentageToDP(1),
                borderColor: id.length === 0 ? '#dbdbdb' : '#53A6EC',
                borderRadius: widthPercentageToDP(15),
                paddingLeft: widthPercentageToDP(20),
              }}
              placeholder={'아이디'}
              value={id}
              onChangeText={text => setId(text)}
              onSubmitEditing={() => {
                // passRef.current.focus();
              }}
              returnKeyType={'next'}
            />
            <StandardView
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: widthPercentageToDP(30),
                height: widthPercentageToDP(40),
                borderWidth: widthPercentageToDP(1),
                borderColor: pass.length === 0 ? '#dbdbdb' : '#53A6EC',
                borderRadius: widthPercentageToDP(15),
                paddingLeft: widthPercentageToDP(20),
                paddingRight: widthPercentageToDP(5),
              }}>
              <TextInput
                style={{
                  width: widthPercentageToDP(200),
                }}
                // ref={passRef}
                placeholder={'비밀번호'}
                secureTextEntry={passVisible}
                value={pass}
                onChangeText={text => setPass(text)}
                onSubmitEditing={() => {
                  Keyboard.dismiss();

                  // setId('');
                  // setPass('');
                }}
                returnKeyType={'next'}
              />
              {passVisible ? (
                <BTN onPress={() => setPassVisible(!passVisible)}>
                  <UnSelectImg />
                </BTN>
              ) : (
                <BTN
                  onPress={() => setPassVisible(!passVisible)}
                  style={{paddingRight: widthPercentageToDP(3)}}>
                  <SelectImg />
                </BTN>
              )}
            </StandardView>
            <TextInput
              style={{
                marginTop: widthPercentageToDP(30),
                marginBottom: widthPercentageToDP(15),
                height: widthPercentageToDP(40),
                borderWidth: widthPercentageToDP(1),
                borderColor: passCheck.length === 0 ? '#dbdbdb' : '#53A6EC',
                borderRadius: widthPercentageToDP(15),
                paddingLeft: widthPercentageToDP(20),
              }}
              placeholder={'비밀번호 재확인'}
              secureTextEntry={true}
              value={passCheck}
              onChangeText={text => setPassCheck(text)}
              onSubmitEditing={() => {
                Keyboard.dismiss();

                // setId('');
                // setPass('');
              }}
              returnKeyType={'next'}
            />
          </StandardView>
          <StandardView
            margin={20}
            padding={15}
            style={{
              borderWidth: widthPercentageToDP(1),
              borderColor: '#53A6EC',
              borderRadius: widthPercentageToDP(5),
            }}>
            <TextInput
              style={{
                marginTop: widthPercentageToDP(15),
                height: widthPercentageToDP(40),
                borderWidth: widthPercentageToDP(1),
                borderColor: id.length === 0 ? '#dbdbdb' : '#53A6EC',
                borderRadius: widthPercentageToDP(15),
                paddingLeft: widthPercentageToDP(20),
              }}
              placeholder={'이름'}
              returnKeyType={'next'}
            />
            <TextInput
              style={{
                marginTop: widthPercentageToDP(30),
                height: widthPercentageToDP(40),
                borderWidth: widthPercentageToDP(1),
                borderColor: id.length === 0 ? '#dbdbdb' : '#53A6EC',
                borderRadius: widthPercentageToDP(15),
                paddingLeft: widthPercentageToDP(20),
              }}
              placeholder={'닉네임'}
              returnKeyType={'next'}
            />
            <TextInput
              style={{
                marginTop: widthPercentageToDP(30),
                height: widthPercentageToDP(40),
                borderWidth: widthPercentageToDP(1),
                borderColor: id.length === 0 ? '#dbdbdb' : '#53A6EC',
                borderRadius: widthPercentageToDP(15),
                paddingLeft: widthPercentageToDP(20),
              }}
              placeholder={'나이'}
              returnKeyType={'next'}
            />
          </StandardView>
          <StandardView
            padding={15}
            style={{
              marginHorizontal: widthPercentageToDP(20),
              marginBottom: widthPercentageToDP(50),
              borderWidth: widthPercentageToDP(1),
              borderColor: '#53A6EC',
              borderRadius: widthPercentageToDP(5),
            }}>
            <TextInput
              style={{
                marginTop: widthPercentageToDP(15),
                height: widthPercentageToDP(40),
                borderWidth: widthPercentageToDP(1),
                borderColor: id.length === 0 ? '#dbdbdb' : '#53A6EC',
                borderRadius: widthPercentageToDP(15),
                paddingLeft: widthPercentageToDP(20),
              }}
              placeholder={'성별'}
              returnKeyType={'next'}
            />
            <TextInput
              style={{
                marginTop: widthPercentageToDP(30),
                height: widthPercentageToDP(40),
                borderWidth: widthPercentageToDP(1),
                borderColor: id.length === 0 ? '#dbdbdb' : '#53A6EC',
                borderRadius: widthPercentageToDP(15),
                paddingLeft: widthPercentageToDP(20),
              }}
              placeholder={'전화번호'}
              returnKeyType={'next'}
            />
            <TextInput
              style={{
                marginTop: widthPercentageToDP(30),
                height: widthPercentageToDP(40),
                borderWidth: widthPercentageToDP(1),
                borderColor: id.length === 0 ? '#dbdbdb' : '#53A6EC',
                borderRadius: widthPercentageToDP(15),
                paddingLeft: widthPercentageToDP(20),
              }}
              placeholder={'이메일'}
              returnKeyType={'done'}
            />
            <TextInput
              style={{
                marginTop: widthPercentageToDP(30),
                height: widthPercentageToDP(40),
                borderWidth: widthPercentageToDP(1),
                borderColor: id.length === 0 ? '#dbdbdb' : '#53A6EC',
                borderRadius: widthPercentageToDP(15),
                paddingLeft: widthPercentageToDP(20),
              }}
              placeholder={'아바타'}
              returnKeyType={'next'}
            />
          </StandardView>
        </Swiper>
        <StandardView style={{flexDirection: 'row', justifyContent: 'center'}}>
          {index !== 0 ? (
            <BTN
              onPress={async () => {
                await swipe.current.scrollBy(-1);
              }}
              style={{
                marginRight: widthPercentageToDP(5),
                width: widthPercentageToDP(50),
                height: widthPercentageToDP(30),
                backgroundColor: colors.active,
                borderRadius: widthPercentageToDP(10),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <NBGBText color={'white'}>이전</NBGBText>
            </BTN>
          ) : null}
          {index !== 2 ? (
            <BTN
              onPress={async () => {
                await swipe.current.scrollBy(1);
              }}
              style={{
                width: widthPercentageToDP(50),
                height: widthPercentageToDP(30),
                backgroundColor: colors.active,
                borderRadius: widthPercentageToDP(10),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <NBGBText color={'white'}>다음</NBGBText>
            </BTN>
          ) : (
            <BTN
              onPress={async () => {
                // 가입
              }}
              style={{
                width: widthPercentageToDP(50),
                height: widthPercentageToDP(30),
                backgroundColor: colors.active,
                borderRadius: widthPercentageToDP(10),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <NBGBText color={'white'}>완료</NBGBText>
            </BTN>
          )}
        </StandardView>
      </ScrollView>
    </TopContainerView>
  );
};

export default SignUp;
