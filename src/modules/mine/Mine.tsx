import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import icon_bg from '../../assets/icon_bg.png';
import icon_menu from '../../assets/icon_menu.png';
import icon_share from '../../assets/icon_share.png';
import default_avatar from '../../assets/default_avatar.png';
import icon_code from '../../assets/icon_code.png';
import icon_add from '../../assets/icon_add.png';
import icon_setting from '../../assets/icon_setting.png';
import icon_1 from '../../assets/icon_1.png';
import icon_2 from '../../assets/icon_2.png';
import icon_3 from '../../assets/icon_3.png';

const tabList = [
  {
    name: '笔记',
  },
  {
    name: '收藏',
  },
  {
    name: '赞过',
  },
];
const TabComponent = () => {
  const [selTab, setSelTab] = useState(0);
  const onTabPress = (index: number) => {
    setSelTab(index);
  };
  return (
    <View style={{width: '100%', height: '100%'}}>
      <View style={styles3.tanHead}>
        {tabList.map((item, index) => {
          return (
            <View key={index}>
              <TouchableOpacity
                onPress={() => {
                  onTabPress(index);
                }}
                style={styles3.tabBtn}>
                <Text
                  style={[
                    styles3.tabText,
                    selTab === index ? styles3.tabSel : '',
                  ]}
                  key={index}>
                  {item.name}
                </Text>
                {selTab == index ? (
                  <View style={styles3.tabSelText}></View>
                ) : (
                  ''
                )}
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
      <View
        style={{
          width: '100%',
          display: 'flex',
          backgroundColor: '#fff',
          height: '100%',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: 50,
        }}>
        <Image
          source={selTab == 0 ? icon_1 : selTab == 1 ? icon_2 : icon_3}
          style={{width: 80, height: 80}}></Image>
        <View>
          {selTab == 0 ? (
            <View>
              <Text style={contentStyles.desc}>
                用一句话，分享今天的快乐吧～
              </Text>
              <Text style={contentStyles.button}>去分享</Text>
            </View>
          ) : selTab == 1 ? (
            <View>
              <Text style={contentStyles.desc}>
                用一句话，分享今天的快乐吧～
              </Text>
              <Text style={contentStyles.button}>去分享</Text>
            </View>
          ) : (
            <View>
              <Text style={contentStyles.desc}>
                用一句话，分享今天的快乐吧～
              </Text>
              <Text style={contentStyles.button}>去分享</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export const Mine = () => {
  return (
    <View style={styles.root}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"></StatusBar>
      <ImageBackground source={icon_bg} style={styles.image}>
        {/* 菜单和分享 */}
        <View style={styles.imageContent}>
          <Image source={icon_menu} style={styles.minImage}></Image>
          <Image source={icon_share} style={styles.minImage}></Image>
        </View>
        {/* 头像部分 */}
        <View style={styles.avatarView}>
          <Image source={default_avatar} style={styles.avatar}></Image>
          <Image
            source={icon_add}
            style={{
              width: 20,
              height: 20,
              marginTop: 30,
              marginLeft: -12,
            }}></Image>
          <View style={styles.aText}>
            <Text style={styles.nickName}>打工人</Text>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text style={styles.number}>小红书号: 111000000</Text>
              <Image source={icon_code} style={styles.ewm}></Image>
            </View>
          </View>
        </View>
        <Text
          style={{marginLeft: 15, fontSize: 13, color: 'white', marginTop: 14}}>
          点击关注，填写简介
        </Text>
        <View style={styles.sex}>
          {/* <Image style={{width: 10, height: 5, resizeMode: 'cover'}} source={icon_female}></Image> */}
        </View>

        {/* 关注 收藏 */}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginLeft: 15,
              marginTop: 10,
            }}>
            <View style={styles2.block}>
              <Text style={styles2.number}>123</Text>
              <Text style={styles2.bText}>关注</Text>
            </View>
            <View style={styles2.block}>
              <Text style={styles2.number}>123</Text>
              <Text style={styles2.bText}>粉丝</Text>
            </View>
            <View style={styles2.block}>
              <Text style={styles2.number}>123</Text>
              <Text style={styles2.bText}>获赞与收藏</Text>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: 30,
              marginRight: 15,
            }}>
            <View
              style={{
                width: 80,
                height: 25,
                borderWidth: 1,
                borderColor: 'white',
                marginRight: 10,
                borderRadius: 15,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', fontSize: 12}}>编辑资料</Text>
            </View>
            <View
              style={{
                width: 40,
                height: 25,
                borderWidth: 1,
                borderColor: 'white',
                borderRadius: 15,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={icon_setting}
                style={{
                  width: 18,
                  height: 18,
                  tintColor: 'white',
                  resizeMode: 'cover',
                }}></Image>
            </View>
          </View>
        </View>
        <View>{TabComponent()}</View>
        {/* {tabContent()} */}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  image: {
    flex: 1,
    height: 300,
  },
  imageContent: {
    display: 'flex',
    marginTop: 35,
    marginLeft: 15,
    marginRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  minImage: {
    width: 25,
    height: 25,
  },
  avatarView: {
    marginLeft: 15,
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
  },
  aText: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 20,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  nickName: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 8,
  },
  number: {
    fontSize: 14,
    color: '#f0f0f0',
    paddingRight: 10,
  },
  ewm: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
  sex: {
    width: 35,
    height: 20,
    backgroundColor: '#efefef',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 15,
  },
});
const styles2 = StyleSheet.create({
  block: {
    marginRight: 15,
    marginTop: 15,
  },
  number: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 3,
  },
  bText: {
    color: '#ffffffc0',
    fontSize: 12,
  },
});
const styles3 = StyleSheet.create({
  tanHead: {
    width: '100%',
    height: 40,
    backgroundColor: '#fff',
    borderBottomColor: '#E0E0E0',
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBtn: {
    height: '100%',
    width: 64,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    color: '#000',
  },
  tabSel: {
    fontWeight: 'bold',
  },
  tabSelText: {
    width: 28,
    height: 2,
    backgroundColor: '#f05856',
    marginTop: 5,
  },
});
const contentStyles = StyleSheet.create({
  icon: {
    width: 96,
    height: 96,
    resizeMode: 'contain',
  },
  desc: {
    fontSize: 16,
    marginTop: 16,
  },
  button: {
    width: 76,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#C0C0C0',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 12,
    marginLeft: 70,
    color: '#333333',
  },
});
export default Mine;
