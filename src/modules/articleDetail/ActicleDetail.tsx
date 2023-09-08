import React, {useEffect, useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import {useLocalStore} from 'mobx-react';
import {useRoute} from '@react-navigation/native';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import acticleStore from './acticleStore';

import icon_arrow from '../../assets/icon_arrow.png';
import icon_share from '../../assets/icon_share.png';
import {ImageSlider} from '../../components/slidePager';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
export const ActicleDetail = observer(() => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const store = useLocalStore(() => new acticleStore());
  const router = useRoute().params as any;
  useEffect(() => {
    store.requestActicleList(router?.id);
  }, []);
  const acticleList: Article = store.acticleList;
  const [height, setHeight] = useState<number>(200);
  useEffect(() => {
    const firstImg = acticleList?.images?.[0];
    firstImg &&
      Image.getSize(firstImg, (width: number, height: number) => {
        const showHeight = (SCREEN_WIDTH * height) / width;
        setHeight(showHeight);
      });
  }, [acticleList?.images]);
  const renderImage = () => {
    const {acticleList} = store;
    const {images} = acticleList || [];
    const data: any[] = images?.map(i => {
      return {img: i};
    });
    console.log('data:', data);
    return (
      <View style={{paddingBottom: 30, flex: 1}}>
        <ImageSlider
          data={data}
          autoPlay={false}
          closeIconColor="white"
          caroselImageStyle={{height}}
          indicatorContainerStyle={{bottom: -45}}
          activeIndicatorStyle={styles.activeIndicatorStyle}
          inActiveIndicatorStyle={styles.inActiveIndicatorStyle}></ImageSlider>
      </View>
    );
  };
  const renderText = () => {
    const {title, desc, tag} = acticleList;
    const tags = tag?.map(i => `# ${i}`).join('   ');
    const stylesTxt = StyleSheet.create({
      textC: {
        flexDirection: 'column',
        marginTop: 5,
        paddingHorizontal: 16,
        justifyContent: 'center',
      },
      title: {
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
        marginBottom: 15,
      },
      desc: {
        fontSize: 14,
        color: '#333',
      },
      tags: {
        fontSize: 14,
        color: '#3050e0',
        marginTop: 15,
        marginBottom: 20,
        // flex:1
      },
    });
    return (
      <View style={stylesTxt.textC}>
        <Text style={stylesTxt.title}>{title}</Text>
        <Text style={stylesTxt.desc}>{desc}</Text>
        <Text style={stylesTxt.tags}>{tags}</Text>
      </View>
    );
  };
  return (
    <View style={styles.acticleRoot}>
      <View style={styles.acticleBar}>
        <TouchableOpacity
          style={styles.acticleBarBtn}
          onPress={() => {
            navigation.pop();
          }}>
          <Image style={styles.acticleBarImg} source={icon_arrow}></Image>
        </TouchableOpacity>
        {!!acticleList?.avatarUrl && (
          <Image
            style={styles.acticleAvatarImg}
            source={{uri: acticleList?.avatarUrl}}></Image>
        )}
        <Text style={styles.acticleAvatarTxt}>{acticleList.userName}</Text>
        <TouchableOpacity style={styles.acticleGzBtn}>
          <Text style={styles.acticleGzTxt}>关注</Text>
        </TouchableOpacity>
        <Image style={styles.acticleSharpImg} source={icon_share}></Image>
      </View>
      <ScrollView
        style={{flex: 1}}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {renderImage()}
        {renderText()}
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  activeIndicatorStyle: {
    width: 8,
    height: 8,
    backgroundColor: '#ff2442',
    borderRadius: 4,
  },
  inActiveIndicatorStyle: {
    width: 8,
    height: 8,
    backgroundColor: '#c0c0c0',
    borderRadius: 4,
  },
  acticleRoot: {
    width: '100%',
    height: '100%',
  },
  acticleBar: {
    flexDirection: 'row',
    height: 46,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  acticleBarBtn: {
    paddingHorizontal: 12,
  },
  acticleBarImg: {
    width: 25,
    height: 25,
  },
  acticleAvatarImg: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  acticleAvatarTxt: {
    fontSize: 14,
    marginLeft: 10,
    flex: 1,
    color: '#333',
  },
  acticleGzBtn: {},
  acticleGzTxt: {
    borderColor: '#ff2442',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 14,
    color: '#ff2442',
    fontSize: 12,
    marginRight: 12,
  },
  acticleSharpImg: {
    marginRight: 12,
    width: 24,
    height: 24,
  },
});
