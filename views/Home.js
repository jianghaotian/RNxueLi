import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Swiper from 'react-native-swiper';
import Button from 'react-native-button';
import {
  SafeAreaView,
  ScrollView,
  TextInput,
  View,
  Text,
  Image,
  FlatList,
  Dimensions
} from 'react-native';

let data = [
  {
    img: require('../images/hi1.png'),
    title: '居家维修保养'
  },
  {
    img: require('../images/hi2.png'),
    title: '住宿优惠'
  },
  {
    img: require('../images/hi3.png'),
    title: '出行接送'
  },
  {
    img: require('../images/hi4.png'),
    title: 'E族活动'
  }
]

const Home = () => {
  const {width, height, scale} = Dimensions.get('window');
  // console.log(width, height, scale);
  // 640 px
  function lenUnified(x) {
    return (x / scale) * width / (640 / scale);
  }
  return (
    <>
      <SafeAreaView style={{flex: 1,backgroundColor:'#f5f5f5'}}>
        {/* 搜索栏 */}
        <View style={{
          height: lenUnified(72),
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f23030'
        }}>
          <View style={{
            width: lenUnified(590),
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <View style={{
              height: lenUnified(50),
              width: lenUnified(526),
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#fbb8b8',
              borderRadius: lenUnified(25)
            }}>
              <Icon color='#fff' name="search1" size={20} style={{marginLeft: lenUnified(28)}}/>
              <TextInput
                style={{
                  height: lenUnified(52),
                  width: lenUnified(440),
                  padding: 0,
                  paddingLeft: lenUnified(20)
                }}
                placeholder="请输入您要搜索的关键字"
                placeholderTextColor="#fff"
              />
            </View>
            <Icon color='#fff' name="shoppingcart" size={24}/>
          </View>
        </View>
        <ScrollView>
          {/* 轮播图 */}
          <View style={{
            height: lenUnified(274),
          }}>
            <Swiper
              autoplay
              dotStyle={{
                marginBottom: 0,
                backgroundColor: '#fff'
              }}
              activeDotStyle={{
                marginBottom: 0,
                backgroundColor: '#f23030'
              }}
            >
              <Image
                source={require('../images/home01.png')}
                resizeMode='stretch'
                style={{
                  height: lenUnified(274),
                  width: width
                }}
              />
              <Image
                source={require('../images/home02.png')}
                resizeMode='stretch'
                style={{
                  height: lenUnified(274),
                  width: width
                }}
              />
            </Swiper>
          </View>
          {/* 内容 */}
          <FlatList
            data={data}
            renderItem={({item}) => (
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: lenUnified(120),
                marginTop: lenUnified(12),
                backgroundColor: '#fff'
              }}>
                <Image
                  source={item.img}
                  style={{
                    height: lenUnified(100),
                    width: lenUnified(100),
                    marginLeft: lenUnified(24),
                    marginRight: lenUnified(42)
                  }}
                />
                <Text>{item.title}</Text>
                <Icon
                  color='#ababab'
                  name="right"
                  size={20}
                />
              </View>
            )}
          />
          {/* 按钮 */}
          <View style={{
            alignItems: 'center',
            marginTop: 36,
            marginBottom: 60
          }}>
            <Button 
              style={{
                width: lenUnified(544),
                height: lenUnified(68),
                borderRadius: 10,
                textAlignVertical: 'center',
                backgroundColor:'#f23030',
                color: '#fff'
              }}
            >发布需求</Button>
          </View>
          <Text style={{
            textAlign: "center",
            fontSize: 12,
            color: '#ababab'
          }}>©E族之家 版权所有</Text>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Home;
