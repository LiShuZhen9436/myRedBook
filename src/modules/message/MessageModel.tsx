/* eslint-disable react/display-name */
import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import MyG from '../../assets/MyG.png';
import Khs from '../../assets/Khs.png';

export interface messageModelI {
  show: () => void;
  hidden: () => void;
}

export const MessageModel = forwardRef((props, ref) => {
  const [modalVisible, setmodalVisible] = useState<boolean>(false);
  const [pagey, sety] = useState<number>(0);
  const navigation = useNavigation<StackNavigationProp<any>>();

  const show = (y: number) => {
    console.log('y:', y);
    sety(y);
    setmodalVisible(true);
  };
  const hidden = () => {
    setmodalVisible(false);
  };
  useImperativeHandle(ref, () => {
    return {
      show,
      hidden,
    };
  });
  return (
    <Modal
      style={styles.modal}
      visible={modalVisible}
      onRequestClose={hidden}
      transparent={true}
      statusBarTranslucent={true}>
      <TouchableOpacity style={styles.content} onPress={hidden}>
        <View style={[styles.qipao, {top: pagey}]}>
          <View style={styles.gc}>
            <Image style={styles.img} source={MyG}></Image>
            <Text style={styles.txt}>群聊广场</Text>
          </View>
          <View style={styles.line}></View>
          <View style={styles.gc}>
            <Image style={styles.img} source={Khs}></Image>
            <Text style={styles.txt}>群聊广场</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
});

const styles = StyleSheet.create({
  modal: {},
  content: {
    width: '100%',
    height: '100%',
    backgroundColor: '#00000060',
  },
  qipao: {
    width: 150,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 6,
    position: 'absolute',
    right: 10,
  },
  line: {},
  gc: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  img: {
    height: 20,
    width: 20,
    marginRight: 8,
  },
  txt: {
    fontSize: 14,
    color: '#333',
  },
});
