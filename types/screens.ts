import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

/*
  Root Stack
*/

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Setting: undefined;
  NotFound: undefined;
  Authentication: undefined;
  Splash: undefined
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen, any>;

/* 
  Main Tab
*/

export type RootTabParamList = {
  Main: NavigatorScreenParams<MainStackScreenList> | undefined;
  Profile: NavigatorScreenParams<ProfileStackScreenList> | undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

/*
  Sub main tab
*/

export type MainStackScreenList = {
  MainScreen: undefined;
  DiscoveryScreen: undefined;
};

export type ProfileStackScreenList = {
  MainScreen: undefined;
};

export type MainStackScreenProps<Screen extends keyof MainStackScreenList> =
  CompositeScreenProps<
    NativeStackScreenProps<MainStackScreenList, Screen>,
    CompositeScreenProps<
      BottomTabScreenProps<RootTabParamList>,
      NativeStackScreenProps<RootStackParamList>
    >
  >;

export type ProfileStackScreenProps<Screen extends keyof ProfileStackScreenList> =
  CompositeScreenProps<
    NativeStackScreenProps<ProfileStackScreenList, Screen>,
    CompositeScreenProps<
      BottomTabScreenProps<RootTabParamList>,
      NativeStackScreenProps<RootStackParamList>
    >
  >;

/*
  Authentication Tab
*/

export type AuthStackParamList = {
  WelcomeScreen: undefined;
  NameScreen: undefined;
  EmailScreen: undefined
};

export type AuthStackScreenProps<Screen extends keyof AuthStackParamList> =
  CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;