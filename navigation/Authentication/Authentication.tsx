import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NameScreen from "../../screens/authenticationTab/NameScreen";
import WelcomeScreen from "../../screens/authenticationTab/WelcomeScreen";
import EmailScreen from "../../screens/authenticationTab/EmailScreen";
import { AuthStackParamList } from "../../types/screens";
import { useMemo, useReducer, useState } from "react";
import { RegisterContext } from "../../constants/RegisterContext";
import AuthScreen from "../../screens/authenticationTab/AuthScreen";
import SettingScreen from "../../screens/authenticationTab/SettingScreen";
import { GetColors } from "../../components/themed";
import { UserPrivacy } from "../../types/user";

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStackNavigator() {
    const [state, dispatch] = useReducer(
        (prevState: any, action: any) => {
            switch (action.type) {
                case "SET_USERNAME":
                    return {
                        ...prevState,
                        username: action.username,
                    };
                case "SET_EMAIL":
                    return {
                        ...prevState,
                        email: action.email,
                    };
                case "SET_SETTING":
                    return {
                        ...prevState,
                        setting: action.setting
                    }
            }
        },
        {
            username: null,
            email: null,
            setting: {
                location: "NOBODY",
                event: "FRIENDS",
            }
        }
    );
    const { backgroundColor, textColor } = GetColors();

    const registerMemo = useMemo(
        () => ({
            setUsername: (username: string) => {
                dispatch({
                    type: "SET_USERNAME",
                    username,
                });
            },
            getUsername: (): string => {
                return state.username;
            },
            setEmail: (email: string) => {
                dispatch({
                    type: "SET_EMAIL",
                    email,
                });
            },
            getEmail: (): string => {
                return state.email;
            },
            setSetting: (setting: { location: UserPrivacy, event: UserPrivacy }) => {
                dispatch({
                    type: "SET_SETTING",
                    setting
                })
            },
            getSetting: () => {
                return state.setting
            }
        }),
        [state.username, state.email]
    );

    return (
        <RegisterContext.Provider value={registerMemo}>
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
                    name="SettingScreen"
                    component={SettingScreen}
                    options={{
                        headerShown: true,
                        headerRight: () => null,
                        headerTitle: "",
                        headerShadowVisible: false,
                        headerBackVisible: false,
                    }}
                />
            </Stack.Navigator>
        </RegisterContext.Provider>
    );
}
