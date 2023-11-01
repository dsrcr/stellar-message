import { FontAwesome5 } from '@expo/vector-icons';
import { Button, Image } from '@rneui/base';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Formik } from 'formik';
import { Text, View, Pressable, KeyboardAvoidingView, TextInput } from 'react-native';

import tw from 'twrnc';
import * as yup from 'yup';
import { auth } from '../config/firebaseConfig';
import { useTranslation } from 'react-i18next';
import i18next from '../services/i18next';

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
          <TextInput
            autoFocus
            id="email"
            inputMode="email"
            style={tw`w-full border-2 border-gray-300 rounded-xl p-4 mt-8`}
            placeholder={t('email-address')}
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
            placeholder={t('password')}
            placeholderTextColor="gray"
            secureTextEntry
            textContentType="password"
            name="password"
          />

          {errors.password ? <Text style={tw`text-red-500 mt-4`}>{errors.password}</Text> : null}
          <Pressable style={tw`p-4`}>
            <Text>{t('forgot-password')}</Text>
          </Pressable>

          <Button
            disabled={!isValid}
            size="lg"
            onPress={handleSubmit}
            title={t('login')}
            containerStyle={tw`w-full p-4`}
          />

          <Text>{t('or-use')}</Text>
          <View style={tw`flex flex-row justify-around`}>
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
            <Text>{t('dont-have')}</Text>
            <Pressable onPress={() => navigation.navigate('Register')}>
              <Text>{t('register')}</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
}
