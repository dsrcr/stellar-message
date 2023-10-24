import { FontAwesome5 } from '@expo/vector-icons';
import { Button, Image, Input } from '@rneui/base';
import { Formik } from 'formik';
import { useState } from 'react';
import { Text, View, Pressable, KeyboardAvoidingView } from 'react-native';
import tw from 'twrnc';
import * as yup from 'yup';

/**
 * LoginScreen Component
 *
 * The component responsible for rendering the login screen of the application.
 * It includes input fields for email and password, a "Login" button, and options
 * for password recovery and social login.
 *
 * @param {object} navigation - The navigation prop for navigating between screens.
 *
 * @returns {JSX.Element} The login screen component.
 *
 */
export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const validationSchema = yup.object().shape({
    email: yup.string().email('Please enter a valid email').required('Email Address is required'),
  });
  return (
    <Formik
      initialValues={{}}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}>
      {({ handleSubmit, errors }) => (
        <KeyboardAvoidingView style={tw`items-center flex-1 justify-center p-8`}>
          <Image
            style={tw`w-70 h-70 p-2 pb-4`}
            source={{
              uri: 'https://raw.githubusercontent.com/dsrcr/stellar-message/master/assets/stellarnet_logo.svg?token=GHSAT0AAAAAACJJPOLD6WT5V6YXE2RJP4Y6ZJW2STA',
            }}
          />
          <Input
            required
            keyboardType="email-address"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            style={tw`pt-8`}
            autoComplete="email"
            placeholder="E-mail Address"
          />
          <Input
            id="password"
            name="password"
            style={tw`pt-4`}
            secureTextEntry
            placeholder="Password"
          />

          <Pressable style={tw`p-4`}>
            <Text>Forgot password?</Text>
          </Pressable>

          <Button onPress={handleSubmit} title="Login" containerStyle={tw`m-4 p-4 w-80`} />

          <Text>or use</Text>
          <View style={tw`flex-row items-center p-2`}>
            <Button
              containerStyle={tw`m-4 p-4 w-40`}
              title={<FontAwesome5 name="google" color="white" size={24} />}
            />
            <Button
              containerStyle={tw`m-4 p-4 w-40`}
              title={<FontAwesome5 name="apple" color="white" size={24} />}
            />
          </View>

          <View style={tw`flex-row`}>
            <Text>Don't have an account? </Text>
            <Pressable onPress={() => navigation.navigate('Register')}>
              <Text>Register</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
}
