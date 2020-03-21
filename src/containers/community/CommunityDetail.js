import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {TopView} from '../../components/common/View';
import {UIActivityIndicator} from 'react-native-indicators';
import {widthPercentageToDP} from '../../utils/util';

const CommunityDetail = props => {
  const [DATA2, setDATA2] = useState([props.navigation.state.params.data]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <TopView
        marginBottom={5}
        title={'댓글 페이지'}
        backHandler={() => {
          props.navigation.goBack(null);
        }}
        closeBtn={false}
        closeHandler={() => {
          props.navigation.goBack(null);
        }}
      />
      {/* 리스트 뷰 */}
      <FlatList
        style={{
          flexGrow: 1,
          width: '100%',
          height: '100%',
        }}
        data={DATA2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('CommunityDetail');
              }}
              style={{
                height: widthPercentageToDP(100),
              }}>
              <Text> # {item.title}</Text>
              <Text>내용: {item.content}</Text>
            </TouchableOpacity>
          );
        }}
        ListFooterComponent={() => {
          return (
            <View
              style={{
                width: widthPercentageToDP(100),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <UIActivityIndicator
                size={widthPercentageToDP(30)}
                color={'gray'}
              />
            </View>
          );
        }}
        onEndReachedThreshold={0.01}
        onEndReached={() => {
          //   setDATA2([
          //     ...DATA2,
          //     {title: 'asd', content: 'asd'},
          //     {title: '123', content: '123'},
          //     {title: 'asd', content: 'asd'},
          //     {title: '123', content: '123'},
          //     {title: 'asd', content: 'asd'},
          //     {title: '123', content: '123'},
          //     {title: 'asd', content: 'asd'},
          //     {title: '123', content: '123'},
          //     {title: 'asd', content: 'asd'},
          //     {title: '123', content: '123'},
          //     {title: 'asd', content: 'asd'},
          //     {title: '123', content: '123'},
          //   ]);
        }}
      />
    </SafeAreaView>
  );
};

export default CommunityDetail;
