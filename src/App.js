/* eslint-disable react-native/no-inline-styles */
import React, {Fragment, Component} from 'react';
import {
  Platform,
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
} from 'react-native';
import AppNavigation from './navigations';
import SplashScreen from 'react-native-splash-screen';
import {useScreens} from 'react-native-screens';
import NavigatorService from './utils/navigators';
// import config from './configs/config';
import OneSignal from 'react-native-onesignal';
import {connect} from 'react-redux';
// import {CenterView} from './components/common/View';
import {UIActivityIndicator} from 'react-native-indicators';
import Modal from 'react-native-modal';
import {widthPercentageToDP} from './utils/util';
//붙여넣기 기능 쓰려면 이 놈 주석처리
// useScreens();

class App extends Component {
  constructor(props) {
    super(props);
    // SplashScreen.hide();
  }

  render() {
    const {firstScreenLoading, loading} = this.props;
    return (
      <Fragment>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        <SafeAreaView style={styles.container}>
          <Modal
            isVisible={firstScreenLoading}
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
            style={{
              margin: 0,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
            }}>
            <View backgroundColor={'white'}>
              <Image
                style={{
                  width: widthPercentageToDP(200),
                  height: widthPercentageToDP(200),
                }}
                source={require('../assets/image/hospital.png')}
              />
            </View>
          </Modal>
          <Modal isVisible={loading}>
            <View backgroundColor={'transparent'}>
              <UIActivityIndicator color={'gray'} />
            </View>
          </Modal>
          <AppNavigation
            ref={navigatorRef => {
              NavigatorService.setContainer(navigatorRef);
            }}
          />
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default connect(({common}) => ({
  firstScreenLoading: common.firstScreenLoading,
  loading: common.loading,
}))(App);
