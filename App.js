import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';

// Load Feed Button

// Youtube Feed From Youtube API
  // Save and show it in ListView
  // Thumbnail, Title, Channel

//let url = 'https://jsonplaceholder.typicode.com/posts'

const Header = () => {

  return (
  <SafeAreaView style={{backgroundColor:'white'}}>  
    <View style={{ height: 50, backgroundColor: 'white', flexDirection:'row'}}>

      <View style={{flex:1, backgroundColor:'red'}}>
        <Text style={{fontSize:20, fontWeight:'bold', paddingLeft:20}}>
          YouTube
        </Text>
      </View>

      <View>
        <TextInput style={{flex:1, backgroundColor:'lightgray',width:100}}

        />
      </View>
      
      <View>
        <TouchableOpacity style={{flex:1, backgroundColor:'green', width:30, height:30}}
        />
      </View>
    </View>
  </SafeAreaView>
  );
};
let url = 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=20&key=AIzaSyC0U9QWdWNITVbiO5NrgnkKPqMc1rxt4eI'

const dummyData = [
  {id:1, title:'First Title', url:require('./assets/icon.png')},
  {id:2, title:'Second Title', url:require('./assets/icon.png')},
  {id:3, title:'Third Title', url:require('./assets/icon.png')},
  {id:4, title:'Forth Title', url:require('./assets/icon.png')},
  {id:5, title:'Fifth Title', url:require('./assets/icon.png')},
  {id:6, title:'Sixth Title', url:require('./assets/icon.png')},
  {id:7, title:'Seventh Title', url:require('./assets/icon.png')},
]


const DummyListExample = () => {
  return (
    <View>
      <FlatList
        style={{backgroundColor:'yellow' ,width:'100%'}}
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
                    {item.url}
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
      <DummyListExample></DummyListExample>
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
