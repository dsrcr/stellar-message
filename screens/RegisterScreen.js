import { Button } from '@rneui/base';
import { Formik } from 'formik';
import { Text, View, Pressable, KeyboardAvoidingView, TextInput } from 'react-native';

import tw from 'twrnc';
import * as yup from 'yup';

/**
 * RegisterScreen component for user registration.
 *
 * This component renders a registration form that allows users to input their email, password,
 * and confirm password. It uses Formik for form management and validation, along with several
 * UI components such as TextInput, Button, Text, and View.
 *
 * @param {Object} navigation - React Navigation object for navigating between screens.
 *
 * @returns {JSX.Element} - A React component for user registration.
 */

export default function RegisterScreen({ navigation }) {
  const validationSchema = yup.object().shape({
    email: yup.string().email('Please enter a valid email.').required('Email Address is required.'),
    password: yup.string().min(6).max(24).required('Minimum 6 characters required.'),
    confirmPassword: yup.string().min(6).max(24).required('Minimum 6 characters required.'),
  });
  return (
    <Formik
      initialValues={{ email: '', password: '', confirmPassword: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}>
      {({ values, handleSubmit, handleChange, isValid, errors }) => (
        <KeyboardAvoidingView style={tw`flex justify-center items-center p-8`}>
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
          <TextInput
            id="confirmPassword"
            inputMode="text"
            value={values.confirmPassword}
            onChangeText={handleChange('confirmPassword')}
            style={tw`w-full border-2 border-gray-300 rounded-xl p-4 mt-8`}
            placeholder="Confirm password"
            placeholderTextColor="gray"
            secureTextEntry
            textContentType="password"
            name="password"
          />

          {errors.confirmPassword ? (
            <Text style={tw`text-red-500 mt-4`}>{errors.confirmPassword}</Text>
          ) : null}
          <Button
            disabled={!isValid}
            size="lg"
            onPress={handleSubmit}
            title="Register"
            containerStyle={tw`w-full p-4`}
          />
          <View style={tw`flex-row`}>
            <Text>Already have an account? </Text>
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text>Login</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
}
