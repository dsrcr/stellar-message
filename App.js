import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import themeSlice from "./features/themeSlice";
import userSlice from "./features/userSlice";
import settingsSlice from "./features/settingsSlice";
import LoginScreen from "./screens/LoginScreen";
import ChatScreen from "./screens/ChatScreen";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import MemoryScreen from "./screens/MemoryScreen";

export default function App() {
  const Stack = createNativeStackNavigator();
  const store = configureStore({
    reducer: {
      themeSlice,
      userSlice,
      settingsSlice,
    },
  });
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Memory" component={MemoryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
