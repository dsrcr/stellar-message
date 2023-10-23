import { Button, Image, Input } from "@rneui/base";
import { Text, View } from "react-native";
import tw from "twrnc";

export default function LoginScreen() {
  return (
    <View style={tw`items-center flex-1 justify-center`}>
      <Image style={tw`w-50 h-50`} source={"./assets/stellarnet_logo.svg"} />
      <Input autoComplete="email" placeholder="E-mail Address" />
      <Input secureTextEntry placeholder="Password" />

      <Text>Forgot password?</Text>

      <View style={tw`flex-row items-center justify-center`}>
        <Button style={tw`p-8 m-4`} title={"Google"} />
        <Button style={tw`p-8 m-4`} title={"Apple"} />
      </View>

      <Button style={tw`m-4`} title={"Login"} />

      <Text>Don't have an account? Register</Text>
    </View>
  );
}
