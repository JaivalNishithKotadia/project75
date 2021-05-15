import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ToastAndroid,
  Alert,
} from 'react-native';
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
} from 'react-native-safe-area-context';
import { Header } from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';

export default class WriteStoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      author: '',
    };
  }
  submitStory = () => {
    db.collection('Stories').add({
      title: this.state.title,
      author: this.state.author,
      content: this.state.content,
    });
    //ToastAndroid.show('Submitted', ToastAndroid.SHORT);

   
    Alert.alert('Submitted');
  };

  render() {
    return (
      <SafeAreaProvider>
        <Header
          centerComponent={{
            text: 'BedTime Stories',
            style: { color: 'black', fontWeight: 'bold', fontSize: 20 },
          }}
          containerStyle={{
            backgroundColor: 'pink',
            marginTop: 20,
            height: 60,
          }}
        />
        <KeyboardAvoidingView behavior="padding">
          <TextInput
            placeholder="Story Title"
            style={{
              borderWidth: 2,
              margin: 10,
              height: 50,
              textAlign: 'center',
              fontSize: 15,
              fontWeight: 'bold',
            }}
            onChangeText={(titletext) => {
              this.setState({ title: titletext });
            }}
          />
          <TextInput
            placeholder="Author"
            style={{
              borderWidth: 2,
              margin: 10,
              height: 50,
              textAlign: 'center',
              fontSize: 15,
              fontWeight: 'bold',
            }}
            onChangeText={(authorText) => {
              this.setState({ author: authorText });
            }}
          />
          <TextInput
            placeholder="Write Your Story"
            multiline={true}
            style={{
              borderWidth: 2,
              margin: 10,
              height: 250,
              fontSize: 15,
              fontWeight: 'bold',
            }}
            onChangeText={(contentText) => {
              this.setState({ content: contentText });
            }}
          />

          <View
            style={{
              backgroundColor: 'pink',
              margin: 70,
              height: 50,
              borderRadius: 15,
            }}>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                alignContent: 'center',
                backgroundColor: 'pink',
              }}
              onPress={async()=>{
                 this.submitStory();
                 this.setState({author:'',title:'',content:''})
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                  alignSelf: 'center',
                  marginTop: 13,
                }}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    );
  }
}
