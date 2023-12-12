import {
    StyleSheet,
    SafeAreaView,
} from "react-native";
import { Text, View, GetColors } from "../../components/themed";
import { AuthStackScreenProps } from "../../types/screens";
import Button from "../../components/button";

export default function WelcomeScreen({
    navigation,
}: AuthStackScreenProps<"WelcomeScreen">) {
    const { textColor, backgroundColor } = GetColors();

    console.log(process.env.PUBLIC_EXPO_GRAPHQL_URI)

    return (
        <SafeAreaView
            style={{
                ...styles.container,
                backgroundColor: backgroundColor,
            }}
        >
            <View style={styles.contain}>
                <Text
                    style={{
                        fontSize: 30,
                        fontWeight: "600",
                    }}
                >
                    Welcome to Friend Zone 🎉
                </Text>
                <Button reference={() => navigation.push("NameScreen")} placeholder="Continue"/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
    },
    contain: {
        width: "100%",
        height: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
