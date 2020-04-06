/* eslint-disable no-fallthrough */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import styled from 'styled-components/native';
import {widthPercentageToDP} from '../../utils/util';

// 텍스트인풋(텍스트필드)
const SignUp = styled.TextInput`
  margin-top: ${({marginTop}) =>
    marginTop ? widthPercentageToDP(marginTop) : widthPercentageToDP(10)};
  margin-bottom: ${({marginBottom}) =>
    marginBottom ? widthPercentageToDP(marginBottom) : widthPercentageToDP(0)};
  height: ${widthPercentageToDP(40)};
  border-width: ${widthPercentageToDP(1)};
  border-color: ${({inputValue, inputValueValid}) =>
    inputValue.length === 0
      ? '#dbdbdb'
      : inputValueValid.length === 0
      ? '#53A6EC'
      : '#FF0000'};
  border-radius: ${widthPercentageToDP(15)};
  padding-left: ${widthPercentageToDP(20)};
`;

export const SignUpTI = ({
  width,
  marginTop,
  marginBottom,
  inputValue,
  inputValueValid,
  placeholder,
  onChangeText,
  onSubmitEditing,
  keyboardType,
  returnKeyType,
  secureTextEntry,
}) => {
  return (
    <SignUp
      style={width !== undefined ? {width: widthPercentageToDP(70)} : null}
      marginTop={marginTop}
      marginBottom={marginBottom}
      inputValue={inputValue}
      inputValueValid={inputValueValid}
      placeholder={placeholder}
      value={inputValue}
      onChangeText={text => {
        onChangeText(text);
      }}
      onSubmitEditing={() => {
        // passRef.current.focus();
        onSubmitEditing();
      }}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry === undefined ? false : true}
      returnKeyType={returnKeyType}
    />
  );
};
