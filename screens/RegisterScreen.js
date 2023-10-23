import { FontAwesome5 } from "@expo/vector-icons";
import { Button, Image, Input } from "@rneui/base";
import { useFormik } from "formik";
import { Text, View, Pressable } from "react-native";
import tw from "twrnc";
import Yup from "yup";
export default function RegisterScreen({ navigation }) {
  return (
    <View style={tw`items-center flex-1 justify-center p-8`}>
      <>
        <Input
          id="email"
          style={tw`pt-4`}
          autoComplete="email"
          placeholder="E-mail Address"
        />
        <Input id="password" secureTextEntry placeholder="Password" />
        <Input id="password" secureTextEntry placeholder="Confirm password" />
      </>

      <Button title={"Register"} containerStyle={tw`m-4 p-4 w-80`} />

      <View style={tw`flex-row`}>
        <Text>Already have an account? </Text>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text>Log in</Text>
        </Pressable>
      </View>
    </View>
  );
}
