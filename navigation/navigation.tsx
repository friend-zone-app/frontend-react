import {
	DarkTheme,
	DefaultTheme,
	NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useMemo, useState } from "react";
import { ColorSchemeName } from "react-native/types";
import { RootStackParamList } from "../types/screens";
import BottomTabNavigator from "./BottomTab/BottomTab";
import NotFoundScreen from "../screens/root/NotFoundScreen";
import AuthStackNavigator from "./Authentication/Authentication";
import { AuthContext } from "../constants/AuthContext";
import useUserLocalStorage from "../hooks/useLocalStorage";
import { User } from "../types/user";
import {
	createHttpLink,
	useApolloClient,
	useLazyQuery,
	useMutation,
} from "@apollo/client";
import { GET_SELF } from "../graphql/queries/getUser";
import Splash from "../screens/root/SplashScreen";
import { setContext } from "@apollo/client/link/context";
import { REFRESH_TOKEN } from "../graphql/mutation/requestAuthentication";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
	const [doRefresh, setDoRefresh] = useState(false);
	const client = useApolloClient();

	const [
		query,
		{
			called: queryCalled,
			loading: queryLoading,
			error: queryError,
			data: queryData,
			refetch: queryRefetch,
		},
	] = useLazyQuery(GET_SELF);
	const [
		refresh,
		{
			called: refreshCalled,
			loading: refreshLoading,
			error: refreshError,
			data: refreshData,
		},
	] = useMutation(REFRESH_TOKEN);

	useEffect(() => {
		const accessToken = tokenStorage.accessToken;
		const refreshToken = tokenStorage.refreshToken;

		console.log(accessToken, refreshToken);

		if (!accessToken || !refreshToken) {
			setLoading(false);
			return;
		}

		if (!queryCalled) {
			query({
				context: {
					headers: {
						Authorization: "Bearer " + accessToken,
					},
				},
			});
		}

		if (queryLoading) return;

		setLoading(false);

		if (queryError && queryCalled) {
			const errorMessage = queryError.graphQLErrors[0];
			if (errorMessage.message.startsWith("[408]") && refreshToken) {
				setDoRefresh(true);
			} else {
				tokenStorage.setAccessToken(null);
				tokenStorage.setRefreshToken(null);
			}
		} else if (!queryError && queryCalled && queryData) {
			const userData = queryData.me;
			console.log(userData);
			userStorage.setUserData(userData);
		}
	}, [queryCalled, queryLoading, queryError, queryData, loading]);

	useEffect(() => {
		if (!doRefresh) return;

		if (!refreshCalled) {
			refresh({
				context: {
					headers: {
						Authorization: "Bearer " + tokenStorage.refreshToken,
					},
				},
			});
		}

		if (refreshLoading) return;

		if (refreshError && refreshCalled) {
			tokenStorage.setAccessToken(null);
			tokenStorage.setRefreshToken(null);
		} else if (!refreshError && refreshData && refreshCalled) {
			const newTokens = refreshData.refreshToken;
			tokenStorage.setAccessToken(newTokens.accessToken);
			tokenStorage.setRefreshToken(newTokens.refreshToken);
			queryRefetch({
				context: {
					headers: {
						Authorization: "Bearer " + newTokens.accessToken,
					},
				},
			});
		}
	}, [doRefresh, refreshCalled, refreshData, refreshError, refreshLoading]);

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
								Authorization: `Bearer ${tokenStorage.accessToken}`,
							},
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
		}),
		[]
	);

	return (
		<AuthContext.Provider value={authContext}>
			<GestureHandlerRootView style={{flex: 1}}>
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
						</>
					) : (
						<Stack.Screen
							name="Authentication"
							component={AuthStackNavigator}
							options={{ header: () => null }}
						/>
					)}
				</Stack.Navigator>
			</GestureHandlerRootView>
		</AuthContext.Provider>
	);
}
