import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NameScreen from "../../screens/authenticationTab/NameScreen";
import WelcomeScreen from "../../screens/authenticationTab/WelcomeScreen";
import EmailScreen from "../../screens/authenticationTab/EmailScreen";
import { AuthStackParamList } from "../../types/screens";
import { useMemo, useReducer, useState } from "react";
import { RegisterContext } from "../../constants/RegisterContext";
import AuthScreen from "../../screens/authenticationTab/AuthScreen";

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
          }
        },
        {
          username: null,
          email: null
        }
      );

    const registerMemo = useMemo(
        () => ({
            setUsername: (username: string) => {
                console.log(username);
                dispatch({
                    type: "SET_USERNAME",
                    username,
                });
            },
            getUsername: (): string => {
                return state.username;
            },
            setEmail: (email: string) => {
                console.log(email);
                dispatch({
                    type: "SET_EMAIL",
                    email,
                });
            },
            getEmail: (): string => {
                console.log(state.email, state)
                return state.email
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
                }}
            >
                <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
                <Stack.Screen name="EmailScreen" component={EmailScreen} />
                <Stack.Screen name="NameScreen" component={NameScreen} />
                <Stack.Screen name="AuthScreen" component={AuthScreen} />
            </Stack.Navigator>
        </RegisterContext.Provider>
    );
}
