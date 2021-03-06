/* eslint-disable prettier/prettier */
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
import {SignupActions, SigninActions} from '../../store/actionCreator';
import Toast from 'react-native-root-toast';
import {CheckDuplicatedBtn} from '../../components/signUp/Button';

const SignUp = props => {
  const [index, setIndex] = useState(0);

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
  const [nickNameDuplicated, setNickNameDuplicated] = useState({
    userNickName: '',
    check: false,
  });

  // 나이, 나이 유효성
  const [age, setAge] = useState('');
  const [ageValid, setAgeValid] = useState('');
  // const [ageModal, setAgeModal] = useState(false);

  // 성별
  const [gender, setGender] = useState(null);

  // 전화번호
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberValid, setPhoneNumberValid] = useState('');
  const [phoneCertification, setPhoneCertification] = useState({
    tel: '',
    check: false,
  });
  // SMS 인증
  const [smsNumber, setSmsNumber] = useState('');
  const [smsNumberConfirm, setSmsNumberConfirm] = useState('');

  // 이메일
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState('');
  const [emailDuplicated, setEmailDuplicated] = useState({
    email: '',
    check: false,
  });

  // 아바타

  // 스와이프 ref
  const swipe = useRef(null);

  // inputRef
  const input1 = useRef(null);
  const input2 = useRef(null);
  const input3 = useRef(null);

  const input4 = useRef(null);
  const input5 = useRef(null);
  const input6 = useRef(null);

  const input7 = useRef(null);
  const input8 = useRef(null);

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
  }, [pass, passCheck]);

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

  useEffect(() => {
    let smsNumnberValid;
    const reg = /^([0-9]{6})$/;
    if (reg.test(smsNumber)) smsNumnberValid = true;
    else smsNumnberValid = false;

    smsNumber.length !== 0 && smsNumber.length !== 6 && !smsNumnberValid
      ? setSmsNumberConfirm('* 유효한 인증번호 6자리를 입력해주세요!')
      : setSmsNumberConfirm('');
  }, [smsNumber]);

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
            <StandardView
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: widthPercentageToDP(15),
                height: widthPercentageToDP(40),
                borderWidth: widthPercentageToDP(1),
                borderColor:
                  email.length === 0
                    ? '#dbdbdb'
                    : emailValid.length === 0 && emailDuplicated.check
                    ? '#53A6EC'
                    : 'red',
                borderRadius: widthPercentageToDP(15),
                paddingLeft: widthPercentageToDP(20),
              }}>
              <TextInput
                ref={input1}
                style={{
                  width: widthPercentageToDP(230),
                }}
                placeholder={'이메일'}
                keyboardType={'email-address'}
                value={email}
                onChangeText={async text => {
                  await setEmail(text);

                  if (emailDuplicated.check && emailDuplicated.email !== text) {
                    await setEmailDuplicated({email: '', check: false});
                  }
                }}
                onSubmitEditing={() => {
                  input2.current.focus();
                }}
                returnKeyType={'next'}
              />
              <CheckDuplicatedBtn
                type={'email'}
                data={email}
                dataValid={emailValid}
                checkHandler={async () => {
                  if (email.length === 0 || emailValid.length !== 0) {
                    showMessage(
                      '올바른 이메일을 입력 후, 중복 검사를 하시기 바랍니다!',
                      {
                        position: Toast.positions.CENTER,
                      },
                    );
                  } else {
                    const emailCheck = await SignupActions.checkDuplicated({
                      email: email,
                      role: 'user',
                    });

                    emailCheck
                      ? showMessage('이메일 사용 가능!', {
                          position: Toast.positions.CENTER,
                        })
                      : showMessage('이미 존재하는 이메일입니다!', {
                          position: Toast.positions.CENTER,
                        });

                    await setEmailDuplicated({email: email, check: emailCheck});
                  }
                }}
              />
            </StandardView>
            <NBGBText
              marginLeft={5}
              marginTop={5}
              fontSize={10}
              color={emailValid ? 'red' : '#53A6EC'}>
              {emailValid
                ? emailValid
                : '이메일 입력 후, 이메일 중복 검사를 위해 버튼을 눌러주세요!'}
            </NBGBText>
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
            <NBGBText marginLeft={5} marginTop={5} fontSize={10} color={'red'}>
              {passValid}
            </NBGBText>
            <TextInput
              ref={input3}
              style={{
                marginTop: widthPercentageToDP(15),
                marginBottom: widthPercentageToDP(0),
                height: widthPercentageToDP(40),
                borderWidth: widthPercentageToDP(1),
                borderColor:
                  passCheck.length === 0
                    ? '#dbdbdb'
                    : passSame.length === 0
                    ? '#53A6EC'
                    : 'red',
                borderRadius: widthPercentageToDP(15),
                paddingLeft: widthPercentageToDP(20),
              }}
              placeholder={'비밀번호 재확인'}
              secureTextEntry={true}
              value={passCheck}
              onChangeText={async text => {
                await setPassCheck(text);
              }}
              onSubmitEditing={async () => {
                Keyboard.dismiss();
                await swipe.current.scrollBy(1);
                await input4.current.focus();
                // setId('');
                // setPass('');
              }}
              returnKeyType={'done'}
            />
            <NBGBText marginLeft={5} marginTop={5} fontSize={10} color={'red'}>
              {passSame}
            </NBGBText>
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
              ref={input4}
              style={{
                marginTop: widthPercentageToDP(15),
                height: widthPercentageToDP(40),
                borderWidth: widthPercentageToDP(1),
                borderColor:
                  name.length === 0
                    ? '#dbdbdb'
                    : nameValid.length === 0
                    ? '#53A6EC'
                    : 'red',
                borderRadius: widthPercentageToDP(15),
                paddingLeft: widthPercentageToDP(20),
              }}
              placeholder={'이름'}
              value={name}
              onChangeText={text => setName(text)}
              onSubmitEditing={() => {
                input5.current.focus();
              }}
              returnKeyType={'next'}
            />
            <NBGBText marginLeft={5} marginTop={5} fontSize={10} color={'red'}>
              {nameValid}
            </NBGBText>
            <StandardView
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: widthPercentageToDP(15),
                height: widthPercentageToDP(40),
                borderWidth: widthPercentageToDP(1),
                borderColor:
                  nickName.length === 0
                    ? '#dbdbdb'
                    : nickNameValid.length === 0 && nickNameDuplicated.check
                    ? '#53A6EC'
                    : 'red',
                borderRadius: widthPercentageToDP(15),
                paddingLeft: widthPercentageToDP(20),
              }}>
              <TextInput
                ref={input5}
                style={{width: widthPercentageToDP(230)}}
                placeholder={'닉네임'}
                value={nickName}
                onChangeText={async text => {
                  await setNickName(text);

                  if (
                    nickNameDuplicated.check &&
                    nickNameDuplicated.userNickName !== text
                  ) {
                    await setNickNameDuplicated({
                      userNickName: '',
                      check: false,
                    });
                  }
                }}
                onSubmitEditing={() => {
                  input6.current.focus();
                }}
                returnKeyType={'next'}
              />
              <CheckDuplicatedBtn
                type={'nickName'}
                data={nickName}
                dataValid={nickNameValid}
                checkHandler={async () => {
                  if (nickName.length === 0 || nickNameValid.length !== 0) {
                    showMessage(
                      '올바른 닉네임을 입력 후, 중복 검사를 하시기 바랍니다!',
                      {
                        position: Toast.positions.CENTER,
                      },
                    );
                  } else {
                    const nickNameCheck = await SignupActions.checkDuplicated({
                      userNickName: nickName,
                      role: 'user',
                    });

                    nickNameCheck
                      ? showMessage('닉네임 사용 가능!', {
                          position: Toast.positions.CENTER,
                        })
                      : showMessage('이미 존재하는 닉네임입니다!', {
                          position: Toast.positions.CENTER,
                        });

                    await setNickNameDuplicated({
                      userNickName: nickName,
                      check: nickNameCheck,
                    });
                  }
                }}
              />
            </StandardView>
            <NBGBText
              marginLeft={5}
              marginTop={5}
              fontSize={10}
              color={nickNameValid ? 'red' : '#53A6EC'}>
              {nickNameValid
                ? nickNameValid
                : '닉네임 입력 후, 닉네임 중복 검사를 위해 버튼을 눌러주세요!'}
            </NBGBText>
            <TextInput
              ref={input6}
              style={{
                marginTop: widthPercentageToDP(15),
                width: widthPercentageToDP(70),
                height: widthPercentageToDP(40),
                borderWidth: widthPercentageToDP(1),
                borderColor:
                  age.length === 0
                    ? '#dbdbdb'
                    : ageValid.length === 0
                    ? '#53A6EC'
                    : 'red',
                borderRadius: widthPercentageToDP(15),
                paddingLeft: widthPercentageToDP(20),
              }}
              placeholder={'나이'}
              keyboardType={'number-pad'}
              returnKeyType={'done'}
              value={age}
              onChangeText={text => setAge(text)}
              onSubmitEditing={async () => {
                Keyboard.dismiss();
                await swipe.current.scrollBy(1);
              }}
            />
            <NBGBText marginLeft={5} marginTop={5} fontSize={10} color={'red'}>
              {ageValid}
            </NBGBText>
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
            <StandardView
              style={{
                flexDirection: 'row',
                marginTop: widthPercentageToDP(15),
              }}>
              <BTN
                onPress={() => {
                  setGender('여자');
                  input7.current.focus();
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
                  input7.current.focus();
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
            <StandardView
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: widthPercentageToDP(30),
                height: widthPercentageToDP(40),
                borderWidth: widthPercentageToDP(1),
                borderColor:
                  phoneNumber.length === 0
                    ? '#dbdbdb'
                    : phoneNumberValid.length === 0 && phoneCertification.check
                    ? '#53A6EC'
                    : 'red',
                borderRadius: widthPercentageToDP(15),
                paddingLeft: widthPercentageToDP(20),
              }}>
              <TextInput
                ref={input7}
                style={{
                  width: widthPercentageToDP(230),
                }}
                placeholder={'전화번호 ( "-" 제외 )'}
                keyboardType={'number-pad'}
                value={phoneNumber}
                onChangeText={async text => {
                  await setPhoneNumber(text);

                  if (
                    phoneCertification.check &&
                    phoneCertification.tel !== text
                  ) {
                    await setPhoneCertification({
                      tel: '',
                      check: false,
                    });
                  }
                }}
                onSubmitEditing={() => {}}
                returnKeyType={'done'}
              />
              <CheckDuplicatedBtn
                type={'SMS'}
                data={phoneNumber}
                dataValid={phoneNumberValid}
                checkHandler={async () => {
                  if (
                    phoneNumber.length === 0 ||
                    phoneNumberValid.length !== 0
                  ) {
                    // SMS 인증번호가 발송되었습니다.\n인증번호를 입력해 주세요!
                    showMessage('잘못된 전화번호를 입력하셨습니다.', {
                      position: Toast.positions.CENTER,
                    });
                  } else {
                    const smsCertification = await SignupActions.smsRequest({
                      tel: phoneNumber,
                    });
                    smsCertification
                      ? showMessage(
                          '정상적으로 SMS 인증번호가 발송되었습니다.\n인증번호를 입력해주세요!',
                          {
                            position: Toast.positions.CENTER,
                          },
                        )
                      : showMessage('SMS 인증번호 요청에 실패하였습니다.', {
                          position: Toast.positions.CENTER,
                        });
                    await setPhoneCertification({
                      tel: phoneNumber,
                      check: false,
                    });

                    await input8.current.focus();
                  }
                }}
              />
            </StandardView>
            <NBGBText
              marginLeft={5}
              marginTop={5}
              fontSize={10}
              color={phoneNumberValid ? 'red' : '#53A6EC'}>
              {phoneNumberValid
                ? phoneNumberValid
                : '전화번호 입력 후, 전화번호 SMS인증을 위해 버튼을 눌러주세요!'}
            </NBGBText>
            <StandardView
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: widthPercentageToDP(30),
                height: widthPercentageToDP(40),
                borderWidth: widthPercentageToDP(1),
                borderColor:
                  smsNumber.length === 0
                    ? '#dbdbdb'
                    : smsNumberConfirm.length === 0
                    ? '#53A6EC'
                    : 'red',
                borderRadius: widthPercentageToDP(15),
                paddingLeft: widthPercentageToDP(20),
              }}>
              <TextInput
                ref={input8}
                style={{
                  width: widthPercentageToDP(230),
                }}
                placeholder={'인증번호 6자리를 입력해주세요. ( "-" 제외 )'}
                keyboardType={'number-pad'}
                value={smsNumber}
                onChangeText={async text => {
                  if (phoneCertification.check && smsNumber !== text) {
                    await setPhoneCertification({
                      tel: '',
                      check: false,
                    });
                  }

                  await setSmsNumber(text);
                }}
                onSubmitEditing={() => {}}
                returnKeyType={'done'}
              />
              <CheckDuplicatedBtn
                type={'SMSCertification'}
                data={smsNumber}
                dataValid={smsNumberConfirm}
                checkHandler={async () => {
                  if (smsNumber.length === 0 || smsNumberConfirm.length !== 0) {
                    showMessage('올바른 인증번호를 입력해주세요.', {
                      position: Toast.positions.CENTER,
                    });
                  } else {
                    const certification = await SignupActions.verifyPhoneNumber(
                      {
                        tel: phoneNumber,
                        userInputNumber: smsNumber,
                      },
                    );

                    certification
                      ? showMessage('SMS 인증에 성공하였습니다!', {
                          position: Toast.positions.CENTER,
                        })
                      : showMessage(
                          '인증번호가 일치하지 않습니다.\n다시 시도해주세요!',
                          {
                            position: Toast.positions.CENTER,
                          },
                        );

                    await setPhoneCertification({
                      tel: phoneNumber,
                      check: certification,
                    });
                  }
                }}
              />
            </StandardView>
            <NBGBText
              marginLeft={5}
              marginTop={5}
              fontSize={10}
              color={smsNumberConfirm ? 'red' : '#53A6EC'}>
              {smsNumberConfirm
                ? smsNumberConfirm
                : '전화번호 입력 후, 전화번호 SMS인증을 위해 버튼을 눌러주세요!'}
            </NBGBText>
            <View
              style={{
                marginTop: widthPercentageToDP(30),
                height: widthPercentageToDP(30),
              }}
            />
            {/* 아바타 데이터 추가해야 함. */}
            {/* <TextInput
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
            /> */}
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
                  pass.length !== 0 &&
                  passCheck.length !== 0 &&
                  name.length !== 0 &&
                  nickName.length !== 0 &&
                  age.length !== 0 &&
                  gender !== null &&
                  phoneNumber.length !== 0 &&
                  email.length !== 0 &&
                  smsNumber.length !== 0
                ) {
                  if (
                    passValid.length === 0 &&
                    passSame.length === 0 &&
                    nameValid.length === 0 &&
                    nickNameValid.length === 0 &&
                    ageValid.length === 0 &&
                    gender !== null &&
                    phoneNumberValid.length === 0 &&
                    emailValid.length === 0 &&
                    smsNumberConfirm.length === 0
                  ) {
                    if (
                      emailDuplicated.check &&
                      nickNameDuplicated.check &&
                      phoneCertification.check
                    ) {
                      let userData = {
                        email: email,
                        userPw: pass,
                        userName: name,
                        userNickName: nickName,
                        age: age,
                        gender: gender,
                        tel: phoneNumber,
                      };
                      await SignupActions.signUp(userData);

                      showMessage('정상적으로 회원가입이 되었습니다!', {
                        position: Toast.positions.CENTER,
                      });

                      props.navigation.goBack(null);
                    } else {
                      showMessage(
                        '이메일 또는 닉네임, SMS인증 여부를 확인해주세요!',
                        {
                          position: Toast.positions.CENTER,
                        },
                      );
                    }
                  } else {
                    showMessage('잘못된 입력한 항목이 있습니다.', {
                      position: Toast.positions.CENTER,
                    });
                  }
                } else {
                  showMessage('입력하지 않은 항목이 있습니다.', {
                    position: Toast.positions.CENTER,
                  });
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
