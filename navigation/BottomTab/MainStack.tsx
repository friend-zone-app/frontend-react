import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable } from "react-native";
import { GetColors, Text, View } from "../../components/themed";
import Icon from "../../components/icons";
import colors from "../../constants/colors";
import useColorScheme from "../../hooks/useColorScheme";
import DiscoveryScreenMainTabScreen from "../../screens/bottomTab/mainTab/DiscoveryScreen";
import MainScreenMainTabScreen from "../../screens/bottomTab/mainTab/MainScreen";
import {
  MainStackScreenList,
  MainStackScreenProps,
} from "../../types/screens";

const Stack = createNativeStackNavigator<MainStackScreenList>();

export default function MainTabStackNavigator() {
  const { backgroundColor, textColor } = GetColors();

  return (
    <Stack.Navigator
      initialRouteName="MainScreen"
      screenOptions={({ navigation }: MainStackScreenProps<any>) => ({
        title: "",
        headerTitle: "",
        headerStyle:{
          backgroundColor,
          shadowColor: backgroundColor
        },
        headerShadowVisible: false,
        headerRight: () => {
          return (
            <View
            >
              <Pressable
                style={{
                  marginRight: 15,
                }}
              >
                <Icon name="th-large" size={25} color={textColor} />
              </Pressable>
            </View>
          );
        },
        headerLeft: () => {
          return (
            <View
              style={{
                backgroundColor: "none"
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "600",
                  backgroundColor: "transparent"
                }}
              >
                Friend Zone
              </Text>
            </View>
          );
        },
      })}
    >
      <Stack.Screen name="MainScreen" component={MainScreenMainTabScreen}/>
      <Stack.Screen
        name="DiscoveryScreen"
        component={DiscoveryScreenMainTabScreen}
      />
    </Stack.Navigator>
  );
}