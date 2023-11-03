import { AuthStackScreenProps } from "../../types/screens";
import { GetColors, SafeAreaView, Text, View } from "../../components/themed";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
import TextInput2 from "../../components/textInput";

export default function NameScreen({
    navigation,
}: AuthStackScreenProps<"NameScreen">) {
    const { textColor, backgroundColor } = GetColors();
    const [username, setUsername] = useState("");

    return (
        <View style={styles.contain}>
            <StatusBar style={"auto"} />

            <View>
                <Text
                    style={{
                        fontSize: 30,
                        fontWeight: "600",
                        alignContent: "center",
                    }}
                >
                    What is your name?
                </Text>
            </View>

            <View
                style={{
                    ...styles.inputField,
                }}
            >
                <TextInput2
                    style={{
                        ...styles.input,
                    }}
                    placeholder="Your username..."
                    placeholderTextColor={textColor}
                    autoCapitalize="words"
                    keyboardType="default"
                    maxLength={20}
                    value={username}
                    placeholderStyle={{ fontSize: 20 }}
                    onChangeText={setUsername}
                    autoFocus={true}
                />
            </View>
            <Button
                title="Continue"
                onPress={() => navigation.push("EmailScreen")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    contain: {
        width: "100%",
        height: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 5,
    },
    inputField: {
        width: "70%",
        height: "auto",
        padding: 10,
        alignItems: "flex-end",
        justifyContent: "center",
        backgroundColor: "transparent",
    },
    input: {
        width: "100%",
        padding: 20,
        color: "#fff",
    },
});
