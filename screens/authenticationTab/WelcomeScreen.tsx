import {
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
} from "react-native";
import { Text, View, GetColors } from "../../components/themed";
import { AuthStackScreenProps } from "../../types/screens";

export default function WelcomeScreen({
    navigation,
}: AuthStackScreenProps<"WelcomeScreen">) {
    const { textColor, backgroundColor } = GetColors();

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
                    Welcome to Parties 🎉
                </Text>
                <TouchableOpacity
                    onPress={() => navigation.push("NameScreen")}
                    style={{
                        marginTop: 10,
                        backgroundColor: textColor,
                        padding: 5,
                        paddingHorizontal: 20,
                        borderRadius: 10,
                    }}
                >
                    <Text style={{
                        fontSize: 20,
                        color: backgroundColor,
                        fontWeight: "600",
                    }} >Continue</Text>
                </TouchableOpacity>
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
