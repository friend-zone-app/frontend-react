import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "../../components/icons";
import colors from "../../constants/colors";
import useColorScheme from "../../hooks/useColorScheme";
import { RootTabParamList, RootTabScreenProps } from "../../types/screens";
import MainTabStackNavigator from "./MainStack";
import ProfileTabStackNavigator from "./ProfileStack";
import { GetColors } from "../../components/themed";
import CreateEvent from "../../screens/bottomTab/CreateEvent";

const BottomTab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabNavigator() {
  const { backgroundColor, tintColor, textColor, secondaryColor } = GetColors();

  return (
    <BottomTab.Navigator
      initialRouteName="Main"
      screenOptions={{
        tabBarActiveTintColor: textColor,
        tabBarInactiveTintColor: secondaryColor,
        headerShown: false,
        tabBarStyle: {
          backgroundColor,
          borderColor: backgroundColor,
          shadowColor: backgroundColor,
        },
        tabBarShowLabel: false
      }}
    >
      <BottomTab.Screen
        name="Main"
        component={MainTabStackNavigator}
        options={({ navigation }: RootTabScreenProps<"Main">) => ({
          tabBarIcon: ({ color }) => <Icon name="home" size={30} color={color}/>,
        })}
      />
      <BottomTab.Screen
        name="CreateEvent"
        component={CreateEvent}
        options={({navigation}: RootTabScreenProps<"CreateEvent">) => ({
          headerShown: true,
          headerTitle: "",
          headerShadowVisible: false,
          headerStyle:{
            backgroundColor,
          },
          tabBarIcon: ({color}) => <Icon name="plus-circle" size={30} color={color} />
        })}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileTabStackNavigator}
        options={({ navigation }: RootTabScreenProps<"Profile">) => ({
          tabBarIcon: ({ color }) => <Icon name="user" size={30} color={color}/>
        })}
      />
    </BottomTab.Navigator>
  );
}