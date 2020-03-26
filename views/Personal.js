import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
// import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  AsyncStorage,
  Dimensions
} from 'react-native';
import { Actions } from 'react-native-router-flux';

let my = [
  {icon: 'setting', title: '账户管理'},
  {icon: 'enviromento', title: '收货地址'},
  {icon: 'solution1', title: '我的信息'},
  {icon: 'profile', title: '我的订单'},
  {icon: 'qrcode', title: '我的二维码'},
  {icon: 'database', title: '我的积分'},
  {icon: 'staro', title: '我的收藏'}
]

let ez = [
  {icon: 'phone', title: '居家维修保养'},
  {icon: 'car', title: '出行接送'},
  {icon: 'user', title: '我的受赠人'},
  {icon: 'cloudo', title: '我的住宿优惠'},
  {icon: 'find', title: '我的活动'},
  {icon: 'edit', title: '我的发布'}
]

const Personal = () => {
  const {width, height, scale} = Dimensions.get('window');
  // console.log(width, height, scale);
  // 640 px
  function lenUnified(x) {
    return (x / scale) * width / (640 / scale);
  }

  // AsyncStorage
  function saveImgUrlStorage (value) {
    AsyncStorage.setItem('imgurl', value);
  }

  function getImgUrlStorage () {
    AsyncStorage.getItem('imgurl')
      .then((value) => {
        setImgUrl(value);
      });
  }

  const [getImgUrl, setImgUrl] = useState('');

  useEffect(() => {	
    getImgUrlStorage();
  }, []);

  function takePhoto() {
    ImagePicker.openCamera({
      width: 400,
      height: 400,
      cropping: true
    }).then(image => {
      setImgUrl(image.path);
      saveImgUrlStorage(image.path)
    });
  }

  function ezPress(title) {
    if (title == '我的发布') {
      Actions.push('fabu');
    }
  }

  function exit() {
    // AsyncStorage.setItem('user', '');
    AsyncStorage.clear();
    Actions.replace('login');
  }
  
  return (
    <>
      <SafeAreaView style={{flex: 1,backgroundColor:'#f5f5f5'}}>
        <ScrollView>
          {/* 头部 */}
          <View>
            <View style={{
              alignItems: 'center',
              height: lenUnified(300),
              backgroundColor: '#f23030'
            }}>
              <TouchableWithoutFeedback
                onPress={takePhoto}
              >
                <Image
                  source={getImgUrl ? {uri: getImgUrl} : require('../images/head.png')}
                  style={{
                    height: lenUnified(156),
                    width: lenUnified(156),
                    marginTop: lenUnified(50),
                    marginBottom: lenUnified(20)
                  }}
                />
              </TouchableWithoutFeedback>
              <Text style={{
                color: '#fff',
                fontSize: 18
              }}>BINNU DHILLON</Text>
            </View>
            <Image
              source={require('../images/ww.png')}
              resizeMode='stretch'
              style={{width: width}}
            />
          </View>
          {/* 个人中心 */}
            <View style={{
              height: lenUnified(70),
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomColor: '#eeeeee',
              borderBottomWidth: 1,
              backgroundColor: '#fff',
              paddingLeft: lenUnified(22),
              paddingBottom: 10
            }}>
              <Icon color='#ababab' name="user" size={26}/>
              <Text style={{marginLeft: 10}}>我的个人中心</Text>
            </View>
            <View style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              paddingBottom: 16,
              marginBottom: lenUnified(10),
              backgroundColor: '#fff'
            }}>
            {
              my.map((item, index) => (
                <View
                  key={'my' + index}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    width: width / 3,
                    height: lenUnified(130),
                    paddingTop: 16
                }}>
                  <Icon color='#ababab' name={item.icon} size={24}/>
                  <Text>{item.title}</Text>
                </View>
              ))
            }
          </View>
          {/* E族活动 */}
          <View style={{
              height: lenUnified(80),
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomColor: '#eeeeee',
              borderBottomWidth: 1,
              backgroundColor: '#fff',
              paddingLeft: lenUnified(22)
            }}>
              <Icon color='#ababab' name="tago" size={26}/>
              <Text style={{marginLeft: 10}}>E族活动</Text>
            </View>
            <View style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              paddingBottom: 16,
              backgroundColor: '#fff'
            }}>
            {
              ez.map((item, index) => (
                <TouchableOpacity onPress={() => ezPress(item.title)}>
                  <View
                    key={'ez' + index}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      width: width / 3,
                      height: lenUnified(130),
                      paddingTop: 16
                  }}>
                    <Icon color='#ababab' name={item.icon} size={24}/>
                    <Text>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              ))
            }
          </View>
          <TouchableOpacity onPress={exit}>
            <Text style={{
              height: lenUnified(100),
              lineHeight: lenUnified(100),
              textAlign: "center",
              fontSize: 12,
              color: '#ababab'
            }}>BINNU DHILLON  |  退出</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Personal;
