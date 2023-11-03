import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NameScreen from "../../screens/authenticationTab/NameScreen";
import WelcomeScreen from "../../screens/authenticationTab/WelcomeScreen";
import EmailScreen from "../../screens/authenticationTab/RegisterScreen";
import { AuthStackParamList } from "../../types/screens";

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStackNavigator() {
    return <Stack.Navigator
        initialRouteName="WelcomeScreen"
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
        />
        <Stack.Screen
            name="EmailScreen"
            component={EmailScreen}
        />
        <Stack.Screen
            name="NameScreen"
            component={NameScreen}
        />
    </Stack.Navigator>
}