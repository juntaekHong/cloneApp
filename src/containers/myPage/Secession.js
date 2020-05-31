/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  TopContainerView,
  TopView,
  StandardView,
  BTN,
} from '../../components/common/View';
import {
  widthPercentageToDP,
  showMessage,
  removeAllData,
} from '../../utils/util';
import {TextInput} from 'react-native';
import {NBGBText} from '../../components/common/Text';
import {
  SignupActions,
  SigninActions,
  ReservationActions,
  HospitalActions,
  ReviewActions,
} from '../../store/actionCreator';
import Toast from 'react-native-root-toast';

const Secession = props => {
  const [pass, setPass] = useState('');

  return (
    <TopContainerView>
      <TopView
        marginBottom={5}
        title={'회원탈퇴 페이지'}
        backBtn={true}
        backHandler={() => {
          props.navigation.goBack(null);
        }}
        closeBtn={false}
        searchBtn={false}
      />
      <StandardView
        style={{
          flex: 1,
          height: '100%',
          justificontent: 'center',
          alignItems: 'center',
        }}>
        <TextInput
          style={{
            width: widthPercentageToDP(300),
            marginTop: widthPercentageToDP(70),
            height: widthPercentageToDP(50),
            borderWidth: widthPercentageToDP(1),
            borderColor: '#53A6EC',
            borderRadius: widthPercentageToDP(15),
            paddingLeft: widthPercentageToDP(20),
            paddingRight: widthPercentageToDP(5),
          }}
          placeholder={'비밀번호'}
          secureTextEntry={true}
          value={pass}
          onChangeText={async text => {
            await setPass(text);
          }}
          onSubmitEditing={() => {}}
          returnKeyType={'done'}
        />
        <BTN
          style={{
            width: '80%',
            position: 'absolute',
            bottom: widthPercentageToDP(50),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: widthPercentageToDP(15),
            backgroundColor: '#53A6EC',
          }}
          onPress={async () => {
            const passData = {userInputPw: pass};

            const success = await SignupActions.closeAccount(passData);

            if (success) {
              await ReservationActions.handleReservationListInit();
              await HospitalActions.handlerSubscriberListInit();
              await ReviewActions.handleReviewListInit();
              await SigninActions.handleLoginData(null);
              await removeAllData();
              await SigninActions.handleLoginData(null);
              await showMessage('회원탈퇴가 완료되었습니다!', {
                position: Toast.positions.CENTER,
              });
              await props.navigation.goBack(null);
            } else {
              await showMessage(
                '비밀번호가 일치하지 않습니다.\n비밀번호를 잊어버린 경우, 문의해주시기 바랍니다.',
                {
                  position: Toast.positions.CENTER,
                },
              );
            }
          }}>
          <NBGBText
            style={{
              height: widthPercentageToDP(50),
              paddingVertical: widthPercentageToDP(15),
            }}
            color={'white'}
            fontSize={17}
            align={'center'}>
            회원탈퇴
          </NBGBText>
        </BTN>
      </StandardView>
    </TopContainerView>
  );
};

export default Secession;
