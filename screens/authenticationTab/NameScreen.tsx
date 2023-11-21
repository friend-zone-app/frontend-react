import { AuthStackScreenProps } from "../../types/screens";
import { GetColors, Text, View } from "../../components/themed";
import { StyleSheet } from "react-native";
import { useContext, useState } from "react";
import TextInput2 from "../../components/textInput";
import { RegisterContext } from "../../constants/RegisterContext";
import Button from "../../components/button";

export default function NameScreen({
    navigation,
}: AuthStackScreenProps<"NameScreen">) {
    const { textColor, secondaryColor, backgroundColor } = GetColors();
    const [username, setUsername] = useState("");
    const { setUsername: setUsernameContext } = useContext(RegisterContext);

    return (
        <View style={styles.contain}>
            <View>
                <Text
                    style={{
                        fontSize: 30,
                        fontWeight: "600",
                        textAlign: "center",
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
                        fontSize: 20,
                        color: textColor,
                        fontWeight: "600",
                    }}
                    placeholder="Your username..."
                    placeholderTextColor={textColor}
                    autoCapitalize="words"
                    keyboardType="default"
                    maxLength={20}
                    value={username}
                    placeholderStyle={{ fontSize: 20, color: secondaryColor }}
                    onChangeText={setUsername}
                    autoFocus={true}
                />
            </View>
            <Button
                reference={() => {
                    setUsernameContext(username);
                    navigation.push("SettingScreen", {
                        username
                    });
                }}
                placeholder="Continue"
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
