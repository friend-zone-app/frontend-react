import { useContext, useEffect, useState } from "react";
import { GetColors, Text, View } from "../../components/themed";
import { AuthStackScreenProps } from "../../types/screens";
import { StyleSheet } from "react-native";
import TextInput2 from "../../components/textInput";
import { AuthContext } from "../../constants/AuthContext";
import { useMutation } from "@apollo/client";
import Toast from "react-native-root-toast";
import { VALIDATE_AUTHENTICATION } from "../../graphql/mutation/requestAuthentication";
import Button from "../../components/button";

export default function AuthScreen({
    navigation, route
}: AuthStackScreenProps<"AuthScreen">) {
    const { textColor, secondaryColor } = GetColors();
    const [authCode, setAuthCode] = useState("");
    const { signUp } = useContext(AuthContext);
    const username = route.params.username;
    const email = route.params.email;
    const setting = route.params.setting ? route.params.setting : {
        location: "FRIENDS",
        event: "FRIENDS"
    };

    const [execute, { called, loading, error, data }] = useMutation(
        VALIDATE_AUTHENTICATION
    );

    useEffect(() => {
        if (error && called) {
            console.log(error.message, error.extraInfo, error.clientErrors);
            const queryError = error?.graphQLErrors[0];
            if (queryError) {
                Toast.show(
                    queryError.message ||
                        "Failed to authenticate OTP code, please try again later!",
                    {
                        duration: Toast.durations.LONG,
                    }
                );
            }
        }

        if (!loading && data && called) {
            const respond = data.validateOtp;
            signUp({ user: respond.user, tokens: respond.token });
        }
    }, [error, loading, data, called, email, navigation]);

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
                        color: textColor,
                        fontWeight: "600",
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
                reference={() => {
                    execute({
                        variables: {
                            username,
                            email,
                            code: authCode,
                            setting: {
                                privacy: {
                                    shareLocation: setting.location,
                                    reactionOnPost: "FRIENDS",
                                    joinPost: setting.event,
                                    friendRequest: "EVERYONE",
                                },
                                colorMode: "LIGHT",
                            },
                        },
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
        flexDirection: "row",
    },
    input: {
        padding: 20,
        color: "#fff",
    },
});
