import React from 'react';
import styled from 'styled-components/native';
import {BTN} from '../common/View';
import {NBGLText, NBGBText} from '../common/Text';
import {widthPercentageToDP} from '../../utils/util';
import {Img} from '../common/Image';

const Search = styled(BTN)`
  justify-content: center;
  align-items: center;
  width: ${widthPercentageToDP(40)};
  height: ${widthPercentageToDP(40)};
  border-width: ${widthPercentageToDP(1)};
  border-color: #dbdbdb;
  margin-left: ${({marginLeft}) =>
    marginLeft ? widthPercentageToDP(marginLeft) : 0};
`;

export const SearchBtn = ({marginLeft, onPress}) => {
  return (
    <Search marginLeft={marginLeft} onPress={() => onPress()}>
      <Img
        width={20}
        height={20}
        source={require('../../../assets/image/home/search.png')}
      />
    </Search>
  );
};

const AutoLocationSetting = styled(BTN)`
  justify-content: center;
  align-items: center;
  height: ${widthPercentageToDP(40)};
  margin-top: ${({marginTop}) =>
    marginTop ? widthPercentageToDP(marginTop) : 0};
  margin-right: ${widthPercentageToDP(17)};
  border-width: ${widthPercentageToDP(1)};
  border-color: #dbdbdb;
`;

export const AutoBtn = ({marginTop, title, onPress}) => {
  return (
    <AutoLocationSetting
      marginTop={marginTop}
      onPress={() => {
        onPress();
      }}>
      <NBGLText fontSize={12}>{title}</NBGLText>
    </AutoLocationSetting>
  );
};

// 하위 위치 설정 확인 페이지에서 위치 설정 완료 버튼
const LatSetting = styled(BTN)`
  width: ${widthPercentageToDP(335)};
  height: ${widthPercentageToDP(50)};
  align-items: center;
  justify-content: center;
  border-width: ${widthPercentageToDP(2)};
  border-radius: ${widthPercentageToDP(10)};
  border-color: #dbdbdb;
  background-color: white;
`;

export const LatSetBTN = ({title, onPress}) => {
  return (
    <LatSetting
      onPress={async () => {
        await onPress();
      }}>
      <NBGBText>{title}</NBGBText>
    </LatSetting>
  );
};
