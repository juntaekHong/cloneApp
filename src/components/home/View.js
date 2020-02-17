/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import styled from 'styled-components/native';
import {StandardView} from '../common/View';
import {widthPercentageToDP} from '../../utils/util';

const LocationView = styled(StandardView)`
  width: 100%;
  height: ${props =>
    props.height ? widthPercentageToDP(props.height) : widthPercentageToDP(60)};
`;

// export const TopView = ({settingLocation}) => {

//   return(
//       <LocationView location={settingLocation}
//   );
// }
