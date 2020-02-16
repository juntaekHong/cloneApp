import {createStackNavigator} from 'react-navigation-stack';
import MedicalHistory from '../../containers/medicalHistory/MedicalHistory';

const MedicalHistoryStack = createStackNavigator(
  {
    MedicalHistory: {screen: MedicalHistory},
  },
  {
    initialRouteName: 'MedicalHistory',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

export default MedicalHistoryStack;
