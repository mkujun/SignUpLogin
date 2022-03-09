import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, SafeAreaView, StyleSheet, Text, TextInput, Dimensions } from 'react-native';
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

const signUpValidation = (input) => {
  // Minimum eight characters, at least one letter, one number and one special character
  const re = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g);

  return re.test(input) ? true : false;
}

const FieldInput = ({title, val, setVal}) => {
  return (
    <>
    <Text style={{paddingHorizontal: 20, marginBottom: 5, marginTop: 10}}>{title}</Text>
    <TextInput
      style={styles.fieldInput}
      onChangeText={setVal}
      value={val}
    />
    </>
  )
}

const Password = ({password, setPassword, passwordAsterix, setPasswordAsterix, showPassword, setShowPassword}) => {
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
    <>
    <Text style={{paddingHorizontal: 20, marginBottom: 5, marginTop: 10}}>Password</Text>
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

const RememberMe = () => {
  const [toggle, setToggle] = useState(true);

  const True = () => {
    return <MaterialCommunityIcons name="checkbox-marked-outline" size={25} color="#ee5684"/>
  }

  const False = () => {
    return <MaterialCommunityIcons name="checkbox-blank-outline" size={25}/>
  }

  return (
    <View style={{flexDirection: 'row', padding: 20}}>
      <TouchableOpacity onPress={() => {setToggle(!toggle)}}>
      {toggle ? <True/> : <False/>}
      </TouchableOpacity>
      <Text style={{color: 'black', fontSize:16}}>Remember me?</Text>
    </View>
  )
}

const Login = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAsterix, setPasswordAsterix] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    let prevPass = password;
    let newPass = prevPass.replace(/./g, "*");
    setPasswordAsterix(newPass);
  }, [password])

  const login = () => {}

  const signUp = () => {
    navigation.pop();
  }

  return (
    <>
    <Text style={{padding: 20, marginBottom: 10, fontSize: 18, fontWeight: 'bold', color: 'black'}}>LOGIN</Text>
    <View style={{flex: 1}}>
      <FieldInput title="Email" val={email} setVal={setEmail} />
      <Password password={password} setPassword={setPassword}
        passwordAsterix={passwordAsterix} setPasswordAsterix={setPasswordAsterix}
        showPassword={showPassword} setShowPassword={setShowPassword}
      />
      <RememberMe />
      <PinkButton buttonAction={login} title={"LOGIN"}/>
      <ForgotPassword />
      <SocialMedia />
      <View style={{flexDirection: 'row', justifyContent: 'center', padding: 10}}>
        <Text>Need an account?</Text>
        <GoToScreen goTo={signUp} title={"SIGN UP"} />
      </View>
    </View>
    </>
  )
}

const ForgotPassword = () => {
  return (
    <TouchableOpacity style={{alignItems: 'flex-end', paddingRight: 20, paddingBottom: 20}}>
      <Text>Forgot Password?</Text>
    </TouchableOpacity>
  )
}

const PinkButton = ({buttonAction, title, page}) => {
  title = page === 3 ? "SIGN UP" : "NEXT"

  return (
    <TouchableOpacity style={styles.signUpButton} onPress={buttonAction}>
      <Text style={styles.signUpButtonText}>{title}</Text>
    </TouchableOpacity>
  )
}

const SocialMedia = () => {
  return (
    <>
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
    </>
  )
}

const GoToScreen = ({goTo, title}) => {
  return (
    <TouchableOpacity onPress={goTo}>
      <Text style={{borderBottomWidth: 1, marginLeft: 5}}>{title}</Text>
    </TouchableOpacity>
  )
}

const Number = ({title, page}) => {
  let numberColor = page == title ? '#ee5684' : 'gray';

  return (
    <View style={[styles.circle, {backgroundColor: numberColor}]}>
      <Text style={{color: 'white', fontWeight: 'bold'}}>{title}</Text>
    </View>
  )
}

const NumberSelector = ({page}) => {
  return (
    <View style={styles.numbersRow}>
      <Number title={"1"} page={page}/>
      <View style={styles.circleDelimiter}/>
      <Number title={"2"} page={page}/>
      <View style={styles.circleDelimiter}/>
      <Number title={"3"} page={page}/>
    </View>
  )
}

const RenderPage = ({contact, setContact, location, setLocation, page, email, setEmail, passwordAsterix, setPasswordAsterix, showPassword, setShowPassword, password, setPassword, passwordValid, setPasswordValid, education, setEducation, jobTitle, setJobTitle, organization, setOrganization, yearsOfExperience, setYearsOfExperience}) => {
  if (page == 1) {
    return (
      <>
      <FieldInput title="Email" val={email} setVal={setEmail} />
      <Password password={password} setPassword={setPassword}
        passwordAsterix={passwordAsterix} setPasswordAsterix={setPasswordAsterix}
        showPassword={showPassword} setShowPassword={setShowPassword}
      />
      <View style={{alignItems: 'center', paddingHorizontal: 20, paddingTop: 10}}>
        {passwordValid === true ? <Text style={{color: 'black'}}>Must be 8 or more characters and contain at least 1 number and 1 special character</Text>
        : <Text style={{color: 'red'}}>Must be 8 or more characters and contain at least 1 number and 1 special character</Text>
        }
      </View>
      </>
    )
  }
  else if (page == 2) {
    return (
      <>
      <FieldInput title="Contact" val={contact} setVal={setContact} />
      <FieldInput title="Location" val={location} setVal={setLocation} />
      </>
    )
  }
  else if (page == 3) {
    return (
      <>
      <FieldInput title="Education" val={education} setVal={setEducation} />
      <FieldInput title="Job Title" val={jobTitle} setVal={setJobTitle} />
      <FieldInput title="Organization" val={organization} setVal={setOrganization} />
      <FieldInput title="Years of Experience" val={yearsOfExperience} setVal={setYearsOfExperience} />
      </>
    )
  }
}

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAsterix, setPasswordAsterix] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValid, setPasswordValid] = useState(true);
  const [page, setPage] = useState(1);
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");
  const [education, setEducation] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [organization, setOrganization] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");

  useEffect(() => {
    let prevPass = password;
    let newPass = prevPass.replace(/./g, "*");
    setPasswordAsterix(newPass);

    const valid = signUpValidation(password);

    if (password.length > 0) {
      valid ? setPasswordValid(true) : setPasswordValid(false);
    }
  }, [password])


  const signUp = () => {
    let currentPage = page;
    
    if (currentPage < 3) {
      currentPage++;
      setPage(currentPage);
    }
  }

  const back = () => {
    let currentPage = page;

    if (currentPage > 1) {
      currentPage--;
      setPage(currentPage);
    }
  }

  const login = () => {
    navigation.navigate("Login");
  }

  const NextPage = () => {
    if (page === 2 || page === 3) {
      return (
      <TouchableOpacity onPress={back}>
        <Text style={{borderBottomWidth: 1, alignSelf: 'center', marginBottom: 20, color: '#ee5684', borderBottomColor: '#ee5684'}}>{"Back"}</Text>
      </TouchableOpacity>
      )
    }
    else {
      return null;
    }
  }

  return (
    <SafeAreaView>
      <Text style={{padding: 20, marginBottom: 10, fontSize: 18, fontWeight: 'bold', color: 'black'}}>SIGN UP</Text>
      <NumberSelector page={page}/>
      <RenderPage 
        page={page} email={email} setEmail={setEmail}
        passwordAsterix={passwordAsterix} setPasswordAsterix={setPasswordAsterix}
        showPassword={showPassword} setShowPassword={setShowPassword}
        password={password} setPassword={setPassword}
        passwordValid={passwordValid} setPasswordValid={setPasswordValid}
        yearsOfExperience={yearsOfExperience} setYearsOfExperience={setYearsOfExperience}
        education={education} setEducation={setEducation}
        organization={organization} setOrganization={setOrganization}
        contact={contact} setContact={setContact}
        location={location} setLocation={setLocation}
        jobTitle={jobTitle} setJobTitle={setJobTitle}
      />
      <PinkButton buttonAction={signUp} title={"NEXT"} page={page}/>
      <NextPage />
      <SocialMedia />
      <View style={{flexDirection: 'row', justifyContent: 'center', padding: 10}}>
        <Text>Already a user?</Text>
        <GoToScreen goTo={login} title={"LOGIN"} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  circle: {
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    width: Dimensions.get('window').width * 0.08,
    height: Dimensions.get('window').width * 0.08,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circleDelimiter: {
    flex: 1, 
    borderBottomColor: '#ee5684', 
    borderBottomWidth: 0.5, 
    marginHorizontal: 10,
    marginBottom: 15
  },
  numbersRow: {
    flexDirection: 'row', 
    marginHorizontal: 20,
    paddingVertical: 10, 
    marginBottom: 10
  },
  fieldInput: {
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
