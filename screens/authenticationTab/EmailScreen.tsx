import { AuthStackScreenProps } from "../../types/screens";
import { GetColors, Text, View } from "../../components/themed";
import { useContext, useState } from "react";
import { Button, StyleSheet } from "react-native";
import TextInput2 from "../../components/textInput";
import { RegisterContext } from "../../constants/RegisterContext";

export default function EmailScreen({
    route,
    navigation,
}: AuthStackScreenProps<"EmailScreen">) {
    const { textColor, secondaryColor } = GetColors();
    const { setEmail: setEmailContext } = useContext(RegisterContext);
    const [email, setEmail] = useState("");

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
                    What about the email address?
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
                    placeholder="Your email address..."
                    placeholderTextColor={textColor}
                    autoCapitalize="none"
                    autoComplete="email"
                    keyboardType="email-address"
                    value={email}
                    placeholderStyle={{ fontSize: 20, color: secondaryColor }}
                    onChangeText={setEmail}
                    autoFocus={true}
                />
            </View>
            <Button
                title="Continue"
                onPress={() => {
                    setEmailContext(email);
                    navigation.push("AuthScreen");
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
