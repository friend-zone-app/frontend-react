import { useContext, useState } from "react";
import { GetColors, Text, View } from "../../components/themed";
import { AuthStackScreenProps } from "../../types/screens";
import { RegisterContext } from "../../constants/RegisterContext";
import { Button, StyleSheet } from "react-native";
import TextInput2 from "../../components/textInput";
import { AuthContext } from "../../constants/AuthContext";

export default function AuthScreen({
    navigation,
}:  AuthStackScreenProps<"AuthScreen">) {
    const { textColor, secondaryColor } = GetColors();
    const [authCode, setAuthCode] = useState("");
    const { signUp } = useContext(AuthContext);
    const { getUsername, getEmail } = useContext(RegisterContext);

    return (
        <View style={styles.contain}>
            <View
                style={{
                    marginHorizontal: 10,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text
                    style={{
                        fontSize: 30,
                        fontWeight: "600",
                        textAlign: "center",
                    }}
                >
                    Your Authentication Code
                </Text>
                <Text
                    style={{
                        fontSize: 16,
                        textAlign: "center",
                        margin: 5,
                        maxWidth: "80%",
                    }}
                >
                    We have sent you a authentication code to your email
                    address.
                </Text>
            </View>

            <View
                style={{
                    ...styles.inputField,
                }}
            >
                <TextInput2
                    style={{
                        fontSize: 20,
                        ...styles.input,
                    }}
                    placeholder="Code"
                    placeholderTextColor={textColor}
                    keyboardType="number-pad"
                    autoComplete="one-time-code"
                    maxLength={4}
                    value={authCode}
                    placeholderStyle={{ fontSize: 20, color: secondaryColor }}
                    onChangeText={(value) => {
                        setAuthCode(value);
                    }}
                    autoFocus={true}
                />
            </View>
            <Button
                title="Continue"
                onPress={() => {
                    const username = getUsername();
                    const email = getEmail();
                    signUp({ username, email });
                }}
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
        flexDirection: "row",
    },
    input: {
        padding: 20,
        color: "#fff",
    },
});
