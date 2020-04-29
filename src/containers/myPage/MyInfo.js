/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {TopContainerView, TopView} from '../../components/common/View';
import {
  ConstMyInfoView,
  ModifyMyInfoView,
  DivisionView,
} from '../../components/myPage/View';
import {ScrollView, Keyboard} from 'react-native';
import {MyInfoMdal} from '../../components/myPage/Modal';
import {SigninActions} from '../../store/actionCreator';
import Toast from 'react-native-root-toast';
import {showMessage} from '../../utils/util';
import {
  checkPass,
  checkPhoneNumber,
  checkNickName,
  checkNickNameLength,
  checkPassCompare,
} from '../../utils/validation';

const MyInfo = props => {
  // 개인정보 변경 모달
  const [MyInfoModal, setMyInfoModal] = useState(false);
  // 모달 타이틀
  const [title, setTitle] = useState('');
  // 변경될 개인정보 칼럼명
  const [myInfoColumn, setMyInfoColumn] = useState('');
  // 개인 정보
  const [MyInfoData, setMyInfoData] = useState();
  // 비밀번호 변경일 경우
  const [changePass, setChangePass] = useState(false);
  // 비밀번호 변경 시, 재확인용 비밀번호 데이터
  const [passCheck, setPassCheck] = useState('');
  // 비밀번호 유효성 검사
  const [valid, setValid] = useState('');
  // 비밀번호 재확인 유효성
  const [valid2, setValid2] = useState('');

  useEffect(() => {
    let valid1;
    let valid2 = false;

    switch (true) {
      case myInfoColumn === 'userNickName':
        valid1 = checkNickNameLength(MyInfoData);
        valid2 = checkNickName(MyInfoData);

        MyInfoData.length !== 0 && !valid1
          ? setValid('* 2글자이상 17자미만으로 입력하세요.')
          : MyInfoData.length !== 0 && !valid2
          ? setValid('* 올바르지 않은 닉네임입니다.')
          : setValid('');
        break;

      case myInfoColumn === 'tel':
        valid1 = checkPhoneNumber(MyInfoData);

        MyInfoData.length !== 0 && !valid1
          ? setValid('* 유효하지 않은 전화번호입니다.')
          : setValid('');
        break;

      case myInfoColumn === 'userPw':
        valid1 = checkPass(MyInfoData);
        let valid3 = checkPassCompare(MyInfoData, passCheck);

        if (MyInfoData.length !== 0 && !valid1) {
          setValid('* 대소문자&숫자&특수문자를 포함 7자이상 입력해주세요.');
        } else {
          setValid('');
        }
        break;
    }
  }, [MyInfoData]);

  useEffect(() => {
    let valid3 = checkPassCompare(MyInfoData, passCheck);

    !valid3 ? setValid2('* 비밀번호가 일치하지 않습니다.') : setValid2('');
  }, [passCheck]);

  return (
    <TopContainerView>
      <MyInfoMdal
        width={300}
        height={300}
        visible={MyInfoModal}
        title={title}
        closeHandler={async () => {
          await setMyInfoModal(false);
          await setMyInfoColumn('');
          await setMyInfoData();

          await setValid('');

          if (changePass) {
            await setPassCheck('');
            await setValid2('');
            await setChangePass(false);
          }
        }}
        myInfoColumn={myInfoColumn}
        userData={MyInfoData}
        setUserData={setMyInfoData}
        changePass={changePass}
        passCheck={passCheck}
        setPassCheck={setPassCheck}
        valid={valid}
        valid2={valid2}
        changeHandler={async () => {
          await setMyInfoModal(false);

          const userData = {[myInfoColumn]: MyInfoData};

          if (
            changePass ||
            props.user[myInfoColumn] !== userData[myInfoColumn]
          ) {
            if (myInfoColumn === 'userPw' && MyInfoData !== passCheck) {
              showMessage('비밀번호가 일치하지 않습니다.', {
                position: Toast.positions.CENTER,
              });
            } else if (userData[myInfoColumn]) {
              if (valid.length === 0) {
                const result = await SigninActions.updateUserInfo(userData);

                await SigninActions.handleLoginData({
                  ...props.user,
                  [myInfoColumn]: MyInfoData,
                });

                showMessage(result, {
                  position: Toast.positions.CENTER,
                });
              } else {
                showMessage(
                  '유효하지 않은 값을 입력하여서 정보가 변경되지 않았습니다.',
                  {
                    position: Toast.positions.CENTER,
                  },
                );
              }
            } else {
              showMessage('개인정보를 입력하지 않았습니다.', {
                position: Toast.positions.CENTER,
              });
            }
          } else {
            showMessage('기존 정보와 일치하여 변경되지 않았습니다.', {
              position: Toast.positions.CENTER,
            });
          }

          if (changePass) {
            await setPassCheck('');
            await setChangePass(false);
            await setValid2('');
          }

          await setMyInfoColumn('');
          await setMyInfoData();
          await setValid('');
        }}
      />
      <TopView
        marginBottom={5}
        title={'개인정보 수정'}
        backBtn={true}
        backHandler={() => {
          props.navigation.goBack();
        }}
        closeBtn={false}
        searchBtn={false}
      />
      <ScrollView>
        <ConstMyInfoView
          paddingVertical={20}
          paddingLeft={20}
          borderWidth={1}
          title={'이름'}
          arrowImg={false}
          myInfoValue={props.user ? props.user.userName : ''}
        />
        <ConstMyInfoView
          paddingVertical={20}
          paddingLeft={20}
          borderWidth={1}
          title={'이메일'}
          arrowImg={false}
          myInfoValue={props.user ? props.user.email : ''}
        />
        <DivisionView borderWidth={3} borderColor={'#F6F7F9'} />
        <ModifyMyInfoView
          paddingVertical={20}
          paddingLeft={20}
          borderWidth={1}
          title={'닉네임'}
          arrowImg={true}
          myInfoValue={props.user ? props.user.userNickName : ''}
          myInfoHandler={async () => {
            await setTitle('닉네임 변경');
            await setMyInfoColumn('userNickName');
            await setMyInfoData(props.user.userNickName);
            await setMyInfoModal(true);
          }}
        />
        <ModifyMyInfoView
          paddingVertical={20}
          paddingLeft={20}
          borderWidth={1}
          title={'전화번호'}
          arrowImg={true}
          myInfoValue={props.user ? props.user.tel : ''}
          myInfoHandler={async () => {
            await setTitle('전화번호 변경');
            await setMyInfoColumn('tel');
            await setMyInfoData(props.user.tel);
            await setMyInfoModal(true);
          }}
        />
        <ModifyMyInfoView
          paddingVertical={20}
          paddingLeft={20}
          borderWidth={1}
          title={'비밀번호 변경'}
          arrowImg={true}
          myInfoHandler={async () => {
            await setTitle('비밀번호 변경');
            await setMyInfoColumn('userPw');
            await setChangePass(true);
            await setMyInfoModal(true);
          }}
        />
      </ScrollView>
    </TopContainerView>
  );
};

export default connect(state => ({
  user: state.signin.user,
}))(MyInfo);
