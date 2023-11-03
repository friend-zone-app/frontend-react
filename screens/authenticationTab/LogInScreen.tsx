import {
    StyleSheet,
    TouchableOpacity,
    TextInput,
    StatusBar,
    KeyboardAvoidingView,
    ScrollView,
    Image,
} from "react-native";
import { Text, View, SafeAreaView, TextColor } from "../../components/themed";
import { AuthStackScreenProps } from "../../types/screens";
import { useContext, useState } from "react";
import { AuthContext } from "../../constants/AuthContext";

export default function LogInScreen({
    navigation,
}: AuthStackScreenProps<"LogIn">) {
    const { signIn } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const textColor = TextColor();

    const handleSignIn = async () => {
        try {
            await signIn({ username, password });
        } catch (error: any) {
            alert(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView style={styles.contain} behavior="padding">
                <StatusBar barStyle="light-content" backgroundColor="#000000" />

                <Image
                    source={require("../../assets/splash.png")}
                    style={styles.image}
                />
                <View style={styles.login_filed}>
                    <TextInput
                        style={{
                            ...styles.input,
                            borderColor: textColor,
                        }}
                        placeholder="Email"
                        placeholderTextColor={textColor}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        value={username}
                        onChangeText={setUsername}
                    />
                    <TextInput
                        style={{
                            ...styles.input,
                            borderColor: textColor,
                        }}
                        placeholder="Password"
                        placeholderTextColor={textColor}
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    <View style={styles.fix}>
                        <TouchableOpacity
                            onPress={() => navigation.push("ForgotPassword")}
                            style={styles.signUpLink}
                        >
                            <Text style={styles.signUpLinkText}>
                                You forgot password?
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.fix}>
                        <Text style={styles.signUpText}>
                            You dont have an Account?
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.push("Register")}
                            style={styles.signUpLink}
                        >
                            <Text style={styles.signUpLinkText}>Sign Up!</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.fix}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleSignIn}
                        >
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
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
    scroll: {
        width: "100%",
        height: "100%",
    },
    image: {
        marginTop: 30,
        width: 200,
        height: 200,
        resizeMode: "cover",
    },
    login_filed: {
        width: "70%",
        height: "auto",
        marginTop: -30,
        padding: 10,
        alignItems: "flex-end",
        justifyContent: "center",
        backgroundColor: "transparent",
    },
    input: {
        width: "100%",
        padding: 10,
        borderWidth: 2,
        borderRadius: 5,
        minHeight: 50,
        marginBottom: 15,
    },
    signUpText: {
        fontSize: 15,
    },
    fix: {
        width: "100%",
        flexDirection: "row",
        gap: 5,
        justifyContent: "center",
        backgroundColor: "transparent",
        alignItems: "center",
    },
    button: {
        backgroundColor: "#007AFF",
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 5,
        marginTop: 20,
        flex: 1,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    signUpLink: {
        paddingVertical: 10,
        backgroundColor: "transparent",
        marginBottom: 0,
    },
    signUpLinkText: {
        fontSize: 16,
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
    },
    LogInForms: {
        backgroundColor: "transparent",
        gap: 10,
        marginTop: 20,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    textLogIn: {
        width: "85%",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 19,
        paddingHorizontal: 30,
        paddingVertical: 10,
        backgroundColor: "transparent",
        borderRadius: 25,
        borderWidth: 2,
        borderColor: "#fff",
    },
});
