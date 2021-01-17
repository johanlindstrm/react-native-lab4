import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button } from 'react-native';

const dummyData = [
  {id:1, channel:'youtuber', title:'First Title', url:require('./assets/icon.png')},
  {id:2, channel:'youtuber', title:'Second Title', url:require('./assets/icon.png')},
  {id:3, channel:'youtuber', title:'Third Title', url:require('./assets/icon.png')},
  {id:4, channel:'youtuber', title:'Forth Title', url:require('./assets/icon.png')},
  {id:5, channel:'youtuber', title:'Fifth Title', url:require('./assets/icon.png')},
  {id:6, channel:'youtuber', title:'Sixth Title', url:require('./assets/icon.png')},
  {id:7, channel:'youtuber', title:'Seventh Title', url:require('./assets/icon.png')},
]

const DummyListExample = () => {
  return (
    <View>
      <FlatList
        style={{backgroundColor:'black' ,width:'100%'}}
        data={dummyData}
        renderItem={({ item }) => {
          return (
            <View>
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

let url = 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=20&key=AIzaSyC0U9QWdWNITVbiO5NrgnkKPqMc1rxt4eI'

const search = require("./assets/search.png")
const close = require("./assets/close.png")
const confirm = require("./assets/confirm.png")

const Header = ({setFilterKeyWord}) => {
  const [searching, setSearching] = useState(false);
  return (
  <SafeAreaView>  
    {searching ? <SearchHeader setSearching={setSearching} searching={searching} setFilterKeyWord={setFilterKeyWord} /> 
    : <DefaultHeader setSearching={setSearching} searching={searching}/>}
  </SafeAreaView>
  );
};

const DefaultHeader = ({setSearching, searching}) => {
  return (
    <View style={styles.headerView}>

    <View style={{flex:1}}>
      <Text style={{...styles.rightIconContainer, fontSize:20, fontWeight:'bold'}}>
        YouTube
      </Text>
    </View>
    
    <View style={{flex:1}}>
      <TouchableOpacity style={styles.leftIconContainer} onPress={() => {setSearching(!searching);}}> 
        <Image style={{width:30, height:30}} source={search} />
      </TouchableOpacity>
    </View>

  </View>
  )
}

const SearchHeader = ({setSearching, searching, setFilterKeyWord}) => {

  let keyword = ""

  const handleChangeText = (value) => {
    keyword = value
  }
  
  const filterData = () => {
    setFilterKeyWord(keyword);
  };

  const resetFilterData = () => {
    setFilterKeyWord("");
  }

  return(
    <View style={styles.headerView}>
      
      <View style={{flex:1}}>
        <TouchableOpacity style={styles.rightIconContainer} onPress={() => {{setSearching(!searching); resetFilterData()}}}> 
          <Image style={{width:15, height:15}} source={close} />
        </TouchableOpacity>
      </View>

      <View style={{flex:1}}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="always"
          onChangeText={handleChangeText}
          placeholder="Search"
          style={styles.inputStyle}
          />
      </View>

      <View style={{flex:1}}>
        <TouchableOpacity style={styles.leftIconContainer} onPress={() => {filterData()}}> 
          <Image style={{width:30, height:30}} source={confirm} />
        </TouchableOpacity>
      </View>

    </View>
  )
}

const YoutubeListFeed = ({listData, setListData, filterKeyWord}) => {
  const [isVisible, setIsVisible] = useState(true)

    const fetchData = () => {
      fetch(url) // Fetch data from a url
        .then((response) => response.json()) // Recieve a response and convert it in json format
        .then((json) => { // Read the respone 
          // Handle the response data recieved from the fetch
          let dataResults = [];
          json.items.forEach((item) => {
            // Loop through the data getting titles, channels and thumbnails
            let result = { title: item.snippet.title, channel: item.snippet.channelTitle, imageUrl: item.snippet.thumbnails.standard.url };
            // Push the results with {title: *, channel: *, url: *} to our array then..
            dataResults.push(result);
          });
            // ..update the useState function for setting our listData with the results pushed earlier
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
        data={listData.filter((item) => item.title.includes(filterKeyWord))}
        renderItem={({ item }) => {
          return (
            <View style={{width:'100%', paddingBottom:10}}>
              <Image source={{uri: item.imageUrl}} style={{ height: 240, width: '100%', marginBottom:10 }} />
              <Text style={styles.titleText} >{item.title}</Text>
              <Text style={styles.channelText} >{item.channel}</Text>
            </View>
          );
        }}
        keyExtractor={(item) => item.title.toString()}

      />
    </View>
  )
}

export default function App() {
  const [listData, setListData] = useState([]);
  const [filterKeyWord, setFilterKeyWord] = useState(""); 

  return ( // passing 
    <View style={styles.container}>
      <Header listData={listData} setListData={setListData} setFilterKeyWord={setFilterKeyWord} />
      <YoutubeListFeed listData={listData} setListData={setListData} filterKeyWord={filterKeyWord}  />
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

  headerView: {
    alignItems:'center', 
    height: 50, 
    flexDirection:'row', 
    justifyContent:'center'
  },

  channelText: {
    paddingLeft: 5,
    color:'#808080',

  },

  titleText: {
    paddingLeft: 5, 
    fontWeight:'bold',
  },

  inputStyle: {
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 10, 
    paddingVertical:10, 
    borderRadius:5
  },

  rightIconContainer: {
    paddingLeft:20, 
    alignSelf:'flex-start'
  },

  leftIconContainer: {
    marginRight:20, 
    alignSelf:'flex-end'
  },
});
