import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';
import { myFetch } from '../utils';
// import { MessageBar, MessageBarManager } from 'react-native-message-bar';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      pwd: '',
      isloading: ''
    }
  }
  userhandle = (text) => {
    this.setState({username: text})
  }
  pwdhandle = (text) => {
    this.setState({pwd: text})
  }
  login = () => {
    this.setState({isloading: '登 录 中。。。。。。'});
    myFetch.post('/api/login',{
      username: this.state.username,
      pwd: this.state.pwd}
    ).then(res => {
      if (!res.data.status) {
        AsyncStorage.setItem('user', JSON.stringify(res.data))
        .then(() => {
          Actions.replace('home');
        })
      } else {
        this.setState({isloading: '用户名或密码错误！！！'});
      }
    })
  }

  render() {
    return (
      <View style={{flex: 1,justifyContent: 'center'}}>
        <View style={{ alignItems: 'center'}}>
          <Text>{this.state.isloading}</Text>
          <Text>登录页</Text>
          <Text>用户名：asd   密码：123456</Text>
          <View style={{
            width: '80%',
            marginRight: 10,
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 20,
          }}>
            <Icon name="user" color="red"/>
            <TextInput style={{width: '80%'}} placeholder="用户名" onChangeText={this.userhandle}/>
          </View>
          <View style={{
            width: '80%',
            marginRight: 10,
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 20,
          }}>
            <Icon name="key" color="red"/>
            <TextInput style={{width: '80%'}} onChangeText={this.pwdhandle} placeholder="密码" secureTextEntry={true}/>
          </View>
          <TouchableOpacity 
            style={{
              width: '80%',
              height: 40,
              backgroundColor: '#ccc',
              marginTop: 30,
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={this.login}
          >
            <Text>登录</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{
              width: '80%',
              height: 40,
              backgroundColor: '#ccc',
              marginTop: 30,
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={() => {Actions.replace('register')}}
          >
            <Text>注册</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}