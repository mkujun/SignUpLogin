import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, SafeAreaView, StyleSheet, Text, TextInput } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="Login" component={Login}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const Stack = createNativeStackNavigator();

const Email = ({email, setEmail}) => {
  return (
    <>
    <Text style={{paddingHorizontal: 20, marginBottom: 5}}>Email</Text>
    <TextInput
      style={styles.emailInput}
      onChangeText={setEmail}
      value={email}
    />
    </>
  )
}

const Password = ({password, setPassword, passwordAsterix, setPasswordAsterix, showPassword, setShowPassword, changePass}) => {
  return (
    <>
    <Text style={{paddingHorizontal: 20, marginBottom: 5, marginTop: 20}}>Password</Text>
    <View style={styles.passwordInputRow}>
      <TextInput
        style={styles.passwordInput}
        autoCorrect={false}
        value={password}
        onKeyPress={changePass}
        value={showPassword ? password : passwordAsterix}
      />
      <TouchableOpacity style={{alignSelf: 'center', padding:10}} onPress={() => { setShowPassword(!showPassword)}}>
        <MaterialCommunityIcons name={"eye-off"} size={20}/>
      </TouchableOpacity>
    </View>
    </>
  )
}

const Login = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = React.useState("");
  const [passwordAsterix, setPasswordAsterix] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  useEffect(() => {
    let prevPass = password;
    let newPass = prevPass.replace(/./g, "*");
    setPasswordAsterix(newPass);
    console.log("SignUP password", password);
  }, [password])

  useEffect(() => {
    console.log("login email change", email);
  }, [email])

  useEffect(() => {
    console.log("login password change", password);
  }, [password])

  const changePass = ({nativeEvent: {key: keyValue}}) => {
    let temp;

    if (keyValue === "Backspace") {
      temp = password.slice(0,-1);
    }
    else {
      temp = password + keyValue;
    }

    setPassword(temp);
  }

  const login = () => {
    console.log("login()");
  }

  return (
    <>
    <Text style={{padding: 20, marginBottom: 10, fontSize: 18, fontWeight: 'bold', color: 'black'}}>LOGIN</Text>
    <View style={{flex: 1}}>
      <Email email={email} setEmail={setEmail}/>
      <Password password={password} setPassword={setPassword}
        passwordAsterix={passwordAsterix} setPasswordAsterix={setPasswordAsterix}
        showPassword={showPassword} setShowPassword={setShowPassword}
        changePass={changePass}
      />
      <PinkButton buttonAction={login} title={"LOGIN"}/>
    </View>
    </>
  )
}

const PinkButton = ({buttonAction, title}) => {
  return (
    <TouchableOpacity style={styles.signUpButton} onPress={buttonAction}>
      <Text style={styles.signUpButtonText}>{title}</Text>
    </TouchableOpacity>
  )
}

const SignUp = ({navigation}) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordAsterix, setPasswordAsterix] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  useEffect(() => {
    console.log("signup email", email);
  }, [email])

  useEffect(() => {
    let prevPass = password;
    let newPass = prevPass.replace(/./g, "*");
    setPasswordAsterix(newPass);
    console.log("SignUP password", password);
  }, [password])

  useEffect(() => {
    console.log("signup passwordAsterix", passwordAsterix);
  }, [passwordAsterix])


  const signUp = () => {
    console.log("signUp()");
  }

  const changePass = ({nativeEvent: {key: keyValue}}) => {
    let temp;

    if (keyValue === "Backspace") {
      temp = password.slice(0,-1);
    }
    else {
      temp = password + keyValue;
    }

    setPassword(temp);
  }

  const login = () => {
    console.log("login()");
    navigation.navigate("Login");
  }


  return (
    <SafeAreaView>
      <Text style={{padding: 20, marginBottom: 10, fontSize: 18, fontWeight: 'bold', color: 'black'}}>SIGN UP</Text>
      <Email email={email} setEmail={setEmail}/>
      <Password password={password} setPassword={setPassword}
        passwordAsterix={passwordAsterix} setPasswordAsterix={setPasswordAsterix}
        showPassword={showPassword} setShowPassword={setShowPassword}
        changePass={changePass}
      />
      <PinkButton buttonAction={signUp} title={"SIGN UP"}/>

      <View style={{flexDirection: 'row', marginHorizontal: 20}}>
        <View style={{flex: 1, borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 15}}/>
        <View style={{borderWidth: 1, borderRadius: 5}}>
          <Text style={{alignSelf: 'center', padding: 5}}>OR</Text>
        </View>
        <View style={{flex: 1, borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 15}}/>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
        <MaterialCommunityIcons name={"google"} size={25} style={{padding: 5}} color={"red"}/>
        <MaterialCommunityIcons name={"facebook"} size={25} style={{padding: 5}} color={"blue"}/>
        <MaterialCommunityIcons name={"linkedin"} size={25} style={{padding: 5}}color={"blue"}/>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'center', padding: 10}}>
        <Text>Already a user?</Text>
        <TouchableOpacity onPress={() => login()}>
          <Text style={{borderBottomWidth: 1, marginLeft: 5}}>LOGIN</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  emailInput: {
    paddingHorizontal: 15,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 20
  },
  signUpButton: {
    padding: 10,
    margin: 20,
    borderRadius: 10,
    borderColor: '#ee5684',
    borderWidth: 1,
    backgroundColor: '#ee5684'
  },
  signUpButtonText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  passwordInput: {
    paddingHorizontal: 15,
    flex: 1
  },
  passwordInputRow: {
    flexDirection: 'row',
    borderColor: 'gray',
    marginHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'space-around'
  }
});

export default App;
