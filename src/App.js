/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Platform,
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
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

    this.state = {
      firstScreen: true,
    };
  }

  async componentDidMount() {
    let timeout = setInterval(() => {
      this.setState({firstScreen: false});
      clearInterval(timeout);
    }, 2000);
  }

  render() {
    const {loading} = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <Modal
          isVisible={this.state.firstScreen}
          style={{
            margin: 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <View backgroundColor={'white'}>
            <Image
              style={{
                width: widthPercentageToDP(100),
                height: widthPercentageToDP(100),
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default connect(({common}) => ({
  loading: common.loading,
}))(App);
