import React from 'react';
import { View, TouchableOpacity, SafeAreaView, StyleSheet, Text, TextInput } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const App = () => {
  return (
    <SafeAreaView>
      <SignUp />
    </SafeAreaView>
  )
}

const SignUp = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordAsterix, setPasswordAsterix] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  /*
  React.useEffect(() => {
    //console.log("email", email);
  }, [email])
  */

  React.useEffect(() => {
    let prevPass = password;
    let newPass = prevPass.replace(/./g, "*");
    setPasswordAsterix(newPass);
  }, [password])

  React.useEffect(() => {
    console.log("passwordAsterix", passwordAsterix);
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

  return (
    <SafeAreaView>
      <Text style={{padding: 20, fontWeight: 'bold', color: 'black'}}>SIGN UP</Text>
      <Text style={{padding: 20}}>Email</Text>
      <TextInput
        style={styles.emailInput}
        onChangeText={setEmail}
        value={email}
      />
      <Text style={{padding: 20}}>Password</Text>
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

      <TouchableOpacity style={styles.signUpButton} onPress={() => {signUp()}}>
        <Text style={styles.signUpButtonText}>SIGN UP</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  emailInput: {
    padding: 20,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 20
  },
  signUpButton: {
    padding: 20,
    margin: 20,
    borderRadius: 10,
    borderColor: 'red',
    borderWidth: 1,
    backgroundColor: 'red'
  },
  signUpButtonText: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold'
  },
  passwordInput: {
    padding: 20,
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
