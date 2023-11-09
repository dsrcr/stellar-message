import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { Button, Image, color } from '@rneui/base';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Formik } from 'formik';
import { Text, View, Pressable, KeyboardAvoidingView, TextInput } from 'react-native';

import tw from 'twrnc';
import * as yup from 'yup';
import { auth } from '../config/firebaseConfig';
import { useTranslation } from 'react-i18next';
import i18next from '../services/i18next';
import { useState } from 'react';

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
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const { t } = useTranslation();
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
        signInWithEmailAndPassword(auth, values.email, values.password)
          .then(() => console.log(`Login success. Logged in with ${values.email}`))
          .catch((error) => console.error('Login error', error.message));
      }}>
      {({ values, handleSubmit, handleChange, isValid, errors }) => (
        <KeyboardAvoidingView style={tw`flex justify-center items-center p-8 w-full h-full`}>
          <Image
            style={tw`w-70 h-70 p-8 pb-4 rounded-xl`}
            source={{
              uri: 'https://github.com/dsrcr/stellar-message/blob/master/assets/logo.png?raw=true',
            }}
          />

          <View
            style={tw`w-full border-2 border-gray-300 rounded-xl mt-8 flex flex-row items-center justify-center`}>
            <TextInput
              autoFocus
              id="email"
              inputMode="email"
              style={tw`w-full p-4 rounded-xl text-base`}
              placeholder={t('email-address')}
              placeholderTextColor="gray"
              value={values.email}
              onChangeText={handleChange('email')}
              keyboardType="email-address"
              textContentType="emailAddress"
              name="email"
            />
          </View>
          {errors.email ? (
            <Text style={tw`text-red-500 mt-4 text-base`}>{errors.email}</Text>
          ) : null}
          <View
            style={tw`w-full border-2 border-gray-300 rounded-xl mt-8 flex flex-row items-center justify-center pr-5 pl-4`}>
            <TextInput
              id="password"
              inputMode="text"
              style={tw`w-full pt-4 pb-4 rounded-xl text-base`}
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
          <Pressable style={tw`p-4`}>
            <Text style={tw`text-base`}>{t('forgot-password')}</Text>
          </Pressable>

          <Button
            disabled={!isValid}
            size="lg"
            onPress={handleSubmit}
            title={t('login')}
            titleStyle={tw`text-lg`}
            buttonStyle={tw`text-lg rounded-xl`}
            containerStyle={tw`w-full p-4`}
          />

          <Text style={tw`text-base`}>{t('or-use')}</Text>
          <View style={tw`flex flex-row justify-around`}>
            <Button
              size="lg"
              containerStyle={tw`p-4 min-w-41`}
              buttonStyle={tw`text-lg rounded-xl`}
              title={<FontAwesome5 name="google" color="white" size={24} />}
            />
            <Button
              size="lg"
              containerStyle={tw`p-4 min-w-41`}
              buttonStyle={tw`text-lg rounded-xl`}
              title={<FontAwesome5 name="apple" color="white" size={24} />}
            />
          </View>

          <View style={tw`flex-row items-center justify-center`}>
            <Text style={tw`text-base`}>{t('dont-have')}</Text>
            <Pressable onPress={() => navigation.navigate('Register')}>
              <Text style={{ fontSize: '1rem', color: '#2089DC' }}>{t('register')}</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
}
