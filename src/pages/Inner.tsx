import * as React from 'react';
import {useCallback} from 'react';
import {Text, View, StyleSheet, Pressable, Image} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../AppInner';

type InnerScreenProps = NativeStackScreenProps<RootStackParamList, 'Inner'>;

function Inner({route, navigation}: InnerScreenProps) {
  const {title, content} = route.params;

  const goShell = useCallback(() => {
    navigation.navigate('Shell');
  }, []);

  return (
    <View style={styles.wrapper}>
      <Image
        style={styles.titleBox}
        source={{
          uri: 'https://t3.ftcdn.net/jpg/03/64/62/96/240_F_364629630_LrwAMgXG5wkYgHaW5hpZvjxhbcMHF7cQ.jpg',
        }}></Image>

      <View style={styles.titleBox1}>
        <Text style={styles.titleText}>{title}</Text>
      </View>

      <View style={styles.contentBox}>
        <Text style={styles.contentText}>{content}</Text>
      </View>

      <View style={styles.buttonBox}>
        <Pressable style={styles.btn} onPress={goShell}>
          <Text style={styles.btnText}>목록으로</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: 35,

    backgroundColor: '#252733',
  },

  titleBox: {
    flex: 2,
  },

  titleBox1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,

    backgroundColor: '#252733',
  },

  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
  },

  contentBox: {
    flex: 3,
    width: 370,
    justifyContent: 'flex-start',
    alignItems: 'center',

    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 2,
    borderStyle: 'dashed',

    margin: 8,
  },

  contentText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
    padding: 10,
  },

  buttonBox: {
    flex: 2,
    backgroundColor: '#252733',
    alignItems: 'flex-end',
    paddingHorizontal: 30,
    justifyContent: 'center',
  },

  btn: {
    width: 120,
    height: 35,
    backgroundColor: '#ddddee',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  btnText: {
    color: '#222233',
    fontWeight: 'bold',
  },
});

export default Inner;
