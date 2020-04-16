import React, {useCallback} from 'react';
import styled from 'styled-components';
import {widthPercentageToDP} from '../../utils/util';
import {NBGText, NBGBText} from '../common/Text';
import colors from '../../configs/colors';
import navigators from '../../utils/navigators';
import {Platform} from 'react-native';

const shadow = {
  ...Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    android: {
      elevation: 5,
    },
  }),
};
const TabBarButton = styled.TouchableOpacity`
  width: ${widthPercentageToDP(75)}
  height: ${widthPercentageToDP(49)}
  justify-content: center
  align-items: center
`;
const TabBarIcon = styled.Image`
  height: ${widthPercentageToDP(28)}
  width: ${widthPercentageToDP(28)}
  align-items: center
  justify-content: center
`;

const TabBarView = styled.View`
  flex-direction: row
  width: 100%
  height: ${widthPercentageToDP(75)}
  align-items: center
  justify-content: center
  background-color: white
`;

const TabBar = ({active, onPress, source, label = '', style}) => (
  <TabBarButton onPress={onPress} style={style}>
    <TabBarIcon source={source} style={{marginBottom: 0.2}} />
    {active ? (
      <NBGBText color={colors.active} marginTop={10} fontSize={10}>
        {label}
      </NBGBText>
    ) : (
      <NBGText color={'#9e9e9e'} marginTop={10} fontSize={10}>
        {label}
      </NBGText>
    )}
  </TabBarButton>
);
export const TabView = ({navigationState}) => {
  const Medicals = useCallback(() => {
    navigators.navigate('MedicalHistoryStack');
  }, []);
  const navigateSearch = useCallback(() => {
    navigators.navigate('SearchStack');
  }, []);
  const navigateHome = useCallback(() => {
    navigators.navigate('HomeStack');
  }, []);
  const navigateCommunity = useCallback(() => {
    navigators.navigate('CommunityStack');
  }, []);
  const navigateMyPage = useCallback(() => {
    navigators.navigate('MyPageStack');
  }, []);
  return (
    <TabBarView style={shadow}>
      <TabBar
        onPress={Medicals}
        source={
          navigationState.index === 0
            ? require('cloneApp/assets/image/navigation/report.png')
            : require('cloneApp/assets/image/navigation/report.png')
        }
        label={'진료내역'}
        active={navigationState.index === 0}
      />
      <TabBar
        onPress={navigateSearch}
        source={
          navigationState.index === 1
            ? require('cloneApp/assets/image/navigation/question.png')
            : require('cloneApp/assets/image/navigation/question.png')
        }
        label={'검색'}
        active={navigationState.index === 1}
      />
      <TabBar
        onPress={navigateHome}
        source={
          navigationState.index === 2
            ? require('cloneApp/assets/image/navigation/real-estate.png')
            : require('cloneApp/assets/image/navigation/real-estate.png')
        }
        label={'홈'}
        active={navigationState.index === 2}
      />
      <TabBar
        onPress={navigateCommunity}
        source={
          navigationState.index === 3
            ? require('cloneApp/assets/image/navigation/notepad.png')
            : require('cloneApp/assets/image/navigation/notepad.png')
        }
        label={'게시판'}
        active={navigationState.index === 3}
      />
      <TabBar
        onPress={navigateMyPage}
        source={
          navigationState.index === 4
            ? require('cloneApp/assets/image/navigation/worker.png')
            : require('cloneApp/assets/image/navigation/worker.png')
        }
        label={'마이페이지'}
        active={navigationState.index === 4}
      />
    </TabBarView>
  );
};
