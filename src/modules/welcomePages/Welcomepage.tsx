import React, {FC, useEffect} from 'react';
import {View, Image, StyleSheet, LayoutAnimation} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {load} from '../../untils/Storage';

import icon_main_logo from '../../assets/icon_main_logo.png';

export const Welcome: FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  useEffect(() => {
    load('userInfo').then(userInfo => {
      LayoutAnimation.easeInEaseOut();
      setTimeout(() => {
        if (userInfo) {
          navigation.replace('MainTab');
        } else {
          navigation.replace('Login');
        }
      }, 2000);
    });
  }, []);
  return (
    <View style={styles.content}>
      <Image style={styles.welImg} source={icon_main_logo}></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  welImg: {
    width: 220,
    height: 110,
    resizeMode: 'contain',
    marginTop: 210,
  },
});
