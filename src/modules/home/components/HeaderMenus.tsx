import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import CategoryModal, {CategoryModalRef} from './CategoryModal';

import icon_arrow from '../../../assets/icon_arrow.png';

type props = {
  categoryList: Category[];
  allCategoryList: Category[];
  onCategoryChange?: (category: Category) => void;
};

const HeaderMenus = (props: props) => {
  const {categoryList, allCategoryList, onCategoryChange} = props;
  const [selItem, setSelItem] = useState<Category>();
  const categoryModal = useRef<CategoryModalRef>(null);

  useEffect(() => {
    const Category = categoryList.find(item => item.name === '推荐');
    console.log('Category:', Category);
    setSelItem(Category);
  }, [categoryList]);
  return (
    <View style={styles.menuLayout}>
      <ScrollView
        style={styles.scrollView}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {categoryList.map((item: Category) => {
          const isSel = selItem?.name === item.name;
          return (
            <TouchableOpacity
              style={styles.menuItem}
              key={item.name}
              onPress={() => {
                onCategoryChange?.(item);
                setSelItem(item);
              }}>
              <Text style={!isSel ? styles.menuTxt : styles.menuTxtSel}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <TouchableOpacity
        style={styles.nextBtn}
        onPress={() => {
          categoryModal?.current?.show();
        }}>
        <Image style={styles.nextImg} source={icon_arrow}></Image>
      </TouchableOpacity>

      <CategoryModal
        allCategoryList={allCategoryList}
        ref={categoryModal}></CategoryModal>
    </View>
  );
};

const styles = StyleSheet.create({
  menuLayout: {
    height: 46,
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  scrollView: {
    flexDirection: 'row',
  },
  menuItem: {
    width: 64,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuTxt: {fontSize: 14, color: '#999'},
  menuTxtSel: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  nextBtn: {
    paddingLeft: 5,
  },
  nextImg: {
    width: 20,
    height: 20,
    transform: [{rotate: '-90deg'}],
  },
});
export default HeaderMenus;
