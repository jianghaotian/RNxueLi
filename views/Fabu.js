import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  ToastAndroid
} from 'react-native';
import Button from 'react-native-button';

const Fabu = () => {
  const [getData, setData] = useState([]);
  const [getPage, setPage] = useState(1);

  function fetchData(page) {
    fetch('https://cnodejs.org/api/v1/topics?limit=15&page=' + page)
      .then((res) => res.json())
      .then((res) => {
        res.data.forEach(item => item.reply = Math.random() > 0.5 ? 1 : 0);
        setData(res.data);
      });
  }

  useEffect(() => {
    fetchData(1);
  }, []);

  function prev() {
    if (getPage === 1) {
      ToastAndroid.show('已经是第1页啦!', 1000);
    } else {
      let page = getPage - 1;
      setPage(page);
      fetchData(page);
    }
  }
  function next() {
    let page = getPage + 1;
    setPage(page);
    fetchData(page);
  }

  return (
    <>
      <SafeAreaView>
        <FlatList
          data={getData}
          renderItem={({item}) => (
            <View
              key={item.id}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 30,
                paddingLeft: 6,
                backgroundColor: '#fff'
              }}
            >
              <Text>{item.title.length > 15 ? item.title.slice(0, 15) + '...' : item.title}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: 130,
                  paddingRight: 6
                }}
              >
                <Text>{item.create_at.slice(0, 10)}</Text>
                <Text style={item.reply ? {color:'red'} : {}}>{item.reply ? '已回复' : '待回复'}</Text>
              </View>
            </View>
          )}
        >
        </FlatList>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#fff',
          paddingTop: 20,
          paddingBottom: 20,
          paddingLeft: 6,
          paddingRight: 6
        }}>
          <Button
            onPress={prev}
            style={{
              width: 100,
              height: 40,
              borderRadius: 20,
              textAlignVertical: 'center',
              backgroundColor:'red',
              color: '#fff'
            }}
          >上一页</Button>
          <Text>第{getPage}页</Text>
          <Button
            onPress={next}
            style={{
              width: 100,
              height: 40,
              borderRadius: 20,
              textAlignVertical: 'center',
              backgroundColor:'red',
              color: '#fff'
            }}
          >下一页</Button>
        </View>
      </SafeAreaView>
    </>
  )
};

export default Fabu;
