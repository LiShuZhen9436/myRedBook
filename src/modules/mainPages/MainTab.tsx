import React from 'react';

import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const BottomTab = createBottomTabNavigator();

import Home from '../home/Home';
import Shop from '../shop/Shop';
import Message from '../message/Message';
import Mine from '../mine/Mine';

import {
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';

import icon_tab_publish from '../../assets/icon_tab_publish.png';

export const MainTab = () => {
  const onPublish = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
        includeBase64: true,
      },
      (res: ImagePickerResponse) => {
        const {assets} = res;
        if (!assets?.length) {
          console.log('选择图片失败');
          return;
        }
        const {uri, width, height, fileName, fileSize, type} = assets[0];
        console.log(`uri=${uri}, width=${width}, height=${height}`);
        console.log(`fileName=${fileName}, fileSize=${fileSize}, type=${type}`);
      },
    );
  };
  // 自定义tabBar
  const CreaBottomBar = ({state, descriptors, navigation}: any) => {
    const {routes, index} = state;
    return (
      <View style={styles.tabContair}>
        {routes.map((route: any, i: number) => {
          const {options} = descriptors[route.key];
          const label = options.title;
          const isFocused = index === i;
          if (i == 2) {
            return (
              <TouchableOpacity
                key={label}
                style={styles.tabItem}
                onPress={onPublish}>
                <Image
                  style={styles.pubshImg}
                  source={icon_tab_publish}></Image>
              </TouchableOpacity>
            );
          }
          return (
            <TouchableOpacity
              key={label}
              style={styles.tabItem}
              onPress={() => {
                navigation.navigate(route.name);
              }}>
              <Text
                style={{
                  color: isFocused ? '#333' : '#999',
                  fontWeight: isFocused ? 'bold' : 'normal',
                  fontSize: isFocused ? 18 : 16,
                }}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  return (
    <View style={styles.tabContent}>
      <BottomTab.Navigator tabBar={props => <CreaBottomBar {...props} />}>
        <BottomTab.Screen
          name="Home"
          component={Home}
          options={{title: '首页', headerShown: false}}></BottomTab.Screen>
        <BottomTab.Screen
          name="Shop"
          component={Shop}
          options={{title: '购物', headerShown: false}}></BottomTab.Screen>
        <BottomTab.Screen
          name="Publish"
          component={Shop}
          options={{title: '发布', headerShown: false}}></BottomTab.Screen>
        <BottomTab.Screen
          name="Message"
          component={Message}
          options={{title: '消息', headerShown: false}}></BottomTab.Screen>
        <BottomTab.Screen
          name="Mine"
          component={Mine}
          options={{title: '我', headerShown: false}}></BottomTab.Screen>
      </BottomTab.Navigator>
    </View>
  );
};
const styles = StyleSheet.create({
  tabContent: {
    width: '100%',
    height: '100%',
  },
  tabContair: {
    flexDirection: 'row',
    height: 52,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  tabItem: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pubshImg: {
    width: 58,
    height: 42,
    resizeMode: 'contain',
  },
});
