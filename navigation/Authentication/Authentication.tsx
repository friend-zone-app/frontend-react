import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NameScreen from "../../screens/authenticationTab/NameScreen";
import WelcomeScreen from "../../screens/authenticationTab/WelcomeScreen";
import EmailScreen from "../../screens/authenticationTab/EmailScreen";
import { AuthStackParamList } from "../../types/screens";
import AuthScreen from "../../screens/authenticationTab/AuthScreen";
import ConfigurationScreen from "../../screens/authenticationTab/ConfigurationScreen";
import { GetColors } from "../../components/themed";

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStackNavigator() {
    const { backgroundColor } = GetColors();

    return (
        <Stack.Navigator
            initialRouteName="WelcomeScreen"
            screenOptions={{
                headerShown: false,
                headerStyle: {
                    backgroundColor,
                },
            }}
        >
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <Stack.Screen name="EmailScreen" component={EmailScreen} />
            <Stack.Screen name="NameScreen" component={NameScreen} />
            <Stack.Screen name="AuthScreen" component={AuthScreen} />
            <Stack.Screen
                name="ConfigurationScreen"
                component={ConfigurationScreen}
                options={{
                    headerShown: true,
                    headerRight: () => null,
                    headerTitle: "",
                    headerShadowVisible: false,
                    headerBackVisible: false,
                }}
            />
        </Stack.Navigator>
    );
}
