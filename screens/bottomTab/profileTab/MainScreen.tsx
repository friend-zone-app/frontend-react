import { ProfileStackScreenProps } from "../../../types/screens";
import { GetColors, Text, View } from "../../../components/themed";
import { Image, StyleSheet } from "react-native";
import useUserLocalStorage from "../../../hooks/useLocalStorage";

export default function MainScreen({
    navigation,
}: ProfileStackScreenProps<"MainScreen">) {
    const { backgroundColor, secondaryColor } = GetColors();
    const { userData } = useUserLocalStorage().user;
    const AVATAR_MAX_SIZE = 70;

    console.log(userData)

    return (
        <View
            style={{
                ...styles.container,
                backgroundColor: backgroundColor,
            }}
        >
            {/* User header */}
            <View style={styles.header}>
                <View
                    style={{
                        flex: 1,
                        flexDirection: "column",
                        alignItems: "flex-start",
                        padding: 16,
                        height: "20%",
                    }}
                >
                    <Image
                        source={require("../../../assets/avatar_placeholder.png")}
                        style={{
                            maxWidth: AVATAR_MAX_SIZE,
                            maxHeight: AVATAR_MAX_SIZE,
                        }}
                    />
                    <View
                        style={{
                            marginTop: 10,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: "600",
                            }}
                        >
                            {userData?.displayName}
                        </Text>
                        <Text
                            style={{
                                fontSize: 14,
                                color: secondaryColor,
                                fontWeight: "500",
                                marginLeft: 4,
                            }}
                        >
                            {userData?.username.toLowerCase()}
                        </Text>
                    </View>
                </View>

                {/* Friends counts */}
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        width: "auto",
                        maxHeight: "20%",
                        flex: 1,
                    }}
                >
                    <View style={styles.userHeaderInformation}>
                        <Text style={styles.userHeaderInformationTitle}>Friends</Text>
                        <Text style={{ textAlign: "center" }}>{userData?.friendList?.length || 0}</Text>
                    </View>
                    <View style={styles.userHeaderInformation}>
                        <Text style={styles.userHeaderInformationTitle}>Posts</Text>
                        <Text style={{ textAlign: "center" }}>{userData?.posts?.length || 0}</Text>
                    </View>
                    <View style={{
                        ...styles.userHeaderInformation,
                        marginRight: 0,
                    }}>
                        <Text style={styles.userHeaderInformationTitle}>Events</Text>
                        <Text style={{ textAlign: "center" }}>{userData?.events?.length || 0}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
    },
    header: {
        width: "100%",
        height: "100%",
        flex: 1,
        justifyContent: "space-around",
        flexDirection: "row",
        backgroundColor: "#fff"
    },
    userHeaderInformation: {
        flexDirection: "column",
        marginRight: 14,
    },
    userHeaderInformationTitle: {
        fontSize: 16,
        fontWeight: "600"
    }
});
