import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button } from 'react-native';

// Load Feed Button

// Youtube Feed From Youtube API
  // Save and show it in ListView
  // Thumbnail, Title, Channel

//let url = 'https://jsonplaceholder.typicode.com/posts'

let url = 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=20&key=AIzaSyC0U9QWdWNITVbiO5NrgnkKPqMc1rxt4eI'

const dummyData = [
  {id:1, channel:'youtuber', title:'First Title', url:require('./assets/icon.png')},
  {id:2, channel:'youtuber', title:'Second Title', url:require('./assets/icon.png')},
  {id:3, channel:'youtuber', title:'Third Title', url:require('./assets/icon.png')},
  {id:4, channel:'youtuber', title:'Forth Title', url:require('./assets/icon.png')},
  {id:5, channel:'youtuber', title:'Fifth Title', url:require('./assets/icon.png')},
  {id:6, channel:'youtuber', title:'Sixth Title', url:require('./assets/icon.png')},
  {id:7, channel:'youtuber', title:'Seventh Title', url:require('./assets/icon.png')},
]


const search = require("./assets/search.png")
const close = require("./assets/close.png")
const confirm = require("./assets/confirm.png")

const Header = () => {

  return (
  <SafeAreaView style={{backgroundColor:'white'}}>  
    <View style={{alignItems:'center', height: 50, flexDirection:'row', justifyContent:'center'}}>

      <View style={{flex:1}}>
        <Text style={{fontSize:20, fontWeight:'bold', paddingLeft:20, alignSelf:'flex-start'}}>
          YouTube
        </Text>
      </View>
      
      <View style={{flex:1}}>
        <TouchableOpacity style={{marginRight:20, alignSelf:'flex-end'}} onPress={() => console.log('search was pressed') }> 
          <Image style={{width:30, height:30}} source={search} />
        </TouchableOpacity>
      </View>

    </View>
  </SafeAreaView>
  );
};


const DummyListExample = () => {
  return (
    <View>
      <FlatList
        style={{backgroundColor:'black' ,width:'100%'}}
        data={dummyData}
        renderItem={({ item }) => {
          return (
            <View style={styles.videoView}>
                <View style={{ backgroundColor: '#529FF3', margin:10 ,width:'100%'}}>
                <Image
                    source={item.url}
                    style={{ height: 200, width: 400 }}
                  />
                  <Text>
                    {item.title}
                  </Text>
                  <Text>
                    {item.channel}
                  </Text>

              </View>
            </View>
          );
        }}
      />
    </View>
  )
}

const YoutubeListFeed = () => {

const [listData, setListData] = useState([]);
const [isVisible, setIsVisible] = useState(true)

    const fetchData = () => {
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          let dataResults = [];
          json.items.forEach((item) => {
            let result = { title: item.snippet.title, channel: item.snippet.channelTitle, imageUrl: item.snippet.thumbnails.standard.url };
            dataResults.push(result);
          });
          setListData(dataResults);
        });
    };
  
  return (
    <View>
      {isVisible ? (<Button title="Fetch Data" onPress={() => {
        fetchData();
        setIsVisible(!isVisible);
      }}/>) : null}

      <FlatList
        style={{width:'100%'}}
        data={listData}
        renderItem={({ item }) => {
          return (
            <View style={{width:'100%', paddingBottom:10}}>
              <Image source={{uri: item.imageUrl}} style={{ height: 200, width: '100%', marginBottom:10 }} />
              <Text style={{paddingLeft: 5, fontWeight:'bold'}} >{item.title}</Text>
              <Text style={{paddingLeft: 5, color:'#808080'}} >{item.channel}</Text>
            </View>
          );
        }}
        keyExtractor={(item) => item.title.toString()}

      />
    </View>
  )
}

export default function App() {
  return (
    <View style={styles.container}>
      <Header></Header>
      <YoutubeListFeed />
      {/*<DummyListExample></DummyListExample>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width:'100%',
    height:'100%',
  },

  videoView: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: "flex-start",
    marginBottom: 25,
  },
});
