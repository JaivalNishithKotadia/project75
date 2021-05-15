import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  ToastAndroid,
  Alert,
} from "react-native";
import * as firebase from "firebase";

export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: '',
      password: '',
    };
  }
  Login = async (email, password) => {
    if (email && password) {
      try {
        const response = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        if (response) {
          this.props.navigation.navigate('WriteStory');
        }
      } catch (error) {
        switch (error.code) {
          case 'auth/user-not-found':
            alert('User Does Not Exist');
            console.log('User Does Not Exist');

            break;
          case 'auth/invalid-email':
            alert('Incorrect Email');
            console.log('Incorrect Email');

            break;
        }
      }
    } else {
      alert('Enter Email And Password');
    }
  };
  render() {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={{
          flex: 1,
          backgroundColor: '#3C6382',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={styles.container}>
          <Text
            style={{
              fontSize: 35,
              color: 'white',
              marginBottom: 50,
              fontWeight: '600',
            }}>
            BedTime Stories
          </Text>
          <Image
            source={require('../Images/loginimage.png')}
            style={{
              width: 130,
              height: 150,
              justifyContent: 'center',
              alignSelf: 'center',

              borderRadius: 8,
              marginBottom: 13,
            }}
          />
          <View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputForemail}
                placeholder="Email Address "
                placeholderTextColor="#003f5c"
                keyboardType="email-address"
                onChangeText={(text) => this.setState({ emailId: text })}
              />
            </View>

            <View style={styles.inputView}>
              <TextInput
                style={styles.inputForpassword}
                placeholder="Password"
                placeholderTextColor="#003f5c"
                secureTextEntry={true}
                onChangeText={(text) => this.setState({ password: text })}
              />
            </View>
            <View>
              <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => {
                  this.Login(this.state.emailId, this.state.password);
                }}>
                <Text style={styles.loginText}>LOGIN</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3C6382',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    backgroundColor: '#FFC0CB',
    borderRadius: 30,
    width: '120%',
    height: 45,
    marginBottom: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },

  inputForemail: {
    height: 50,
    width: 220,
    flex: 1,
    padding: 10,
    marginLeft: 15,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  inputForpassword: {
    height: 50,
    width: 220,
    flex: 1,
    padding: 10,
    marginLeft: 15,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginLeft: 20,
    backgroundColor: '#FF1493',
  },
  loginText: {
    fontWeight: '1000',
  },
});
