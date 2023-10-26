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
import { useState, createContext, useContext, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebaseConfig';
import { ActivityIndicator } from 'react-native';

import './services/i18next';

/**
 * App Component
 *
 * The root component of the React Native application. It sets up the navigation structure,
 * global themes, and provides Redux store integration.
 *
 * @returns {JSX.Element} The main application component.
 *
 */

const Stack = createNativeStackNavigator();
const globalScreenOptions = {
  headerStyle: { backgroundColor: '#4AA0D5' },
  headerTitleStyle: { color: 'white' },
  headerTintColor: 'white',
};
const AuthenticatedUserContext = createContext({});
const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

function AuthNavigationStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="Memory" component={MemoryScreen} />
    </Stack.Navigator>
  );
}
function NavigationStack() {
  return (
    <Stack.Navigator screenOptions={globalScreenOptions}>
      <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" options={{ headerShown: false }} component={RegisterScreen} />
    </Stack.Navigator>
  );
}

function Navigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authenticatedUser) => {
      authenticatedUser ? setUser(authenticatedUser) : setUser(null);
      setLoading(false);
    });
    console.log('User', user);
    return () => unsubscribe();
  }, []);

  if (loading) {
    <ActivityIndicator size={'large'} />;
  }

  return (
    <NavigationContainer>
      {user ? <AuthNavigationStack /> : <NavigationStack />}
    </NavigationContainer>
  );
}

export default function App() {
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

  return (
    <AuthenticatedUserProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Navigator />
        </ThemeProvider>
      </Provider>
    </AuthenticatedUserProvider>
  );
}
