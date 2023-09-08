/* eslint-disable react/display-name */
import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useCallback,
} from 'react';
import {
  View,
  Modal,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {save} from '../../../untils/Storage';
import icon_arrow from '../../../assets/icon_arrow.png';
import icon_delete from '../../../assets/icon_delete.png';

type props = {
  allCategoryList: Category[];
};
export interface CategoryModalRef {
  show: () => void;
  hide: () => void;
}

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const CategoryModal = forwardRef((props: props, ref) => {
  const {allCategoryList} = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [myCategoryList, setMyCategoryList] = useState<Category[]>([]);
  const [otherCategoryList, setOtherCategoryList] = useState<Category[]>([]);
  const [edit, setEdit] = useState<boolean>(false);
  const hide = () => {
    setModalVisible(false);
  };
  const show = () => {
    setModalVisible(true);
  };
  useImperativeHandle(ref, () => {
    return {
      show,
      hide,
    };
  });

  const closePress = useCallback(
    (clickItem: Category, index: number) => () => {
      if (!edit) return;
      const myList = myCategoryList?.filter(
        item => item.name !== clickItem.name,
      );
      clickItem = {...clickItem, isAdd: false};
      const otherList = [...otherCategoryList, clickItem];
      setMyCategoryList(myList);
      setOtherCategoryList(otherList);
    },
    [edit, myCategoryList, otherCategoryList],
  );
  const addPress = useCallback(
    (clickItem: Category, index: number) => () => {
      if (!edit) return;
      const otherList = otherCategoryList?.filter(
        item => item.name !== clickItem.name,
      );
      clickItem = {...clickItem, isAdd: true};
      const myList = [...myCategoryList, clickItem];
      setMyCategoryList(myList);
      setOtherCategoryList(otherList);
    },
    [edit, myCategoryList, otherCategoryList],
  );
  useEffect(() => {
    setMyCategoryList(allCategoryList.filter(item => item.isAdd));
    setOtherCategoryList(allCategoryList.filter(item => !item.isAdd));
  }, [allCategoryList]);

  const RenderMyList = () => {
    return (
      <View style={myStyles.myListRoot}>
        <View style={myStyles.headTxt}>
          <Text style={myStyles.headMyTxt}>我的频道</Text>
          <Text style={myStyles.headComeTxt}>点击进入视频</Text>
          <TouchableOpacity
            style={myStyles.headBtn}
            onPress={() => {
              setEdit(!edit);
              if (edit) {
                save(
                  'categoryList',
                  JSON.stringify([...myCategoryList, ...otherCategoryList]),
                );
              }
            }}>
            <Text style={myStyles.headBtnTxt}>
              {edit ? '完成编辑' : '进入编辑'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={hide}>
            <Image style={myStyles.headImg} source={icon_arrow}></Image>
          </TouchableOpacity>
        </View>
        {myCategoryList?.map((item: Category, index: number) => {
          return (
            <TouchableOpacity
              key={item.name}
              style={myStyles.item}
              onPress={() => {
                closePress(item, index);
              }}>
              <Text style={myStyles.itemTxt}>{item.name}</Text>
              {edit && (
                <Image
                  style={myStyles.itemCloseImg}
                  source={icon_delete}></Image>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const RenderOtherList = () => {
    return (
      <View style={[myStyles.myListRoot, {marginTop: 10}]}>
        <View style={myStyles.headTxt}>
          <Text style={myStyles.headMyTxt}>推荐频道</Text>
          <Text style={myStyles.headComeTxt}>点击加入视频</Text>
        </View>
        {otherCategoryList?.map((item: Category, index: number) => {
          return (
            <TouchableOpacity
              key={item.name}
              style={myStyles.item}
              onPress={() => {
                addPress(item, index);
              }}>
              <Text style={myStyles.itemTxt}>
                {' '}
                {edit ? '+' : ''} {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <Modal visible={modalVisible} transparent={true} onRequestClose={hide}>
      <View style={styles.modal}>
        <View style={styles.headModel}></View>
        <View style={styles.modelContent}>
          {RenderMyList()}
          {RenderOtherList()}
        </View>
        <TouchableOpacity
          style={styles.bottomModel}
          onPress={() => {
            hide();
          }}></TouchableOpacity>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  modalLayout: {
    width: '100%',
    height: '100%',
  },
  modal: {
    width: '100%',
    height: '100%',
  },
  headModel: {
    height: 48,
  },
  modelContent: {
    width: '100%',
    backgroundColor: 'white',
    paddingBottom: 16,
  },
  bottomModel: {
    flex: 1,
    backgroundColor: '#00000060',
  },
});
const myStyles = StyleSheet.create({
  myListRoot: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    marginLeft: 16,
    marginTop: 12,
    height: 32,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    width: (SCREEN_WIDTH - 80) / 4,
  },

  itemTxt: {
    fontSize: 14,
    color: '#333',
  },
  headTxt: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 18,
    marginTop: 10,
    alignItems: 'center',
  },
  headMyTxt: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 12,
    color: '#333',
  },
  headComeTxt: {
    fontSize: 12,
    color: '#ccc',
    flex: 1,
  },
  headBtn: {
    paddingHorizontal: 10,
    height: 28,
    backgroundColor: '#EEE',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  headBtnTxt: {
    fontSize: 13,
    color: '#3050ff',
  },
  headImg: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    transform: [{rotate: '90deg'}],
  },
  itemCloseImg: {
    width: 12,
    height: 12,
    top: -6,
    right: -6,
    position: 'absolute',
  },
});
export default CategoryModal;
