import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ForgotPasswordScreen from "../../screens/authenticationTab/ForgotPasswordScreen";
import LogInScreen from "../../screens/authenticationTab/LogInScreen";
import RegisterScreen from "../../screens/authenticationTab/RegisterScreen";
import { AuthStackParamList } from "../../types/screens";

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStackNavigator() {
    return <Stack.Navigator
        initialRouteName="LogIn"
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen
            name="LogIn"
            component={LogInScreen}
        />
        <Stack.Screen
            name="Register"
            component={RegisterScreen}
        />
        <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
        />
    </Stack.Navigator>
}