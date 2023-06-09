import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default Registrationscreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [focused, setFocused] = useState("");
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };

  const handlePhotoAdd = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log("photo");
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <ImageBackground
          source={require("../images/registration/bg_photo.jpg")}
          style={styles.imageBackground}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.formContainer,
                paddingBottom: isShowKeyboard ? 0 : 78,
              }}
            >
              <View style={styles.profilePhoto}>
                <TouchableOpacity
                  onPress={() => {
                    handlePhotoAdd();
                  }}
                >
                  <Image
                    source={require("../images/icons/add.png")}
                    style={styles.addIcon}
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.title}>Реєстрація</Text>

              <View style={{ marginBottom: 16 }}>
                <TextInput
                  placeholder='Логін'
                  value={state.login}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    Keyboard.isVisible();
                    setFocused("login");
                  }}
                  style={{
                    ...styles.input,
                    borderColor: focused === "login" ? "#FF6C00" : "#E8E8E8",
                  }}
                  onBlur={() => setFocused("")}
                  onChangeText={(value) => {
                    setState((prevState) => ({ ...prevState, login: value }));
                    Keyboard.isVisible();
                  }}
                />
              </View>
              <View style={{ marginBottom: 16 }}>
                <TextInput
                  placeholder='Адреса електронної пошти'
                  value={state.email}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setFocused("email");
                  }}
                  style={{
                    ...styles.input,
                    borderColor: focused === "email" ? "#FF6C00" : "#E8E8E8",
                  }}
                  onBlur={() => setFocused("")}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                />
              </View>
              <View style={{ marginBottom: 0 }}>
                <TextInput
                  placeholder='Пароль'
                  value={state.password}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setFocused("password");
                  }}
                  style={{
                    ...styles.input,
                    borderColor: focused === "password" ? "#FF6C00" : "#E8E8E8",
                  }}
                  onBlur={() => setFocused("false")}
                  secureTextEntry={isSecureEntry}
                  onChangeText={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      password: value,
                    }))
                  }
                />
                <TouchableOpacity
                  style={styles.passwordTextWrapper}
                  onPress={() => {
                    setIsSecureEntry((prevState) => !prevState);
                  }}
                >
                  <Text style={styles.passwordText}>
                    {isSecureEntry ? "Показати" : "Приховати"}
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.btn}
                onPress={() => {
                  handleSubmit();
                  navigation.navigate("Home");
                }}
              >
                <Text style={styles.btnTitle}>Зареєструватися</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.signinText}>Уже є аккаунт? Увійти</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  formContainer: {
    paddingTop: 92,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  profilePhoto: {
    flex: 1,
    width: 120,
    height: 120,
    position: "absolute",
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    left: "35%",
    top: "-15%",
  },
  addIcon: {
    position: "absolute",
    left: "90%",
    bottom: -100,
    width: 25,
    height: 25,
  },
  title: {
    fontFamily: "Roboto-Regular",
    textAlign: "center",
    fontWeight: 500,
    fontSize: 30,
    marginBottom: 33,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    height: 50,
    color: "#212121",
    backgroundColor: "#F6F6F6",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    padding: 16,
  },
  passwordTextWrapper: {
    position: "absolute",
    top: "30%",
    left: "75%",
  },
  passwordText: {
    color: "#1B4371",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    lineHeight: 19,
  },
  btn: {
    height: 50,
    marginHorizontal: 16,
    marginTop: 43,
    marginBottom: 16,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
  },
  btnTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  signinText: {
    color: "#1B4371",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    textAlign: "center",
  },
});
