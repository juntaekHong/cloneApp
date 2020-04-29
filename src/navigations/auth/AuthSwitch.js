import {createSwitchNavigator} from 'react-navigation';
import UpdateCheck from '../../containers/update/UpdateCheck';
import RootStack from '../root/root';

const AuthSwitch = createSwitchNavigator(
  {
    root: RootStack,
    update: {screen: UpdateCheck},
  },
  {
    initialRouteName: 'update',
  },
);

export default AuthSwitch;
