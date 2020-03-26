import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  TextInput,
  View,
  Text,
  Image,
  Dimensions
} from 'react-native';


const List = () => {
  const {width, height, scale} = Dimensions.get('window');
  // console.log(width, height, scale);
  // 640 px
  function lenUnified(x) {
    return (x / scale) * width / (640 / scale);
  }
  
  let data = [
    {
      img: require('../images/oishi01.png'),
      text: 'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
      price: '36.00'
    },
    {
      img: require('../images/oishi02.png'),
      text: 'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
      price: '36.00'
    },
    {
      img: require('../images/oishi01.png'),
      text: 'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
      price: '36.00'
    },
    {
      img: require('../images/oishi02.png'),
      text: 'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
      price: '36.00'
    },
    {
      img: require('../images/oishi01.png'),
      text: 'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
      price: '36.00'
    },
    {
      img: require('../images/oishi02.png'),
      text: 'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
      price: '36.00'
    }
  ]
  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        {/* 搜索栏 */}
        <View style={{
          height: lenUnified(72),
          alignItems: 'center',
          justifyContent: 'center',
          borderBottomColor: '#dedede',
          borderBottomWidth: lenUnified(1),
          backgroundColor: '#fff'
        }}>
          <View style={{
            height: lenUnified(50),
            paddingRight: lenUnified(26),
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#eeeeee',
            borderRadius: 4
            }}>
            <TextInput
              style={{
                height: lenUnified(50),
                width: '80%',
                padding: 0,
                paddingLeft: lenUnified(20)
              }}
              placeholder="请输入商品名称"
            />
            <Image
              source={require('../images/search.png')}
              // resizeMode='center'
            />
          </View>
        </View>
        {/* Tab栏 */}
        <View style={{
          height: lenUnified(72),
          paddingLeft: lenUnified(16),
          paddingRight: lenUnified(16),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          borderBottomColor: '#dedede',
          borderBottomWidth: lenUnified(1),
          backgroundColor: '#fff'
        }}>
          <Text style={{color: '#f23030'}}>综合</Text>
          <Text>销量</Text>
          <Text>新品</Text>
          <Text>价格</Text>
          <Text>信用</Text>
        </View>
        {/* 主要内容 */}
        <ScrollView style={{
          flex: 1,
          padding: lenUnified(16),
          backgroundColor: '#f4f4f4'
        }}>
          <View style={{
            width: '100%',
            height: '100%',
            paddingBottom: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}>
            {
              data.map((value, index) => (
                <View
                  key={index}
                  style={{
                    width: (width - 3 * lenUnified(16)) / 2,
                    // height: 418,
                    padding: lenUnified(8),
                    marginBottom: lenUnified(16),
                    backgroundColor: '#fff'
                  }}
                >
                  <Image
                    source={value.img}
                    resizeMode='center'
                    style={{
                      height: lenUnified(300)
                    }}
                  />
                  <Text style={{
                    color: '#666666',
                    fontSize: 12,
                    marginBottom: 8
                  }}>
                    {value.text}
                  </Text>
                  <Text style={{
                    color: '#f23030'
                  }}>
                    {value.price}
                  </Text>
                </View>
              ))
            }
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default List;
