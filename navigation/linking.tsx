import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { RootStackParamList } from "../types/screens";

export const linking: LinkingOptions<RootStackParamList> = {
    prefixes: [Linking.createURL("/")],
    config: {
        screens: {
            Root: {
                screens: {
                    Main: {
                        screens: {
                            MainScreen: "main",
                            DiscoveryScreen: "discovery",
                        },
                    },
                    Profile: {
                        screens: {
                            MainScreen: "profile",
                        },
                    },
                    CreateEvent: "createEvent",
                    UserSetting: "userSetting",
                },
            },
            NotFound: "*",
            Authentication: {
                screens: {
                    WelcomeScreen: "welcome",
                    NameScreen: "name",
                    EmailScreen: "email",
                    AuthScreen: "auth",
                    ConfigurationScreen: "configuration",
                },
            },
            Splash: "splash",
        },
    },
};
