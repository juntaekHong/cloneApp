/* eslint-disable prettier/prettier */
/* eslint-disable no-fallthrough */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import styled from 'styled-components/native';
import {widthPercentageToDP} from '../../utils/util';
import {NBGBText, NBGLText} from '../common/Text';
import {TextInput} from 'react-native';

// 원장님께 하고 싶은 말 텍스트인풋
const Comment = styled(TextInput)`
  height: ${widthPercentageToDP(40)};
  border-width: ${widthPercentageToDP(1)};
  border-radius: ${widthPercentageToDP(15)};
  border-color: #dbdbdb;
  padding-left: ${widthPercentageToDP(20)};
  padding-right: ${widthPercentageToDP(20)};
  margin-bottom: ${({marginBottom}) =>
    marginBottom ? widthPercentageToDP(marginBottom) : 0};
`;

export const CommentTI = ({marginBottom, placeholder, onChangeText, value}) => {
  return (
    <Comment
      marginBottom={marginBottom}
      placeholder={placeholder}
      onChangeText={(text) => {
        onChangeText(text);
      }}
      value={value}
      returnKeyType={'done'}
    />
  );
};
