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
import { AuthContext } from "../constants/AuthContext";
import useUserLocalStorage from "../hooks/useLocalStorage";
import { User } from "../types/user";
import {
    createHttpLink,
    useApolloClient,
    concat,
    ApolloLink,
    useQuery,
    useLazyQuery,
} from "@apollo/client";
import { GET_SELF } from "../graphql/queries/getUser";
import Splash from "../components/splash";
import { setContext } from '@apollo/client/link/context';

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
    const { token: tokenStorage, user: userStorage } = useUserLocalStorage();
    const [loading, setLoading] = useState(true);
    const client = useApolloClient();
    
    const [query, { called, loading: queryLoading, error, data }] = useLazyQuery(GET_SELF);

    useEffect(() => {
        const accessToken = tokenStorage.accessToken;
        if (!accessToken) {
            setLoading(false);
            return
        }
        query({ context: {
            headers: {
                "Authorization": "Bearer " + accessToken
            }
        }})
        if (queryLoading) return;
        setLoading(false);
        if (error && called) {
            tokenStorage.setAccessToken(null);
            tokenStorage.setRefreshToken(null);
        } else if (!error && called && data) {
            const userData = data.me;
            userStorage.setUserData(userData);
        }
    }, [called, queryLoading, error, data, loading]);

    const authContext = useMemo(
        () => ({
            signUp: async ({
                user,
                tokens,
            }: {
                user: User;
                tokens: { accessToken: string; refreshToken: string };
            }) => {
                try {
                    userStorage.setUserData(user);
                    tokenStorage.setAccessToken(tokens.accessToken);
                    tokenStorage.setRefreshToken(tokens.refreshToken);
                    const httpLink = createHttpLink({
                        uri: process.env.EXPO_PUBLIC_GRAPHQL_URI,
                    });
                    const link = setContext(async (operation, prevContext) => {
                        return {
                            ...prevContext,
                            headers: {
                                ...prevContext.headers,
                                Authorization: `Bearer ${tokenStorage.accessToken}`
                            }
                        };
                    });
                    client.setLink(link.concat(httpLink));
                } catch (error) {
                    console.error(error);
                    throw error;
                }
            },
            signOut: async () => {
                tokenStorage.setAccessToken(null);
                tokenStorage.setRefreshToken(null);
            },
            refreshToken: async (data: any): Promise<boolean> => {
                return true;
            },
            getAccessToken: (): string => {
                return tokenStorage.accessToken || "";
            },
            getRefreshToken: (): string => {
                return tokenStorage.refreshToken || "";
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
                {loading ? (
                    <Stack.Screen
                        name="Splash"
                        component={Splash}
                        options={{ header: () => null }}
                    />
                ) : tokenStorage.accessToken ? (
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
