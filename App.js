import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  View,
  Text,
  BackHandler,
  ToastAndroid,
  AsyncStorage

} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import SplashScreen from 'react-native-splash-screen';
import { Router, Scene, Tabs, Actions } from 'react-native-router-flux';
import Home from './views/Home';
import Personal from './views/Personal';
import List from './views/List';
import Fabu from './views/Fabu';
import Login from './views/Login';
import Register from './views/Register';
import SwiperPage from './views/SwiperPage';

console.disableYellowBox = true;


const App = () => {
  let [isLogin, setLogin] = useState(false);
	let [isInstall, setInstall] = useState(false);
  let now;
  
  useEffect(() => {
    init();
    BackHandler.addEventListener('hardwareBackPress', onBackAndroid);
    console.log('init');
  });

  function onBackAndroid() {
    // console.log(Actions.currentScene);
    // console.log(isLogin);
    if (Actions.currentScene != 'home' && Actions.currentScene != '_home' && Actions.currentScene != 'login' && Actions.currentScene != 'register') {
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

  let init = () => {
    SplashScreen.show();

		AsyncStorage.getItem('isInstall')
		.then(res => {
			console.log('isinstall', res)
			if (res == null) {
				setInstall(true);
        SplashScreen.hide();
      }
    })

    AsyncStorage.getItem('user')
    .then(res => {
      let user = JSON.parse(res);
      console.log('user', user);
      if (user && user.status == 0) {
        setLogin(true);
      }
      SplashScreen.hide();
    })
  }
  
  let afterInstall = () => {
		console.log('after install');
		setInstall(false);
  }
  
	if (isInstall) {
		return (
      <View style={{flex:1}}>
        <SwiperPage afterInstall={afterInstall}/>
      </View>
    )
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
              key="home"
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
            navBarButtonColor='#fff'
            titleStyle={{color:'#fff',textAlign:'center',flex:1}}
            renderRightButton={()=><Icon color='#fff' name="ellipsis1" size={26} style={{marginRight:20}}/>}
            // renderLeftButton={()=><Icon color='#fff' name="left" size={20} style={{marginLeft:20}}/>}
            // onLeft={Actions.pop}
            hideNavBar={false}
          />
          <Scene initial={!isLogin} key="lrin" hideNavBar>
            <Scene key="login" component={Login}/>
            <Scene key="register" component={Register}/>
          </Scene>
        </Scene>
      </Router>
    </>
  )
}
      
export default App;
