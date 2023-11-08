import {
    DarkTheme,
    DefaultTheme,
    NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useMemo, useReducer, useState } from "react";
import { ColorSchemeName } from "react-native/types";
import { RootStackParamList } from "../types/screens";
import BottomTabNavigator from "./BottomTab/BottomTab";
import NotFoundScreen from "../screens/root/NotFoundScreen";
import SettingModal from "../screens/root/SettingModal";
import AuthStackNavigator from "./Authentication/Authentication";
import Splash from "../components/splash";
import { AuthContext } from "../constants/AuthContext";
import useUserLocalStorage from "../hooks/useLocalStorage";

export default function Navigation({
    colorScheme,
}: {
    colorScheme: ColorSchemeName;
}) {
    return (
        <NavigationContainer
            theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
            <RootNavigator />
        </NavigationContainer>
    );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {

    const { token: tokenStorage } = useUserLocalStorage();

    const authContext = useMemo(
        () => ({
            signUp: async ({
                username,
                email,
            }: {
                username: string;
                email: string;
            }) => {
                try {
                    const token = username;
                    console.log("Signin Function", username, email);

                    tokenStorage.setToken(username);
                } catch (error) {
                    console.error(error);
                    throw error;
                }
            },
            signOut: async () => {
                tokenStorage.setToken(null);
            },
            refreshToken: async (data: any): Promise<boolean> => {
                return true;
            },
            getToken: (): string => {
                return tokenStorage.token || "";
            },
        }),
        []
    );

    return (
        <AuthContext.Provider value={authContext}>
            <Stack.Navigator
                initialRouteName="Root"
                screenOptions={{
                    headerShown: false,
                }}
            >
                {tokenStorage.token ? (
                    <>
                        <Stack.Screen
                            name="Root"
                            component={BottomTabNavigator}
                            options={{ header: () => null }}
                        />
                        <Stack.Screen
                            name="NotFound"
                            component={NotFoundScreen}
                            options={{ title: "Oops!" }}
                        />
                        <Stack.Group
                            screenOptions={{
                                presentation: "modal",
                                headerShown: true,
                            }}
                        >
                            <Stack.Screen
                                name="Setting"
                                component={SettingModal}
                            />
                        </Stack.Group>
                    </>
                ) : (
                    <Stack.Screen
                        name="Authentication"
                        component={AuthStackNavigator}
                        options={{ header: () => null }}
                    />
                )}
            </Stack.Navigator>
        </AuthContext.Provider>
    );
}
