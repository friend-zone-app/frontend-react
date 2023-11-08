import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable } from "react-native";
import { Text, View } from "../../components/themed";
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
  const colorScheme = useColorScheme();

  return (
    <Stack.Navigator
      initialRouteName="MainScreen"
      screenOptions={({ navigation }: MainStackScreenProps<any>) => ({
        title: "",
        headerTitle: "",
        headerRight: () => {
          return (
            <View
              style={{
                flexDirection: "row"
              }}
            >
              <Pressable
                style={{
                  marginRight: 15,
                }}
              >
                <Icon name="th-large" size={25} color={colors[colorScheme].text} />
              </Pressable>
              <Pressable
                onPress={() => {
                  navigation.navigate("Setting");
                }}
              >
                <Icon name="gear" size={25} color={colors[colorScheme].text} />
              </Pressable>
            </View>
          );
        },
        headerLeft: () => {
          return (
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "600",
                }}
              >
                Parties
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