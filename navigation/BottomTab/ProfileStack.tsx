import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Pressable } from "react-native";
import Icon from "../../components/icons";
import colors from "../../constants/colors";
import useColorScheme from "../../hooks/useColorScheme";
import { GetColors, Text, useThemeColor } from '../../components/themed'
import MainScreenProfileTabScreen from "../../screens/bottomTab/profileTab/MainScreen";
import { ProfileStackScreenList, ProfileStackScreenProps } from "../../types/screens";

const Stack = createNativeStackNavigator<ProfileStackScreenList>();

export default function ProfileTabStackNavigator() {
  const { textColor } = GetColors()

  return (
    <Stack.Navigator
      initialRouteName="MainScreen"
      screenOptions={({ navigation }: ProfileStackScreenProps<any>) => ({
        title: "",
        headerTitle: "",
        headerRight: () => {
          return (
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Pressable
                style={{
                  marginRight: 15,
                }}
              >
                <Icon
                  name="th-large"
                  size={25}
                  color={textColor}
                />
              </Pressable>
              <Pressable
                onPress={() => {
                  navigation.navigate("Setting");
                }}
              >
                <Icon name="gear" size={25} color={textColor} />
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
      <Stack.Screen name="MainScreen" component={MainScreenProfileTabScreen} />
    </Stack.Navigator>
  );
}