import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button } from 'react-native';

// Load Feed Button

// Youtube Feed From Youtube API
  // Save and show it in ListView
  // Thumbnail, Title, Channel

//let url = 'https://jsonplaceholder.typicode.com/posts'

const Header = () => {

  return (
  <SafeAreaView style={{backgroundColor:'white'}}>  
    <View style={{alignItems:'center', height: 50, backgroundColor: 'white', flexDirection:'row', justifyContent:'center'}}>

      <View style={{flex:1, backgroundColor:'red'}}>
        <Text style={{fontSize:20, fontWeight:'bold', paddingLeft:20, alignSelf:'flex-start'}}>
          YouTube
        </Text>
      </View>
      
      <View style={{flex:1, backgroundColor:'green',}}>
        <TouchableOpacity style={{marginRight:20, alignSelf:'flex-end'}} onPress={() => console.log('search was pressed') }> 
          <Image style={{width:30, height:30}} source={require('./assets/favicon.png')} />
        </TouchableOpacity>
      </View>

    </View>
  </SafeAreaView>
  );
};
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


const DummyListExample = () => {
  return (
    <View>
      <FlatList
        style={{backgroundColor:'black' ,width:'100%'}}
        data={dummyData}
        renderItem={({ item }) => {
          return (
            <View>
                <View style={{ backgroundColor: '#529FF3', margin:10 ,width:400}}>
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

const Feed = () => {

const [listData, setListData] = useState([]);

  const fetchData = () => {

    /*
    fetch(url)
      .then(response => response.json())
      .then(data => {
        let dataResult = [];

        data.forEach(item => {
          let results = {title: item.title, id: item.id};
          dataResult.push(results);
        });
        
        setData(dataResult);
        console.log(dataResult)
      })
        
    fetch(url)
      .then(response => response.json())
      .then(json => {
      //use json result to form data array
      //setData(fetchedDataArray)
        let dataResults = [];
        json.forEach((item) => {
          let results = {title: item.title, id: item.id };
          dataResults.push(results);
        
        });
        setData(dataResults);
        console.log(dataResults)
    });
    */
  };

  const getYouTubeDataWithFetch = async () => {

    const response = await fetch(url);
    const jsonData = await response.json();
    let dataResult = []
    try {
      jsonData.forEach(item => {
        let results = { title: item.title, id: item.id }
        dataResult.push(results)
        console.log(results);

      });
      setListData(dataResult);

    } catch (error) {
      console.log(error)
    }

  };


  return (
    <View>
      <Button title='Load' onPress={getYouTubeDataWithFetch}
      />
      <FlatList
        style={{backgroundColor:'black' ,width:'100%'}}
        data={dummyData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <View>
                <View style={{ backgroundColor: '#529FF3', margin:10 ,width:400}}>
                  <Image
                    source={item.url}
                    style={{ height: 200, width: 400 }}
                  />
                  <Text>
                    {item.title}
                  </Text>
                  <Text>
                    {item.id}
                  </Text>

              </View>
            </View>
          );
        }}
      />
    </View>
  )
}

/*
const NetworkDataExample = () => {
  const [data, setData] = useState([]);

  const fetchData = () => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        // console.log('json results:', json);
        let dataResults = [];
        json.forEach((item) => {
          let result = { title: item.title, id: item.id };
          dataResults.push(result);
        });
        setData(dataResults);
        console.log(dataResults)
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Fetch Data" onPress={fetchData} />

      <FlatList
        data={data}
        renderItem={({ item }) => <Text>{item.title}</Text>}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};
*/


export default function App() {
  return (
    <View style={styles.container}>
      {/*<NetworkDataExample></NetworkDataExample>*/}
      <Header></Header>
      <Feed></Feed>
      {/*<DummyListExample></DummyListExample>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
    width:'100%',
    height:'100%',
  },
});
