import { Button } from '@rneui/base';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Formik } from 'formik';
import { Text, View, Pressable, KeyboardAvoidingView, TextInput } from 'react-native';

import tw from 'twrnc';
import * as yup from 'yup';
import { auth } from '../config/firebaseConfig';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';

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
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(true);
  const { t } = useTranslation();
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
        createUserWithEmailAndPassword(auth, values.email, values.password)
          .then(() => {
            console.log(`Successfully registered with ${values.email}`);
          })
          .catch((error) => {
            console.error('Register error', error.message);
          });
      }}>
      {({ values, handleSubmit, handleChange, isValid, errors }) => (
        <KeyboardAvoidingView style={tw`flex justify-center items-center p-8`}>
          <TextInput
            autoFocus
            id="email"
            inputMode="email"
            style={tw`w-full border-2 text-base border-gray-300 rounded-xl p-4 mt-8`}
            placeholder={t('email-address')}
            placeholderTextColor="gray"
            value={values.email}
            onChangeText={handleChange('email')}
            keyboardType="email-address"
            textContentType="emailAddress"
            name="email"
          />
          {errors.email ? (
            <Text style={tw`text-red-500 mt-4 text-base`}>{errors.email}</Text>
          ) : null}
          <View
            style={tw`w-full border-2 border-gray-300 rounded-xl mt-8 flex flex-row items-center justify-center pr-5 pl-4`}>
            <TextInput
              id="password"
              inputMode="text"
              style={tw`w-full pt-4 pb-4 rounded-xl pl-2 text-base`}
              value={values.password}
              onChangeText={handleChange('password')}
              placeholder={t('password')}
              placeholderTextColor="gray"
              secureTextEntry={passwordVisibility}
              textContentType="password"
              name="password"
            />
            <Pressable onPress={() => setPasswordVisibility(passwordVisibility ? false : true)}>
              {passwordVisibility ? (
                <FontAwesome name="eye" color={'gray'} size={24} />
              ) : (
                <FontAwesome name="eye-slash" color={'gray'} size={24} />
              )}
            </Pressable>
          </View>

          {errors.password ? (
            <Text style={tw`text-red-500 mt-4 text-base`}>{errors.password}</Text>
          ) : null}
          <View
            style={tw`w-full border-2 border-gray-300 rounded-xl mt-8 flex flex-row items-center justify-center pr-5 pl-4`}>
            <TextInput
              id="confirmPassword"
              inputMode="text"
              style={tw`w-full pt-4 pb-4 pl-2 rounded-xl text-base`}
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              placeholder={t('confirm-password')}
              placeholderTextColor="gray"
              secureTextEntry={confirmPasswordVisibility}
              textContentType="password"
              name="confirmPassword"
            />
            <Pressable
              onPress={() =>
                setConfirmPasswordVisibility(confirmPasswordVisibility ? false : true)
              }>
              {confirmPasswordVisibility ? (
                <FontAwesome name="eye" color={'gray'} size={24} />
              ) : (
                <FontAwesome name="eye-slash" color={'gray'} size={24} />
              )}
            </Pressable>
          </View>

          {errors.confirmPassword ? (
            <Text style={tw`text-red-500 mt-4 text-base`}>{errors.confirmPassword}</Text>
          ) : null}
          <Button
            disabled={!isValid}
            size="lg"
            onPress={handleSubmit}
            title={t('register')}
            buttonStyle={tw`text-lg rounded-xl p-4`}
            containerStyle={tw`w-full p-4 mt-8 mb-4`}
          />
          <View style={tw`flex-row items-center justify-between`}>
            <Text style={tw`text-base`}>{t('already-have')}</Text>
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text style={{ fontSize: 16, color: '#2089DC' }}>{t('login')}</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
}
