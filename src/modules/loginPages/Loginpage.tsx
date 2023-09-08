import React, {FC, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  LayoutAnimation,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import icon_unselected from '../../assets/icon_unselected.png';
import icon_selected from '../../assets/icon_selected.png';
import icon_arrow from '../../assets/icon_arrow.png';
import icon_wx from '../../assets/icon_wx.png';
import icon_main_logo from '../../assets/icon_main_logo.png';
import icon_triangle from '../../assets/icon_triangle.png';
import icon_eye_open from '../../assets/icon_eye_open.png';
import icon_eye_close from '../../assets/icon_eye_close.png';
import icon_exchange from '../../assets/icon_exchange.png';
import icon_wx1 from '../../assets/icon_wx.png';
import icon_qq from '../../assets/icon_qq.webp';

import {formatPhone, replacePhone} from '../../untils/formatPhone';
import loginStore from '.././../stores/useStore';

export const Login: FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [state, setState] = useState<boolean>(false);
  const [loginType, setLoginType] = useState<string>('normal');
  const [eyeState, setEyeState] = useState<boolean>(true);
  const [phone, setPhone] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');

  const loginPress = () => {
    if (!canLogin || !state) {
      // 手机号和密码不符合 || 没有勾选协议
      return;
    }
    const rPhone = replacePhone(phone);
    LayoutAnimation.easeInEaseOut();
    console.log(rPhone);
    const res = loginStore.loginRequest(replacePhone(phone), pwd, res => {
      if (res) {
        navigation.replace('MainTab');
      } else {
        // Toast.show('登陆失败，请检查用户名和密码');
        console.log('登陆失败，请检查用户名和密码');
      }
    });
    console.log('res:', res);
  };

  const login = () => {
    return (
      <View style={styles.contanir}>
        <View style={styles.content}>
          <Image style={styles.welImg} source={icon_main_logo}></Image>
        </View>
        <View style={styles.contentLogBtn}>
          <TouchableOpacity style={styles.oneBtn} activeOpacity={0.7}>
            <Text style={styles.oneLogin}>一键登录</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.wxBtn} activeOpacity={0.7}>
            <Image style={styles.wxLoginImg} source={icon_wx}></Image>
            <Text style={styles.wxLoginTxt}>微信登录</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.loginC}
          onPress={() => {
            setLoginType('otherLogin');
          }}>
          <Text style={styles.loginMet}>其他登录方式</Text>
          <Image style={styles.arrow} source={icon_arrow}></Image>
        </TouchableOpacity>
        <View style={styles.argee}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setState(!state);
            }}>
            <Image
              style={styles.selImg}
              source={state ? icon_selected : icon_unselected}></Image>
          </TouchableOpacity>
          <Text style={styles.argeeTxt}>我已阅读并知晓</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.protocolTxt}>《用户协议》和《隐私政策》</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const otherStyles = StyleSheet.create({
    otherContent: {
      paddingHorizontal: 26,
      width: '100%',
    },
    pwdC: {
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 40,
    },
    pwdTxt: {
      fontSize: 26,
      fontWeight: 'bold',
      color: '#333',
    },
    pwdTip: {
      fontSize: 14,
      color: '#ccc',
      marginTop: 5,
    },
    phone: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 25,
      height: 46,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    phoneNum: {
      fontSize: 22,
      color: '#ccc',
    },
    phoneImg: {
      width: 10,
      height: 5,
      marginLeft: 8,
    },
    phoneInput: {
      flex: 1,
      height: 46,
      marginLeft: 10,
      fontSize: 18,
    },
    pwd: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
      height: 46,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    pwdInput: {
      marginRight: 10,
    },
    pwdImg: {
      width: 25,
      height: 25,
    },
    loginTypes: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    c: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    loginTypesImg: {
      width: 15,
      height: 15,
      marginRight: 5,
    },
    loginTypeTxt: {
      fontSize: 12,
      color: '#303080',
    },
    loginBtn: {
      width: '100%',
      height: 46,
      backgroundColor: '#ff2442',
      borderRadius: 24,
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    loginBtnDis: {
      width: '100%',
      height: 46,
      backgroundColor: '#ccc',
      borderRadius: 24,
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    loginBtnTxt: {
      fontSize: 16,
      color: 'white',
    },
    txtC: {
      justifyContent: 'flex-start',
    },
    qqwxC: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 70,
    },
    wxImg: {
      width: 45,
      height: 45,
    },
    qqImg: {
      width: 45,
      height: 45,
    },
  });
  const canLogin = phone.length == 13 && pwd.length == 6;
  const otherLogin = () => {
    return (
      <View style={otherStyles.otherContent}>
        <View style={otherStyles.pwdC}>
          <Text style={otherStyles.pwdTxt}>密码登录</Text>
          <Text style={otherStyles.pwdTip}>
            未注册的手机号登录成功后将自动注册
          </Text>
        </View>
        <View style={otherStyles.phone}>
          <Text style={otherStyles.phoneNum}>+86</Text>
          <Image style={otherStyles.phoneImg} source={icon_triangle}></Image>
          <TextInput
            style={otherStyles.phoneInput}
            placeholderTextColor="#ccc"
            placeholder="输入手机号"
            keyboardType="number-pad"
            maxLength={13}
            value={phone}
            onChangeText={(text: string) => {
              setPhone(formatPhone(text));
            }}></TextInput>
        </View>
        <View style={otherStyles.pwd}>
          <TextInput
            style={[otherStyles.phoneInput, otherStyles.pwdInput]}
            placeholderTextColor="#ccc"
            placeholder="输入密码"
            keyboardType="number-pad"
            value={pwd}
            secureTextEntry={!eyeState}
            onChangeText={(text: string) => {
              setPwd(text);
            }}
            maxLength={6}></TextInput>
          <TouchableOpacity
            onPress={() => {
              setEyeState(!eyeState);
            }}
            activeOpacity={0.7}>
            <Image
              style={otherStyles.pwdImg}
              source={eyeState ? icon_eye_open : icon_eye_close}></Image>
          </TouchableOpacity>
        </View>
        <View style={otherStyles.loginTypes}>
          <View style={otherStyles.c}>
            <Image
              style={otherStyles.loginTypesImg}
              source={icon_exchange}></Image>
            <TouchableOpacity>
              <Text style={otherStyles.loginTypeTxt}>验证码登录</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Text style={otherStyles.loginTypeTxt}>忘记密码?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={
            canLogin && state ? otherStyles.loginBtn : otherStyles.loginBtnDis
          }
          onPress={loginPress}>
          <Text style={otherStyles.loginBtnTxt}>登录</Text>
        </TouchableOpacity>
        <View style={[styles.argee, otherStyles.txtC]}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setState(!state);
            }}>
            <Image
              style={styles.selImg}
              source={state ? icon_selected : icon_unselected}></Image>
          </TouchableOpacity>
          <Text style={styles.argeeTxt}>我已阅读并知晓</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.protocolTxt}>《用户协议》和《隐私政策》</Text>
          </TouchableOpacity>
        </View>
        <View style={otherStyles.qqwxC}>
          <TouchableOpacity>
            <Image style={otherStyles.wxImg} source={icon_wx1}></Image>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={otherStyles.qqImg} source={icon_qq}></Image>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.root}>
      {loginType === 'normal' ? login() : otherLogin()}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  contanir: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingHorizontal: 60,
  },
  argee: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
    marginTop: 12,
  },
  selImg: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    paddingHorizontal: 16,
  },
  argeeTxt: {
    color: '#999',
    fontSize: 12,
  },
  protocolTxt: {
    fontSize: 12,
    color: '#1020ff',
  },
  loginC: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 220,
  },
  loginMet: {fontSize: 13, color: '#303080'},
  arrow: {
    width: 15,
    height: 15,
    marginLeft: 6,
    marginTop: 4,
    resizeMode: 'contain',
    transform: [{rotate: '180deg'}],
  },
  contentLogBtn: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  oneBtn: {
    width: 260,
    height: 40,
    borderRadius: 23,
    backgroundColor: '#ff2442',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  wxBtn: {
    width: 260,
    height: 40,
    borderRadius: 23,
    backgroundColor: '#05c160',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  wxTxt: {
    fontSize: 14,
    color: 'white',
  },
  oneLogin: {
    fontSize: 14,
    color: 'white',
  },
  wxLoginTxt: {
    fontSize: 14,
    color: 'white',
  },
  wxLoginImg: {
    width: 35,
    height: 35,
    marginRight: 5,
    resizeMode: 'contain',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 80,
  },
  welImg: {
    width: 220,
    height: 110,
    resizeMode: 'contain',
    marginTop: 210,
  },
});
