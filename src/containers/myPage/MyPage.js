/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useEffect, useCallback} from 'react';
import {connect} from 'react-redux';
import {
  TopContainerView,
  TopView,
  BTN,
  StandardView,
} from '../../components/common/View';
import {NBGBText} from '../../components/common/Text';
import {
  widthPercentageToDP,
  getData,
  removeData,
  showMessage,
} from '../../utils/util';
import {CustomModal} from '../../components/common/Modal';
import colors from '../../configs/colors';
import {TextInput, Keyboard} from 'react-native';
import {SelectImg, UnSelectImg} from '../../components/home/Image';
import {SigninActions} from '../../store/actionCreator';
import {handleLoginData} from '../../store/modules/sign/signin';

const MyPage = props => {
  const [loginModal, setLoginModal] = useState(false);

  const [id, setId] = useState('');
  const [pass, setPass] = useState('');

  const [passVisible, setPassVisible] = useState(true);

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
      <CustomModal
        width={300}
        height={350}
        visible={loginModal}
        closeHandler={() => {
          setId('');
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
                  borderColor: id.length === 0 ? '#dbdbdb' : '#53A6EC',
                  borderRadius: widthPercentageToDP(15),
                  paddingLeft: widthPercentageToDP(20),
                }}
                placeholder={'아이디'}
                value={id}
                onChangeText={text => setId(text)}
                onSubmitEditing={() => {
                  passRef.current.focus();
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
                  setId('');
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
                    id.length === 0 || pass.length === 0
                      ? colors.notFocus
                      : colors.active,
                  margin: 0,
                  borderBottomRightRadius: widthPercentageToDP(14),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                disabled={id.length === 0 || pass.length === 0 ? true : false}
                onPress={async () => {
                  await SigninActions.signIn(id, pass);

                  await setLoginModal(false);
                  await setId('');
                  await setPass('');

                  const user_id = await getData('user_id');
                  user_id === null
                    ? showMessage('잘못된 아이디 또는 비밀번호입니다.')
                    : null;
                }}>
                <NBGBText fontSize={15} color={'white'}>
                  로그인
                </NBGBText>
              </BTN>
            </StandardView>
          );
        }}
      />
      <TopView title="마이 페이지" />
      {/* 예약, 리뷰, 즐겨찾기(찜?) 등 앞으로 해야할 기능들 - 로그인 필요로 인하여 먼저 임시 구현 */}
      {props.user === null ? (
        <BTN
          onPress={() => {
            setLoginModal(true);
          }}
          style={{
            width: widthPercentageToDP(200),
            marginLeft: widthPercentageToDP(30),
            padding: widthPercentageToDP(10),
            borderWidth: widthPercentageToDP(1),
            borderColor: '#dbdbdb',
            borderRadius: widthPercentageToDP(15),
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: widthPercentageToDP(30),
          }}>
          <NBGBText>로그인 및 회원가입</NBGBText>
        </BTN>
      ) : (
        <StandardView>
          <NBGBText
            style={{
              marginLeft: widthPercentageToDP(30),
              padding: widthPercentageToDP(10),

              marginVertical: widthPercentageToDP(30),
            }}>
            {props.user !== null ? props.user.userId : ''}님 안녕하세요~
          </NBGBText>
          <BTN
            onPress={async () => {
              await removeData('token');
              await removeData('user_id');

              // await setUserData(null);
              await SigninActions.handleLoginData(null);
            }}
            style={{
              width: widthPercentageToDP(200),
              marginLeft: widthPercentageToDP(30),
              padding: widthPercentageToDP(10),
              borderWidth: widthPercentageToDP(1),
              borderColor: '#dbdbdb',
              borderRadius: widthPercentageToDP(15),
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: widthPercentageToDP(30),
            }}>
            <NBGBText>로그아웃</NBGBText>
          </BTN>
        </StandardView>
      )}
    </TopContainerView>
  );
};

export default connect(state => ({
  user: state.signin.user,
}))(MyPage);
