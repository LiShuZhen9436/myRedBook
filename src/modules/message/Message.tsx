import React, {useEffect, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import {useLocalStore, observer} from 'mobx-react';

import messageStroe from './messageStroe';

import icon_star from '../../assets/icon_star.png';
import icon_new_follow from '../../assets/icon_new_follow.png';
import icon_comments from '../../assets/icon_comments.png';
import MyG from '../../assets/MyG.png';
import {MessageModel, messageModelI} from './MessageModel';

const MainTab = observer(() => {
  const stroe = useLocalStore(() => new messageStroe());
  useEffect(() => {
    stroe.requestMessageList();
    stroe.requestUnread();
  }, []);
  const messageModel = useRef<messageModelI>(null);

  const renderBar = () => {
    const barStyle = StyleSheet.create({
      barContent: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'white',
        justifyContent: 'center',
        height: 48,
        paddingHorizontal: 26,
      },
      barTitle: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      barRight: {
        flexDirection: 'row',
        position: 'absolute',
        right: 16,
        height: '100%',
        alignItems: 'center',
      },
      barImg: {
        width: 20,
        height: 20,
        marginRight: 10,
      },
      barTxt: {
        fontSize: 14,
        color: '#333',
        height: '100%',
        textAlignVertical: 'center',
      },
    });
    return (
      <View style={barStyle.barContent}>
        <Text style={barStyle.barTitle}>消息</Text>
        <TouchableOpacity
          style={barStyle.barRight}
          onPress={(event: GestureResponderEvent) => {
            const {pageY} = event.nativeEvent;
            messageModel?.current?.show(pageY + 48);
          }}>
          <Image style={barStyle.barImg} source={MyG}></Image>
          <Text style={barStyle.barTxt}>群聊</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const RanderCount = ({count}: {count: number}) => {
    return (
      <View style={styles.count}>
        <Text style={styles.countTxt}>{count}</Text>
      </View>
    );
  };
  const renderHead = () => {
    const {unreadList: unred} = stroe;
    return (
      <View style={styles.messageHead}>
        <View style={styles.messageHeadI}>
          <Image style={styles.messageHeadImg} source={icon_star}></Image>
          {!!unred?.unreadFavorate && (
            <RanderCount count={unred.unreadFavorate} />
          )}
          <Text style={styles.messageHeadTxt}>赞与收藏</Text>
        </View>
        <View style={styles.messageHeadI}>
          <Image style={styles.messageHeadImg} source={icon_new_follow}></Image>
          {!!unred?.newFollow && <RanderCount count={unred.newFollow} />}
          <Text style={styles.messageHeadTxt}>新增关注</Text>
        </View>
        <View style={styles.messageHeadI}>
          <Image style={styles.messageHeadImg} source={icon_comments}></Image>
          {!!unred?.comment && <RanderCount count={unred.comment} />}
          <Text style={styles.messageHeadTxt}>评论和@</Text>
        </View>
      </View>
    );
  };
  const renderItem = ({
    item,
    index,
  }: {
    item: MessageListItem;
    index: number;
  }) => {
    return (
      <View style={styles.item}>
        <Image style={styles.acat} source={{uri: item?.avatarUrl}}></Image>
        <View style={styles.titles}>
          <Text style={styles.tit1}>{item.name}</Text>
          <Text style={styles.tit2}>{item.lastMessage}</Text>
        </View>
        <View style={styles.rightTime}>
          <Text style={styles.timeTxt}>{item.lastMessageTime}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.massageRoot}>
      {renderBar()}
      <FlatList
        style={{backgroundColor: '#fff'}}
        extraData={[stroe.unreadList]}
        renderItem={renderItem}
        data={stroe.messageList}
        keyExtractor={item => item.id + ''}
        numColumns={1}
        ListHeaderComponent={renderHead()}></FlatList>

      <MessageModel ref={messageModel} />
    </View>
  );
});
const styles = StyleSheet.create({
  massageRoot: {
    width: '100%',
    height: '100%',
  },
  messageHead: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  messageHeadI: {
    flex: 1,
    alignItems: 'center',
  },
  messageHeadImg: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },
  messageHeadTxt: {
    fontSize: 12,
    color: '#3e3e3e',
    marginTop: 10,
  },
  count: {
    position: 'absolute',
    top: -8,
    right: 20,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
    backgroundColor: 'red',
  },
  countTxt: {
    fontSize: 10,
    color: 'white',
  },
  item: {
    flexDirection: 'row',
    height: 56,
    backgroundColor: 'white',
    flex: 1,
    marginBottom: 10,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  acat: {
    width: 35,
    height: 35,
    borderRadius: 15,
  },
  titles: {
    paddingHorizontal: 10,
    flex: 1,
  },
  tit1: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 3,
  },
  tit2: {
    fontSize: 12,
    color: '#333',
  },
  rightTime: {},
  timeTxt: {
    fontSize: 12,
    color: '#c0c0c0',
  },
});
export default MainTab;
