import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Dimensions} from 'react-native';

type props = {
  uri: string;
};

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const SHOW_WIDTH = (SCREEN_WIDTH - 18) / 2;
const ResizeImage = (props: props) => {
  const {uri} = props;
  const [height, setHight] = useState<number>(200);
  useEffect(() => {
    Image.getSize(uri, (width: number, height: number) => {
      const h = (SHOW_WIDTH * height) / width;
      setHight(h);
    });
  }, [uri]);
  return (
    <Image
      source={{uri}}
      style={{
        width: SHOW_WIDTH,
        height: height,
        resizeMode: 'cover',
      }}></Image>
  );
};

export default ResizeImage;
