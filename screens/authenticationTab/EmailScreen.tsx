import { AuthStackScreenProps } from "../../types/screens";
import { GetColors, Text, View } from "../../components/themed";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import TextInput2 from "../../components/textInput";
import { useLazyQuery } from "@apollo/client";
import { REQUEST_AUTHENTICATION } from "../../graphql/queries/requestAuthentication";
import Toast from "react-native-root-toast";
import Button from "../../components/button";

export default function EmailScreen({
    route,
    navigation,
}: AuthStackScreenProps<"EmailScreen">) {
    const { textColor, secondaryColor } = GetColors();
    const [email, setEmail] = useState("");

    const [requestEmail, { called, loading, error, data }] = useLazyQuery(
        REQUEST_AUTHENTICATION
    );

    useEffect(() => {
        if (error && called) {
            console.log(error.message)
            const queryError = error?.graphQLErrors[0];
            if(!queryError) return
            Toast.show(
                queryError.message ||
                    "Failed to request email authentication, please try again later!",
                {
                    duration: Toast.durations.LONG,
                }
            );
            return;
        }
        if (called) {
            const alert = Toast.show(
                "Requesting a verification code! Check your E-Mail",
                {
                    duration: Toast.durations.LONG,
                }
            );
            if (!loading && data && called) {
                Toast.hide(alert);
                navigation.push("AuthScreen", {
                    email,
                    ...route.params
                });
            }
        }
    }, [error, loading, data, called, email, navigation]);

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
                        color: textColor,
                        fontWeight: "600",
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
                reference={() => requestEmail({ variables: { email } })}
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
