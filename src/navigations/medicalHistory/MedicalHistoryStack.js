import {createStackNavigator} from 'react-navigation-stack';
import MedicalHistoryTab from './MedicalHistoryTab';

const MedicalHistoryStack = createStackNavigator(
  {
    Medicals: {screen: MedicalHistoryTab},
  },
  {
    initialRouteName: 'Medicals',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

export default MedicalHistoryStack;
