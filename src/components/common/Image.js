/* eslint-disable react/react-in-jsx-scope */
import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components/native';
import {widthPercentageToDP} from '../../utils/util';
import {StandardView} from './View';
import {UIActivityIndicator} from 'react-native-indicators';

export const Img = styled.Image`
  width: ${props =>
    props.width ? widthPercentageToDP(props.width) : widthPercentageToDP(30)};
  height: ${props =>
    props.height ? widthPercentageToDP(props.height) : widthPercentageToDP(30)};
  border-radius: ${props =>
    props.radius ? widthPercentageToDP(props.radius) : 0};
  background-color: ${props => (props.radius ? 'gray' : 'white')};
  margin-left: ${props =>
    props.marginLeft ? widthPercentageToDP(props.marginLeft) : 0};
  margin-right: ${props =>
    props.marginRight ? widthPercentageToDP(props.marginRight) : 0};
`;

export const BackImg = ({source, width, height}) => {
  return <Img source={source} width={width} height={height} />;
};

export const CloseImg = ({source, width, height}) => {
  return <Img source={source} width={width} height={height} />;
};

export const PhotoImg = ({item, source, width, height, radius}) => {
  const [imgLoad, setImgLoad] = useState(false);
  const [uiLoad, setUiLoad] = useState(false);

  return (
    <StandardView>
      {!imgLoad ? (
        <StandardView>
          <Img
            source={require('../../../assets/image/white.png')}
            width={width}
            height={height}
            onLoadEnd={() => {
              setImgLoad(source);
            }}
          />
          <UIActivityIndicator
            style={{
              position: 'absolute',
              left: widthPercentageToDP(30),
              top: widthPercentageToDP(30),
            }}
            size={widthPercentageToDP(20)}
            color={'gray'}
          />
        </StandardView>
      ) : (
        <StandardView>
          <Img
            style={{
              borderRadius: widthPercentageToDP(radius),
            }}
            source={imgLoad}
            width={width}
            height={height}
            onLoadStart={() => {
              setUiLoad(true);
            }}
            onLoadEnd={() => {
              setUiLoad(false);
            }}
          />
          {uiLoad ? (
            <UIActivityIndicator
              style={{
                position: 'absolute',
                left: widthPercentageToDP(30),
                top: widthPercentageToDP(30),
              }}
              size={widthPercentageToDP(20)}
              color={'gray'}
            />
          ) : null}
        </StandardView>
      )}
    </StandardView>
  );
};

export const StarImg = ({source, width, height}) => {
  return <Img source={source} width={width} height={height} />;
};

export const MapImg = ({source, width, height, borderRadius}) => {
  return (
    <Img source={source} width={width} height={height} radius={borderRadius} />
  );
};
