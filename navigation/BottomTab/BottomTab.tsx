import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "../../components/icons";
import colors from "../../constants/colors";
import useColorScheme from "../../hooks/useColorScheme";
import { RootTabParamList, RootTabScreenProps } from "../../types/screens";
import MainTabStackNavigator from "./MainStack";
import ProfileTabStackNavigator from "./ProfileStack";
import { GetColors } from "../../components/themed";

const BottomTab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabNavigator() {
  const { backgroundColor, tintColor } = GetColors();

  return (
    <BottomTab.Navigator
      initialRouteName="Main"
      screenOptions={{
        tabBarActiveTintColor: tintColor,
        headerShown: false,
        headerStyle:{
          backgroundColor
        },
        tabBarStyle: {
          backgroundColor,
          borderColor: backgroundColor,
        }
      }}
    >
      <BottomTab.Screen
        name="Main"
        component={MainTabStackNavigator}
        options={({ navigation }: RootTabScreenProps<"Main">) => ({
          title: "Home",
          tabBarActiveTintColor: tintColor,
          tabBarIcon: ({ color }) => <Icon name="home" size={30} color={color}/>
        })}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileTabStackNavigator}
        options={({ navigation }: RootTabScreenProps<"Profile">) => ({
          title: "Me",
          tabBarActiveTintColor: tintColor,
          tabBarIcon: ({ color }) => <Icon name="user" size={30} color={color}/>
        })}
      />
    </BottomTab.Navigator>
  );
}