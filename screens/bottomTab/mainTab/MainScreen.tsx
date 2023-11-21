import { MainStackScreenProps } from "../../../types/screens";
import { GetColors, Text, View } from '../../../components/themed';
import { StyleSheet } from "react-native";


export default function MainScreen({ navigation }: MainStackScreenProps<'MainScreen'>) {
    const { textColor, backgroundColor } = GetColors();

    return (
        <View
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
            </View>
        </View>
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
