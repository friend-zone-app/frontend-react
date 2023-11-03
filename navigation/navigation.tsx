import {
    DarkTheme,
    DefaultTheme,
    NavigationContainer,
  } from "@react-navigation/native";
  import { createNativeStackNavigator } from "@react-navigation/native-stack";
  import React, { useEffect, useMemo, useReducer } from "react";
  import { ColorSchemeName } from "react-native/types";
  import { RootStackParamList } from "../types/screens";
  import * as SecureStore from "expo-secure-store";
  import BottomTabNavigator from "./BottomTab/BottomTab";
  import NotFoundScreen from "../screens/root/NotFoundScreen";
  import SettingModal from "../screens/root/SettingModal";
  import AuthStackNavigator from "./Authentication/Authentication";
  import Splash from "../components/splash";
  import { AuthContext } from "../constants/AuthContext";

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
  const [state, dispatch] = useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            token: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            token: action.token,
            isLoading: false,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            token: action.token,
          };
        case "SIGN_UP":
          return {
            ...prevState,
            isSignout: true,
            token: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      token: null,
    }
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let token: string | null = null;

      try {
        console.log(token)
      } catch (e) {
        console.log(e)
        token = null;
      } finally {
        console.log("Restore token")
        dispatch({
          type: "RESTORE_TOKEN",
          token: token,
        });
      }
    };

    bootstrapAsync()
  }, [state.token]);

  const authContext = useMemo(
    () => ({
      signIn: async ({
        username,
        password,
      }: {
        username: string;
        password: string;
      }) => {
        try {
          const response = await fetch("https://api.txzje.xyz/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
          });

          if (!response.ok) {
            throw new Error("Invalid username or password");
          }

          const token = await response.json();

          await SecureStore.setItemAsync("token", token.token.accessToken);
          await SecureStore.setItemAsync("refreshToken", token.token.refreshToken);

          dispatch({ type: "SIGN_IN", token });
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
      signOut: async () => {
        await SecureStore.deleteItemAsync("token");
        await SecureStore.deleteItemAsync("refreshToken");
        dispatch({ type: "SIGN_OUT" });
      },
      signUp: async (data: any) => {
        try {
          const { navigate, ...userData } = data;

          const response = await fetch("https://api.txzje.xyz/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          });

          if (!response.ok) {
            throw new Error("Username already exists");
          }

          const token = await response.json();

          if (token.status === 202) {
            navigate("LogIn");
          } else {
            // Error
          }
        } catch (error) {
          console.error(error);
        }
      },
      refreshToken: async(data: any): Promise<boolean> => {
        const refreshToken = await SecureStore.getItemAsync("refreshToken")
        if(!refreshToken) return false;
        const response = await fetch("https://api.txzje.xyz/auth/refresh", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Token": refreshToken,
          },
        });

        if (!response.ok) {
          throw new Error("Invalid refresh token, please login again");
        }

        const token = await response.json();

        await SecureStore.setItemAsync("token", token.token.accessToken);
        await SecureStore.setItemAsync("refreshToken", token.token.refreshToken);

        return true;
      },
      getToken: (): string => {
        console.log(state.token)
        return state.token
      }
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {state.isLoading ? (
          <Stack.Screen name="Splash" component={Splash} />
        ) : state.token != null ? (
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
              screenOptions={{ presentation: "modal", headerShown: true }}
            >
              <Stack.Screen name="Setting" component={SettingModal} />
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