import * as React from 'react';
import {useCallback, useEffect, useRef} from 'react';
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  Alert,
} from 'react-native';
import {RootStackParamList} from '../../AppInner';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import axios from 'axios';
import GLOBAL_CONST from '../constants/global';
import io from 'socket.io-client';

type ShellScreenProps = NativeStackScreenProps<RootStackParamList, 'Shell'>;
const socket = io(`http://localhost:4000`);

const memos = [
  {title: '01', content: '첫번째 메모 내용'},
  {title: '02', content: '두번째 메모 내용'},
  {title: '03', content: '세번째 메모 내용'},
  {title: '04', content: '네번째 메모 내용'},
];

function Shell({navigation}: ShellScreenProps) {
  // 통신 -> async : await useEffect async 사용이 불가능
  useEffect(() => {
    // Type 추론이 안됨

    socket.emit('memo', '어플리케이션에서 보낸신호 입니다.');

    socket.on('memo', value => {
      Alert.alert(value);
    });

    // 커링기술, 잡기술
    (async () => {
      const response = await axios.post(`${GLOBAL_CONST.BACK_URL}/memo/test`);
    })();
  }, []);

  const goDetail = useCallback((title, content) => {
    navigation.navigate('Inner', {
      title: title,
      content: content,
    });
  }, []);

  // Pressable을 눌러서 Inner 스텍으로 넘어갈때,
  // 어떻게 해야, 타이틀과 컨텐트로 넘겨줄까?

  return (
    <View style={styles.wrapper}>
      <Image
        style={styles.topbox}
        source={{
          uri: 'https://t4.ftcdn.net/jpg/03/64/64/03/240_F_364640326_8aRSpRwBtGsNkdixNxNlgO3HnM6xrMZq.jpg',
        }}></Image>
      <View style={styles.mainbox}>
        {memos.map(data => {
          return (
            <Pressable
              key={data.title}
              style={styles.box}
              onPress={() => goDetail(data.title, data.content)}>
              <Text style={styles.boxTitle}>{data.title}</Text>
              <Text style={styles.boxText}>{data.content}</Text>
            </Pressable>
          );
        })}
      </View>
      <View style={styles.bottombox}>
        <View style={styles.bottomicon}>
          <Text style={styles.buttomText}>﹢</Text>
        </View>
      </View>
    </View>
  );
}

// 이 박스들이 좌 우 위 아래 5 만큼의 마진을 가질거다!
// 전체 화면 = x
// 박스 하나의 위드를 = y
// 박스가 가진 한쪽 면의 마진을 = z

// 2y + 20 = x

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: 50,
    flexDirection: 'column',
  },

  topbox: {
    flex: 1,
    backgroundColor: '#777',
    resizeMode: 'stretch',
  },

  mainbox: {
    paddingTop: 15,
    flex: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#252733',
    paddingHorizontal: 10,
  },

  box: {
    width: Dimensions.get('window').width - 30,
    paddingVertical: 23,
    margin: 5,
    borderRadius: 10,
    borderWidth: 1,

    backgroundColor: '#ddddee',
    borderColor: '#222233',

    alignItems: 'flex-start',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },

  boxTitle: {
    marginLeft: 15,
    color: '#252733',
    fontSize: 22,
    fontWeight: 'bold',
  },

  boxText: {
    paddingLeft: 15,
    paddingTop: 5,
    color: '#252733',
    fontSize: 11,
    fontWeight: 'bold',
  },

  bottombox: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#252733',

    justifyContent: 'center',
  },

  bottomicon: {
    width: 64,
    height: 64,

    borderRadius: 100,
    backgroundColor: '#ddddee',

    justifyContent: 'center',
    alignItems: 'center',
  },

  buttomText: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#252733',
  },
});

export default Shell;
