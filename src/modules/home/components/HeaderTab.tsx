import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';

import icon_daily from '../../../assets/icon_daily.png';
import icon_search from '../../../assets/icon_search.png';

type props = {
  tab: number;
  onChange?: (tab: number) => void;
};
const HeaderTab = (props: props) => {
  const {tab, onChange} = props;
  const [barList] = useState(['关注', '发现', '北京']);
  const [tabState, setTabState] = useState<number>(1);

  useEffect(() => {
    setTabState(tab);
  }, [tab]);
  return (
    <View style={styles.headC}>
      <TouchableOpacity style={styles.dailyBtn}>
        <Image style={styles.dailyImg} source={icon_daily}></Image>
      </TouchableOpacity>
      <View style={styles.txtBtns}>
        {barList.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.txtBtn}
              onPress={() => {
                onChange?.(index);
                setTabState(index);
              }}>
              <Text
                style={tabState === index ? styles.selTxt : styles.noSelTxt}>
                {item}
              </Text>
              {tabState === index && <View style={styles.btnLine}></View>}
            </TouchableOpacity>
          );
        })}
      </View>
      <TouchableOpacity style={styles.searchBtn}>
        <Image style={styles.dailyImg} source={icon_search}></Image>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headC: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  dailyBtn: {
    paddingRight: 12,
    marginRight: 45,
  },
  searchBtn: {
    paddingLeft: 12,
    marginLeft: 45,
  },
  dailyImg: {
    width: 25,
    height: 25,
  },
  txtBtns: {
    height: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  txtBtn: {
    flex: 1,
    width: 28,
  },
  btnLine: {
    backgroundColor: 'red',
    height: 2,
    borderRadius: 1,
    width: 28,
    position: 'absolute',
    bottom: -6,
  },
  selTxt: {
    color: '#333',
    fontSize: 16,
  },
  noSelTxt: {
    fontSize: 16,
  },
});
export default HeaderTab;
