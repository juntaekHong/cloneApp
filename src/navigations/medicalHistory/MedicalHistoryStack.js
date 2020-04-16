import {createStackNavigator} from 'react-navigation-stack';
import MedicalHistoryTab from './MedicalHistoryTab';

const MedicalHistoryStack = createStackNavigator(
  {
    Medicals: {screen: MedicalHistoryTab},
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
);

export default MedicalHistoryStack;
