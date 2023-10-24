import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { configureStore } from '@reduxjs/toolkit';
import { createTheme } from '@rneui/themed';
import { Provider } from 'react-redux';

import settingsSlice from './features/settingsSlice';
import themeSlice from './features/themeSlice';
import userSlice from './features/userSlice';
import ChatScreen from './screens/ChatScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import MemoryScreen from './screens/MemoryScreen';
import RegisterScreen from './screens/RegisterScreen';

/**
 * App Component
 *
 * The root component of the React Native application. It sets up the navigation structure,
 * global themes, and provides Redux store integration.
 *
 * @returns {JSX.Element} The main application component.
 *
 */
export default function App() {
  const Stack = createNativeStackNavigator();
  const store = configureStore({
    reducer: {
      themeSlice,
      userSlice,
      settingsSlice,
    },
  });

  const theme = createTheme({
    mode: 'dark',
  });

  const globalScreenOptions = {
    headerStyle: { backgroundColor: '#4AA0D5' },
    headerTitleStyle: { color: 'white' },
    headerTintColor: 'white',
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={globalScreenOptions}>
            <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
            <Stack.Screen
              name="Register"
              options={{ headerShown: false }}
              component={RegisterScreen}
            />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Memory" component={MemoryScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
}
