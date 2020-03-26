import React, {useEffect} from 'react';
import {
  StatusBar,
  Text,
  BackHandler,
  ToastAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Router, Scene, Tabs, Actions } from 'react-native-router-flux';
import Home from './views/Home';
// import Personal from './views/Person(1)';
import Personal from './views/Personal';
import List from './views/List';
import Fabu from './views/Fabu';
console.disableYellowBox = true;

const App = () => {

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackAndroid)
  });

  var now;
  function onBackAndroid() {
    // console.log(Actions.currentScene);
    if (Actions.currentScene != '_one') {
      Actions.pop();
      return true;
    } else {
      if (new Date().getTime() - now < 2000) {
        BackHandler.exitApp();
      } else {
        ToastAndroid.show('再按一次退出应用', 1000);
        now = new Date().getTime();
        return true;
      }
    }
  }

  return (
    <>
      <StatusBar backgroundColor="#f23030" barStyle="light-content"/>
      <Router>
        <Scene hideNavBar>
          <Tabs
            key="tabbar"
            activeTintColor="#f23030"
          >
            <Scene
              key="one"
              icon={({focused}) => <Icon color={focused ? '#f23030' : '#ababab'} name="home" size={26}/>}
              component={Home}
              title="首页"
              hideNavBar
            />
            <Scene
              key="two"
              icon={({focused}) => <Icon color={focused ? '#f23030' : '#ababab'} name="appstore-o" size={26}/>}
              component={List}
              title="商品分类"
              hideNavBar
            />
            <Scene
              key="three"
              icon={({focused}) => <Icon color={focused ? '#f23030' : '#ababab'} name="shoppingcart" size={26}/>}
              component={()=><Text>购物车</Text>}
              title="购物车"
              hideNavBar
            />
            <Scene
              key="four"
              title="个人中心"
              icon={({focused}) => <Icon color={focused ? '#f23030' : '#ababab'} name="user" size={26}/>}
            >
              <Scene key="user" component={Personal} hideNavBar/>
            </Scene>
          </Tabs>
            <Scene key="fabu"
              component={Fabu}
              title="我的发布"
              navigationBarStyle={{backgroundColor:'#f23030'}}
              titleStyle={{color:'#fff',textAlign:'center',flex:1}}
              renderRightButton={()=><Icon color='#fff' name="ellipsis1" size={26} style={{marginRight:20}}/>}
              renderLeftButton={()=><Icon color='#fff' name="left" size={20} style={{marginLeft:20}}/>}
              // onLeft={()=>{console.log(233333)}}
              hideNavBar={false}
            />
        </Scene>
      </Router>
    </>
  )
}
      
export default App;
