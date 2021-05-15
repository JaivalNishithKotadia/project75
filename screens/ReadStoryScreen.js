import { SearchBar, Header } from 'react-native-elements';
import * as React from 'react';
import db from '../config';
import firebase from 'firebase';
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
} from 'react-native-safe-area-context';
import {
  Text,
  FlatList,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allStories: [],
      dataSourceList:[],
      search: '',
    };
  }
  componentDidMount() {
    this.retrieveStories();
  }
  retrieveStories = async () => {
    var allStories = [];
    var stories = await db
      .collection('Stories')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          allStories.push(doc.data());
        });
        this.setState({
          allStories,
        });
      });
  };

  
 searchFilterFunction(text) {
    this.setState({
        value: text,
      });
    //passing the inserted text in textinput
    const newData = this.state.allStories.filter((item)=> {
      //applying filter for the inserted text in search bar
      const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      dataSourceList: newData,
      search: text,
    });
  }
  render() {
    const { search } = this.state;
    return (
      <View
        style={{
          backgroundColor: 'grey',
          borderRadius: 10,
          borderBottomRightRadius: 0,
          borderTopLeftRadius: 10,
          marginTop:50
        }}>
        <SafeAreaProvider>
          <Header
            centerComponent={{
              text: 'BedTime Stories',
              style: { color: 'black', fontWeight: 'bold', fontSize: 20 },
            }}
            containerStyle={{
              backgroundColor: 'pink',
              borderRadius: 10,
              height: 60,
            }}
          />
        </SafeAreaProvider>
        <View style={styles.searchBar}>
          <SearchBar
            
            placeholder="Enter Title"
            onChangeText={(search) => {
              this.searchFilterFunction(search)
            }}
            value={this.state.value}
          />
         
        </View>
        <FlatList
          data={this.state.allStories}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={{ fontSize: 20, fontWeight: '900', marginLeft: 5 }}>
                Title: {item.title}
              </Text>
              <Text style={{ fontSize: 12, fontWeight: '700', marginLeft: 5 }}>
                Author: {item.author}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  itemContainer: {
    height: 80,
    width: '100%',
    borderWidth: 5,
    borderColor: 'pink',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    alignSelf: 'stretch',
    margin: 8,
  },
 
  
  searchButton: {
    borderWidth: 1,
    height: 30,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
});
