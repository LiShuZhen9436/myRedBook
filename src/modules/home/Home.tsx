import React, {useCallback, useEffect} from 'react';
import {observer} from 'mobx-react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useLocalStore} from 'mobx-react';
import homeStroe from './homeStroe';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import FlowList from '../../components/flowlist/FlowList';
import ResizeImage from '../../components/ResizeImage';
import {Heart} from '../../components/Hear';
import HeaderTab from './components/HeaderTab';
import HeaderMenus from './components/HeaderMenus';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
// 使用 mobx 要使用observer()包裹 否则第一次监听不到
const MainTab = observer(() => {
  const store = useLocalStore(() => new homeStroe());

  useEffect(() => {
    store.requestHomeList();
  }, []);

  // 上拉刷新
  const onRefresh = () => {
    store.setPage();
    store.requestHomeList();
  };
  // 触底加载
  const onEndReached = () => {
    store.requestHomeList();
    store.getCategoryList();
  };
  const navigation = useNavigation<StackNavigationProp<any>>();
  const onActiclePress = (item: ArticleSimple) => {
    console.log('222');
    navigation.push('ActicleDetail', {id: item.id});
  };
  const renderItem = ({item, index}: {item: ArticleSimple; index: number}) => {
    return (
      <TouchableOpacity
        style={styles.item}
        activeOpacity={0.7}
        onPress={() => {
          console.log('ppp');
          onActiclePress(item);
        }}>
        {/* <Image style={styles.image} source={{uri: item.image}}></Image> */}
        <ResizeImage uri={item.image} />
        <View style={styles.txtContent}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.botTitle}>
            <Image source={{uri: item.avatarUrl}} style={styles.avatar}></Image>
            <Text style={styles.avatTxt}>{item.userName}</Text>
            {/* <Image style={styles.avatar} source={icon_heart_empty}></Image> */}
            <Heart
              value={item.isFavorite}
              size={16}
              onValueChanged={value => {
                console.log(value);
              }}></Heart>
            <Text style={styles.countTxt}>{item.favoriteCount}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const Foot = () => {
    return <Text style={styles.footTxt}>没有更多数据了</Text>;
  };
  const categoryList = store.categoryList.filter(item => item.isAdd);
  return (
    <View style={styles.root}>
      <HeaderTab
        tab={0}
        onChange={(tab: number) => {
          console.log(tab);
        }}
      />
      <FlowList
        keyExtrator={(item: ArticleSimple) => {
          item.id;
        }}
        style={styles.flatList}
        extraData={[store.refreshing]}
        data={store.homeList}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.container}
        refreshing={store.refreshing}
        onRefresh={onRefresh}
        onEndReachedThreshold={0.2}
        onEndReached={onEndReached}
        ListFooterComponent={<Foot />}
        ListHeaderComponent={
          <HeaderMenus
            categoryList={categoryList}
            allCategoryList={store.categoryList}
            onCategoryChange={item => {
              console.log(item);
            }}
          />
        }></FlowList>
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  container: {
    // marginTop: 10,
  },
  flatList: {
    width: '100%',
    height: '100%',
  },
  item: {
    width: (SCREEN_WIDTH - 18) / 2,
    backgroundColor: 'white',
    marginLeft: 6,
    marginBottom: 6,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    height: 240,
    resizeMode: 'cover',
  },
  botTitle: {
    marginTop: 8,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatTxt: {
    fontSize: 10,
    color: '#ccc',
    flex: 1,
  },
  countTxt: {
    fontSize: 12,
    color: '#ccc',
    marginLeft: 5,
  },
  txtContent: {
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  title: {
    fontSize: 12,
    color: '#333',
  },
  footTxt: {
    width: '100%',
    fontSize: 14,
    color: '#999',
    marginVertical: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 8,
    resizeMode: 'cover',
  },
});
export default MainTab;
