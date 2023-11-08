import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "../../components/icons";
import colors from "../../constants/colors";
import useColorScheme from "../../hooks/useColorScheme";
import { RootTabParamList, RootTabScreenProps } from "../../types/screens";
import MainTabStackNavigator from "./MainStack";
import ProfileTabStackNavigator from "./ProfileStack";

const BottomTab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Main"
      screenOptions={{
        tabBarActiveTintColor: colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <BottomTab.Screen
        name="Main"
        component={MainTabStackNavigator}
        options={({ navigation }: RootTabScreenProps<"Main">) => ({
          title: "Home",
          tabBarActiveTintColor: colors[colorScheme ?? "light"].tint,
          tabBarIcon: ({ color }) => <Icon name="home" size={30} color={color}/>
        })}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileTabStackNavigator}
        options={({ navigation }: RootTabScreenProps<"Profile">) => ({
          title: "Me",
          tabBarActiveTintColor: colors[colorScheme ?? "light"].tint,
          tabBarIcon: ({ color }) => <Icon name="user" size={30} color={color}/>
        })}
      />
    </BottomTab.Navigator>
  );
}