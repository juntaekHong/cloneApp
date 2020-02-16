import React, {Component} from 'react';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';

import MedicalHistoryStack from '../medicalHistory/MedicalHistoryStack';
import SearchStack from '../search/SearchStack';
import HomeStack from '../home/HomeStack';
import CommunityStack from '../community/CommunityStack';
import MyPageStack from '../myPage/MyPageStack';

import {TabView} from '../../components/navigation/TabView';

const MainTab = createMaterialTopTabNavigator(
  {
    MedicalHistoryStack: {
      screen: MedicalHistoryStack,
    },
    SearchStack: {
      screen: SearchStack,
    },
    HomeStack: {
      screen: HomeStack,
    },
    CommunityStack: {
      screen: CommunityStack,
    },
    MyPageStack: {
      screen: MyPageStack,
    },
  },
  {
    initialRouteName: 'HomeStack',
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    tabBarComponent: TabView,
  },
);

export default MainTab;
