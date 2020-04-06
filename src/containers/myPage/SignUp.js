/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useEffect} from 'react';
import {widthPercentageToDP, showMessage} from '../../utils/util';
import {
  TopContainerView,
  TopView,
  StandardView,
  BTN,
} from '../../components/common/View';
import {NBGBText} from '../../components/common/Text';
import {TextInput, Keyboard, ScrollView, View} from 'react-native';
import {UnSelectImg, SelectImg} from '../../components/home/Image';
import colors from '../../configs/colors';
import Swiper from 'react-native-swiper';
import {
  checkPass,
  checkPassCompare,
  checkName,
  checkNickNameLength,
  checkNickName,
  checkEmail,
  checkPhoneNumber,
  checkAge,
} from '../../utils/validation';
import {SignupActions} from '../../store/actionCreator';
import {SignUpView} from '../../components/myPage/View';
import {SignUpTI} from '../../components/myPage/TextInput';
import {AlertText} from '../../components/myPage/Text';
// import {WheelPicker} from '../../components/signUp/modal';

const SignUp = props => {
  const [index, setIndex] = useState(0);

  // 아이디, 아이디 유효성
  const [id, setId] = useState('');
  const [idValid, setIdValid] = useState('');
  // 비밀번호, 비밀번호 유효성
  const [pass, setPass] = useState('');
  const [passValid, setPassValid] = useState('');
  // 비밀번호 재확인, 비밀번호 일치 유효성
  const [passCheck, setPassCheck] = useState('');
  const [passSame, setPassSame] = useState('');

  // 비밀번호 보이기
  const [passVisible, setPassVisible] = useState(true);

  // 이름, 이름 유효성
  const [name, setName] = useState('');
  const [nameValid, setNameValid] = useState('');

  // 닉네임, 닉네임 유효성
  const [nickName, setNickName] = useState('');
  const [nickNameValid, setNickNameValid] = useState('');

  // 나이, 나이 유효성
  const [age, setAge] = useState('');
  const [ageValid, setAgeValid] = useState('');
  // const [ageModal, setAgeModal] = useState(false);

  // 성별
  const [gender, setGender] = useState(null);

  // 전화번호
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberValid, setPhoneNumberValid] = useState('');

  // 이메일
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState('');

  // 아바타

  // 스와이프 ref
  const swipe = useRef(null);

  // inputRef
  const input1 = useRef(null);
  const input2 = useRef(null);
  const input3 = useRef(null);

  // 아이디 입력시, 아이디 유효성 체크
  useEffect(() => {
    if (id.length !== 0 && id.length < 3) {
      setIdValid('* 3글자 이상 입력해주세요.');
    } else {
      setIdValid('');
    }
  }, [id]);

  // 비밀번호 입력시, 비밀번호 유효성 체크
  useEffect(() => {
    let valid = checkPass(pass);

    pass.length !== 0 && !valid
      ? setPassValid('* 대소문자&숫자&특수문자를 포함 7자이상 입력해주세요.')
      : setPassValid('');
  }, [pass]);

  useEffect(() => {
    let same = checkPassCompare(pass, passCheck);

    !same ? setPassSame('* 비밀번호가 일치하지 않습니다.') : setPassSame('');
  }, [passCheck]);

  useEffect(() => {
    let valid = checkName(name);

    name.length !== 0 && !valid
      ? setNameValid('* 올바르지 않은 이름입니다.')
      : setNameValid('');
  }, [name]);

  useEffect(() => {
    let valid1 = checkNickNameLength(nickName);
    let valid2 = checkNickName(nickName);

    nickName.length !== 0 && !valid1
      ? setNickNameValid('* 2글자이상 17자미만으로 입력하세요.')
      : nickName.length !== 0 && !valid2
      ? setNickNameValid('* 올바르지 않은 닉네임입니다.')
      : setNickNameValid('');
  }, [nickName]);

  useEffect(() => {
    let valid1 = parseInt(age);
    let valid2 = checkAge(age);

    age.length !== 0 && (valid1 <= 0 || valid1 > 150 || !valid2)
      ? setAgeValid('올바르는지 않는 나이입니다.')
      : setAgeValid('');
  }, [age]);

  useEffect(() => {
    let valid = checkEmail(email);

    email.length !== 0 && !valid
      ? setEmailValid('* 유효하지 않은 이메일입니다.')
      : setEmailValid('');
  }, [email]);

  useEffect(() => {
    let valid = checkPhoneNumber(phoneNumber);

    phoneNumber.length !== 0 && !valid
      ? setPhoneNumberValid('* 유효하지 않은 전화번호입니다.')
      : setPhoneNumberValid('');
  }, [phoneNumber]);

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
          <SignUpView>
            <SignUpTI
              inputValue={id}
              inputValueValid={idValid}
              placeholder={'아이디'}
              value={id}
              onChangeText={text => {
                setId(text);
              }}
              onSubmitEditing={() => {
                // passRef.current.focus();
                input2.current.focus();
              }}
              returnKeyType={'next'}
            />
            <AlertText>{idValid}</AlertText>
            <StandardView
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: widthPercentageToDP(15),
                height: widthPercentageToDP(40),
                borderWidth: widthPercentageToDP(1),
                borderColor:
                  pass.length === 0
                    ? '#dbdbdb'
                    : passValid.length === 0
                    ? '#53A6EC'
                    : 'red',
                borderRadius: widthPercentageToDP(15),
                paddingLeft: widthPercentageToDP(20),
                paddingRight: widthPercentageToDP(5),
              }}>
              <TextInput
                ref={input2}
                style={{
                  width: widthPercentageToDP(200),
                }}
                // ref={passRef}
                placeholder={'비밀번호'}
                secureTextEntry={passVisible}
                value={pass}
                onChangeText={text => {
                  setPass(text);
                }}
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                  input3.current.focus();
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
            <AlertText>{passValid}</AlertText>
            <SignUpTI
              ref={input3}
              marginTop={15}
              marginBottom={0}
              inputValue={passCheck}
              inputValueValid={passSame}
              placeholder={'비밀번호 재확인'}
              secureTextEntry={true}
              value={passCheck}
              onChangeText={async text => {
                await setPassCheck(text);
              }}
              onSubmitEditing={async () => {
                Keyboard.dismiss();
                // setId('');
                // setPass('');
              }}
              returnKeyType={'done'}
            />
            <AlertText>{passSame}</AlertText>
          </SignUpView>
          <SignUpView>
            <SignUpTI
              inputValue={name}
              inputValueValid={nameValid}
              placeholder={'이름'}
              value={name}
              onChangeText={text => setName(text)}
              onSubmitEditing={() => {
                // passRef.current.focus();
              }}
              returnKeyType={'next'}
            />
            <AlertText>{nameValid}</AlertText>
            <SignUpTI
              inputValue={nickName}
              inputValueValid={nickNameValid}
              placeholder={'닉네임'}
              value={nickName}
              onChangeText={text => setNickName(text)}
              onSubmitEditing={() => {
                // passRef.current.focus();
              }}
              returnKeyType={'next'}
            />
            <AlertText>{nickNameValid}</AlertText>
            <SignUpTI
              width={70}
              inputValue={age}
              inputValueValid={ageValid}
              placeholder={'나이'}
              keyboardType={'number-pad'}
              value={age}
              onChangeText={text => setAge(text)}
              onSubmitEditing={() => {
                // passRef.current.focus();
              }}
            />
            <AlertText>{ageValid}</AlertText>
          </SignUpView>
          <StandardView
            padding={15}
            style={{
              marginHorizontal: widthPercentageToDP(20),
              marginBottom: widthPercentageToDP(50),
              borderWidth: widthPercentageToDP(1),
              borderColor: '#53A6EC',
              borderRadius: widthPercentageToDP(5),
            }}>
            <StandardView
              style={{
                flexDirection: 'row',
                marginTop: widthPercentageToDP(15),
              }}>
              <BTN
                onPress={() => {
                  setGender('여자');
                }}
                activeOpacity={1}
                style={{
                  flexDirection: 'row',
                  marginRight: widthPercentageToDP(30),
                }}>
                <View
                  style={{
                    width: widthPercentageToDP(15),
                    height: widthPercentageToDP(15),
                    borderWidth: widthPercentageToDP(1),
                    borderRadius: widthPercentageToDP(7.5),
                    marginRight: widthPercentageToDP(10),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: widthPercentageToDP(10),
                      height: widthPercentageToDP(10),
                      borderRadius: widthPercentageToDP(5),
                      backgroundColor: gender !== '여자' ? 'white' : '#53A6EC',
                    }}
                  />
                </View>
                <NBGBText>여자</NBGBText>
              </BTN>
              <BTN
                onPress={() => {
                  setGender('남자');
                }}
                activeOpacity={1}
                style={{
                  flexDirection: 'row',
                  marginRight: widthPercentageToDP(30),
                }}>
                <View
                  style={{
                    width: widthPercentageToDP(15),
                    height: widthPercentageToDP(15),
                    borderWidth: widthPercentageToDP(1),
                    borderRadius: widthPercentageToDP(7.5),
                    marginRight: widthPercentageToDP(10),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: widthPercentageToDP(10),
                      height: widthPercentageToDP(10),
                      borderRadius: widthPercentageToDP(5),
                      backgroundColor: gender !== '남자' ? 'white' : '#53A6EC',
                    }}
                  />
                </View>
                <NBGBText>남자</NBGBText>
              </BTN>
            </StandardView>
            <SignUpTI
              marginTop={30}
              inputValue={phoneNumber}
              inputValueValid={phoneNumberValid}
              placeholder={'전화번호 ( "-" 제외 )'}
              keyboardType={'number-pad'}
              value={phoneNumber}
              onChangeText={text => setPhoneNumber(text)}
              onSubmitEditing={() => {
                // passRef.current.focus();
              }}
              returnKeyType={'next'}
            />
            <AlertText>{phoneNumberValid}</AlertText>
            <SignUpTI
              marginTop={15}
              inputValue={email}
              inputValueValid={emailValid}
              placeholder={'이메일'}
              keyboardTAlertTextype={'email-address'}
              value={email}
              onChangeText={text => setEmail(text)}
              onSubmitEditing={() => {
                // passRef.current.focus();
              }}
              returnKeyType={'done'}
            />
            <AlertText>{emailValid}</AlertText>
            {/* 아바타 데이터 추가해야 함. */}
            <View
              style={{
                marginTop: widthPercentageToDP(30),
                height: widthPercentageToDP(25),
              }}
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
                Keyboard.dismiss();

                if (
                  idValid.length === 0 &&
                  passValid.length === 0 &&
                  nameValid.length === 0 &&
                  nickNameValid.length === 0 &&
                  ageValid.length === 0 &&
                  gender !== null &&
                  phoneNumberValid.length === 0 &&
                  emailValid.length === 0
                ) {
                  let userData = {
                    userId: id,
                    userPw: pass,
                    userName: name,
                    userNickName: nickName,
                    age: age,
                    gender: gender,
                    tel: phoneNumber,
                    email: email,
                  };

                  await SignupActions.signUp(userData);

                  props.navigation.goBack(null);
                } else {
                  showMessage(
                    '입력하지 않은 항목이 있거나 잘못된 입력한 항목이 있습니다.',
                  );
                }
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
