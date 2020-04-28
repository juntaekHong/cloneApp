/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useEffect} from 'react';
import {connect} from 'react-redux';
import {
  TopContainerView,
  TopView,
  BTN,
  StandardView,
} from '../../components/common/View';
import {NBGBText, NBGText} from '../../components/common/Text';
import {widthPercentageToDP, getData, showMessage} from '../../utils/util';
import {CustomModal} from '../../components/common/Modal';
import colors from '../../configs/colors';
import {TextInput, Keyboard, Linking, ScrollView} from 'react-native';
import {SelectImg, UnSelectImg} from '../../components/home/Image';
import {
  SigninActions,
  ReservationActions,
  HospitalActions,
  ReviewActions,
} from '../../store/actionCreator';
import {
  LoginOutView,
  DivisionView,
  LoginView,
  MyInfoView,
  MySubView,
  AppSubView,
} from '../../components/myPage/View';
import {LoginBtn} from '../../components/myPage/Button';
import Communications from 'react-native-communications';
import Toast from 'react-native-root-toast';

const MyPage = props => {
  // 로그인 모달
  const [loginModal, setLoginModal] = useState(false);

  // 아이디, 패스워드
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  // 비밀번호 보이기
  const [passVisible, setPassVisible] = useState(true);

  // 로그인 시, 이메일 인증안되어 있으면, 이메일 인증 문구
  const [resultMessage, setResultMessage] = useState();

  // 아이디 입력 후, 패스워드 포커싱
  const passRef = useRef(null);

  // 병원 상세페이지에서 예약버튼을 통한 자동으로 로그인 창 뜨기.
  useEffect(() => {
    let promise1;

    if (props.navigation.state.params !== undefined) {
      promise1 = props.navigation.state.params.autoLoginModal;

      Promise.all([promise1]).then(async () => {
        let timeout = setInterval(async () => {
          await setLoginModal(props.navigation.state.params.autoLoginModal);
          clearInterval(timeout);
        }, 500);
      });
    }
  }, [props.navigation]);

  return (
    <TopContainerView>
      <TopView title="마이 페이지" />
      <CustomModal
        width={300}
        height={350}
        visible={loginModal}
        closeHandler={() => {
          setPassVisible(true);
          setEmail('');
          setPass('');
          setLoginModal(false);
        }}
        children={
          <StandardView
            style={{
              marginHorizontal: widthPercentageToDP(20),
            }}>
            <StandardView>
              <NBGBText fontSize={20} align={'center'}>
                로그인
              </NBGBText>
              <TextInput
                style={{
                  marginTop: widthPercentageToDP(30),
                  height: widthPercentageToDP(40),
                  borderWidth: widthPercentageToDP(1),
                  borderColor: email.length === 0 ? '#dbdbdb' : '#53A6EC',
                  borderRadius: widthPercentageToDP(15),
                  paddingLeft: widthPercentageToDP(20),
                }}
                placeholder={'이메일'}
                value={email}
                onChangeText={text => setEmail(text)}
                onSubmitEditing={() => {
                  passRef.current.focus();
                }}
                keyboardType={'email-address'}
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
                  ref={passRef}
                  placeholder={'비밀번호'}
                  secureTextEntry={passVisible}
                  value={pass}
                  onChangeText={text => setPass(text)}
                  onSubmitEditing={() => {
                    Keyboard.dismiss();

                    // setId('');
                    // setPass('');
                  }}
                  returnKeyType={'done'}
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
            </StandardView>
          </StandardView>
        }
        renderFooter={() => {
          return (
            <StandardView style={{flexDirection: 'row', width: '100%'}}>
              <BTN
                style={{
                  flex: 1,
                  height: widthPercentageToDP(50),
                  backgroundColor: colors.notFocus,
                  margin: 0,
                  borderBottomLeftRadius: widthPercentageToDP(14),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={async () => {
                  await setLoginModal(false);
                  await setPassVisible(true);
                  setEmail('');
                  setPass('');

                  await props.navigation.navigate('SignUp');
                }}>
                <NBGBText fontSize={15} color={'white'}>
                  회원가입
                </NBGBText>
              </BTN>
              <BTN
                style={{
                  flex: 1,
                  height: widthPercentageToDP(50),
                  backgroundColor:
                    email.length === 0 || pass.length === 0
                      ? colors.notFocus
                      : colors.active,
                  margin: 0,
                  borderBottomRightRadius: widthPercentageToDP(14),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                disabled={
                  email.length === 0 || pass.length === 0 ? true : false
                }
                onPress={async () => {
                  const result = await SigninActions.signIn(email, pass);

                  await setLoginModal(false);
                  await setPassVisible(true);
                  await setEmail('');
                  await setPass('');

                  const userEmail = await getData('email');

                  if (result !== true && userEmail === null) {
                    if (result) {
                      showMessage(result, {
                        position: Toast.positions.CENTER,
                      });
                      await setResultMessage(result);
                    } else {
                      showMessage('잘못된 이메일 또는 비밀번호입니다.', {
                        position: Toast.positions.CENTER,
                      });
                    }
                  } else {
                    // 로그인하면, 해당 아이디의 진료내역 데이터들 가져오기.
                    await ReservationActions.getReservation();
                    await ReservationActions.getReservationLog();

                    await HospitalActions.getAllHospitalSubscribers();
                    await ReviewActions.getMyReview();
                  }
                }}>
                <NBGBText fontSize={15} color={'white'}>
                  로그인
                </NBGBText>
              </BTN>
            </StandardView>
          );
        }}
      />
      <ScrollView>
        <LoginOutView
          paddingVertical={20}
          paddingLeft={20}
          borderWidth={1}
          title={'로그인 상태'}
          arrowImg={true}
          user={props.user}
          sign={() => {
            return props.user === null ? (
              <LoginBtn
                loginModal={() => {
                  setLoginModal(true);
                }}
              />
            ) : (
              <LoginView user={props.user} />
            );
          }}
        />
        <MyInfoView
          paddingVertical={20}
          paddingLeft={20}
          user={props.user}
          myInfoHandler={() => {
            props.navigation.navigate('MyInfo');
          }}
        />
        <DivisionView borderWidth={3} borderColor={'#F6F7F9'} />
        <MySubView
          paddingVertical={20}
          paddingLeft={20}
          borderWidth={1}
          title={'즐겨찾기 목록'}
          imgUrl={require('../../../assets/image/myPage/ui.png')}
          myInfoHandler={async () => {
            if (props.user === null || props.user.userName === undefined) {
              showMessage('로그인 또는 이메일 인증이 되지 않았습니다.', {
                position: Toast.positions.CENTER,
              });
            } else {
              props.navigation.navigate('MySubs');
            }
          }}
        />
        <MySubView
          paddingVertical={20}
          paddingLeft={20}
          borderWidth={1}
          title={'리뷰 목록'}
          imgUrl={require('../../../assets/image/myPage/review.png')}
          myInfoHandler={async () => {
            if (props.user === null || props.user.userName === undefined) {
              showMessage('로그인 또는 이메일 인증이 되지 않았습니다.', {
                position: Toast.positions.CENTER,
              });
            } else {
              props.navigation.navigate('MyReview');
            }
          }}
        />
        <DivisionView borderWidth={3} borderColor={'#F6F7F9'} />
        <AppSubView
          paddingVertical={20}
          paddingLeft={20}
          borderWidth={1}
          title={'뽀듬 서비스 문의하기'}
          arrowImg={true}
          appInfoHandler={() => {}}
        />
        <AppSubView
          paddingVertical={20}
          paddingLeft={20}
          borderWidth={1}
          title={'사용자 의견 보내기'}
          arrowImg={true}
          appInfoHandler={() => {}}
        />
        <AppSubView
          paddingVertical={20}
          paddingLeft={20}
          borderWidth={1}
          title={'뽀듬 고객센터 전화하기'}
          arrowImg={true}
          appInfoHandler={() => {
            // 임시
            Communications.phonecall('01034899742', false);
          }}
        />
        <AppSubView
          paddingVertical={20}
          paddingLeft={20}
          borderWidth={1}
          title={'약관 보기'}
          arrowImg={true}
          appInfoHandler={() => {}}
        />
        <AppSubView
          paddingVertical={20}
          paddingLeft={20}
          borderWidth={1}
          title={'버전 정보'}
          arrowImg={false}
          version={'1. 0. 0'}
        />
      </ScrollView>
    </TopContainerView>
  );
};

export default connect(state => ({
  user: state.signin.user,
}))(MyPage);
