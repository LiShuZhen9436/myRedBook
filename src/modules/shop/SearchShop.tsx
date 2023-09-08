import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  LayoutAnimation,
} from 'react-native';

import icon_search from '../../assets/icon_search.png';
import icon_arrow from '../../assets/icon_arrow.png';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export const SearchShop = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const inputRef = useRef<TextInput>(null);
  const [show, showState] = useState<boolean>(false);
  const onBackPress = () => {
    LayoutAnimation.easeInEaseOut();
    inputRef.current?.blur();
    showState(false);
    setTimeout(() => {
      navigation.pop();
    }, 300);
  };

  useEffect(() => {
    // 加个延时显示返回按钮
    setTimeout(() => {
      LayoutAnimation.easeInEaseOut();
      inputRef.current?.focus();
      showState(true);
    }, 300);
  }, []);
  const searchHead = () => {
    return (
      <View style={stylesSearch.search}>
        {show && (
          <TouchableOpacity style={stylesSearch.btn} onPress={onBackPress}>
            <Image style={stylesSearch.back} source={icon_arrow}></Image>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={stylesSearch.searchTxt}>
          <Image style={stylesSearch.searchImg} source={icon_search}></Image>
          <TextInput
            ref={inputRef}
            style={stylesSearch.searchInput}
            placeholder="输入搜索内容"
            placeholderTextColor="#ddd"></TextInput>
        </TouchableOpacity>
        <Text style={stylesSearch.searchFont}>搜索</Text>
      </View>
    );
  };

  return <>{searchHead()}</>;
};

const stylesSearch = StyleSheet.create({
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    // backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  searchTxt: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  searchImg: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginRight: 5,
  },
  searchIcon: {
    width: 25,
    height: 25,
    marginLeft: 8,
    tintColor: '#bbb',
  },
  searchFont: {
    fontSize: 14,
    color: '#333',
    paddingLeft: 10,
  },
  btn: {
    paddingRight: 8,
  },
  back: {
    width: 20,
    height: 20,
  },
  searchInput: {
    fontSize: 14,
    color: '#bbb',
    paddingVertical: 3,
    // paddingHorizontal: 3,
  },
});
