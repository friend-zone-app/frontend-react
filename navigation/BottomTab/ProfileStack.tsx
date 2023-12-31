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
  const { backgroundColor, textColor } = GetColors();

  return (
    <Stack.Navigator
      initialRouteName="MainScreen"
      screenOptions={({ navigation }: ProfileStackScreenProps<any>) => ({
        title: "",
        headerTitle: "",
        headerStyle: {
          backgroundColor,
          shadowColor: backgroundColor,
        },
        headerShadowVisible: false,
        headerRight: () => {
          return (
            <View
            >
              <Pressable
                onPress={() => {
                  navigation.navigate("UserSetting");
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
                Friend Zone
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