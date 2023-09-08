import React, {useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useLocalStore, observer} from 'mobx-react';
import shoStroe from './shopStore';

import ResizeImage from '../../components/ResizeImage';

import icon_search from '../../assets/icon_search.png';
import bZ5 from '../../assets/bZ5.png';
import aa from '../../assets/aa.png';
import Epo from '../../assets/Epo.png';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

const {width: WIDTH_WCREEN} = Dimensions.get('window');
const MainTab = observer(() => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const stroe = useLocalStore(() => new shoStroe());
  useEffect(() => {
    stroe.requestShopList();
    stroe.top10Category();
  }, []);

  const renderItem = ({item, index}: {item: GoodsSimple; index: number}) => {
    return (
      <View style={styles.item} key={item.id}>
        <ResizeImage uri={item.image} />
        <Text style={styles.itemTxt}>{item.title}</Text>
        <Text style={styles.itemPrice}>
          <Text style={styles.itemPricef}>￥</Text> {item.price}
        </Text>
      </View>
    );
  };
  const renderHeader = () => {
    const topList = stroe.categoryList;

    const styles = StyleSheet.create({
      shopHead: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 16,
        paddingBottom: 20,
        backgroundColor: 'white',
      },
      headItem: {
        width: '20%',
        marginTop: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
      headItemImg: {
        width: 30,
        height: 30,
      },
      headItemTxt: {
        fontSize: 12,
        color: '#333',
        marginTop: 6,
      },
    });
    return (
      <View style={styles.shopHead}>
        {topList.map(item => {
          return (
            <View key={item.id} style={styles.headItem}>
              <Image
                style={styles.headItemImg}
                source={{uri: item.image}}></Image>
              <Text style={styles.headItemTxt}>{item.name}</Text>
            </View>
          );
        })}
      </View>
    );
  };
  const searchHead = () => {
    const onpress = () => {
      navigation.push('SearchShop');
    };
    const stylesSearch = StyleSheet.create({
      search: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
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
      },
    });
    return (
      <View style={stylesSearch.search}>
        <TouchableOpacity
          style={stylesSearch.searchTxt}
          activeOpacity={1}
          onPress={onpress}>
          <Image style={stylesSearch.searchImg} source={icon_search}></Image>
          <Text style={{color: '#bbb', textAlignVertical: 'center'}}>搜索</Text>
        </TouchableOpacity>
        <Image style={stylesSearch.searchIcon} source={bZ5}></Image>
        <Image style={stylesSearch.searchIcon} source={aa}></Image>
        <Image style={stylesSearch.searchIcon} source={Epo}></Image>
      </View>
    );
  };
  return (
    <View style={styles.shopRoot}>
      {searchHead()}
      <FlatList
        extraData={[stroe.categoryList]}
        renderItem={renderItem}
        data={stroe.shopList}
        keyExtractor={item => item.id + ''}
        numColumns={2}
        ListHeaderComponent={renderHeader()}></FlatList>
    </View>
  );
});

const styles = StyleSheet.create({
  shopRoot: {
    width: '100%',
    height: '100%',
    // marginBottom: 10,
  },
  item: {
    width: (WIDTH_WCREEN - 18) / 2,
    marginLeft: 6,
    marginTop: 6,
    borderRadius: 10,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  itemTxt: {
    fontSize: 12,
    color: '#333',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  itemPrice: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  itemPricef: {
    fontSize: 12,
    color: '#333',
    fontWeight: 'bold',
  },
});
export default MainTab;
