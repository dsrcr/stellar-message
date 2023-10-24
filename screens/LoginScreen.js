import { FontAwesome5 } from '@expo/vector-icons';
import { Button, Image } from '@rneui/base';
import { Formik } from 'formik';
import { Text, View, Pressable, KeyboardAvoidingView, TextInput } from 'react-native';

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
  const validationSchema = yup.object().shape({
    email: yup.string().email('Please enter a valid email.').required('Email Address is required.'),
    password: yup.string().min(6).max(24).required('Minimum 6 characters required.'),
  });
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}>
      {({ values, handleSubmit, handleChange, isValid, errors }) => (
        <KeyboardAvoidingView style={tw`flex justify-center items-center p-8`}>
          <Image
            style={tw`w-70 h-70 p-8 pb-4`}
            source={{
              uri: 'https://raw.githubusercontent.com/dsrcr/stellar-message/master/assets/stellarnet_logo.svg?token=GHSAT0AAAAAACJJPOLD6WT5V6YXE2RJP4Y6ZJW2STA',
            }}
          />
          <TextInput
            autoFocus
            id="email"
            inputMode="email"
            style={tw`w-full border-2 border-gray-300 rounded-xl p-4 mt-8`}
            placeholder="E-mail address"
            placeholderTextColor="gray"
            value={values.email}
            onChangeText={handleChange('email')}
            keyboardType="email-address"
            textContentType="emailAddress"
            name="email"
          />
          {errors.email ? <Text style={tw`text-red-500 mt-4`}>{errors.email}</Text> : null}
          <TextInput
            id="password"
            inputMode="text"
            value={values.password}
            onChangeText={handleChange('password')}
            style={tw`w-full border-2 border-gray-300 rounded-xl p-4 mt-8`}
            placeholder="Password"
            placeholderTextColor="gray"
            secureTextEntry
            textContentType="password"
            name="password"
          />

          {errors.password ? <Text style={tw`text-red-500 mt-4`}>{errors.password}</Text> : null}
          <Pressable style={tw`p-4`}>
            <Text>Forgot password?</Text>
          </Pressable>

          <Button
            disabled={!isValid}
            size="lg"
            onPress={handleSubmit}
            title="Login"
            containerStyle={tw`w-full p-4`}
          />

          <Text>or use</Text>
          <View style={tw`flex justify-center items-center flex-row`}>
            <Button
              size="lg"
              containerStyle={tw`p-4 min-w-41`}
              title={<FontAwesome5 name="google" color="white" size={24} />}
            />
            <Button
              size="lg"
              containerStyle={tw`p-4 min-w-41`}
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
