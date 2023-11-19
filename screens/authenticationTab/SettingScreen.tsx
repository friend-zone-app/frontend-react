import {
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Switch,
} from "react-native";
import { Text, View, GetColors } from "../../components/themed";
import { AuthStackScreenProps } from "../../types/screens";
import Button from "../../components/button";
import { useContext, useEffect, useState } from "react";
import { RegisterContext } from "../../constants/RegisterContext";
import DropDownPicker from "react-native-dropdown-picker";
import { UserPrivacy } from "../../types/user";
import useUserLocalStorage from "../../hooks/useLocalStorage";
import * as Location from "expo-location";
import Toast from "react-native-root-toast";

export default function SettingScreen({
    navigation,
    route
}: AuthStackScreenProps<"SettingScreen">) {
    const { backgroundColor } =
        GetColors();
    const username = route.params.username;
    const [triggerLocationReq, setTriggerLoc] = useState(false);
    const [oneTimeTrigger, setOneTimeTrigger] = useState(false);
    const { userSetting, setUserSetting } = useUserLocalStorage().setting;
    const [locPermOpen, setlocPermOpen] = useState(false);
    const [locPermvalue, setlocPermValue] = useState<UserPrivacy>(
        UserPrivacy.FRIENDS
    );
    const [locPermItems, setlocPermItems] = useState([
        { label: "Friends", value: "FRIENDS" },
        { label: "Nobody", value: "NOBODY" },
    ]);
    const [eventPermOpen, setEventPermOpen] = useState(false);
    const [eventPermvalue, setEventPermValue] = useState<UserPrivacy>(
        UserPrivacy.FRIENDS
    );
    const [eventPermItems, setEventPermItems] = useState([
        { label: "Friends", value: "FRIENDS" },
        { label: "Everyone", value: "EVERYONE" },
        { label: "Nobody", value: "NOBODY" },
    ]);

    useEffect(() => {
        async function reqLoc() {
            setOneTimeTrigger(true);
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Toast.show(
                    "Some features will be disabled by disabling location permission",
                    {
                        duration: Toast.durations.LONG,
                    }
                );

                return;
            } else {
                Toast.show(
                    "We NEVER share your location to third-party apps.",
                    {
                        duration: Toast.durations.LONG,
                    }
                );
                return;
            }
        }
        if (triggerLocationReq && !oneTimeTrigger && !userSetting.location) reqLoc();
    }, [triggerLocationReq, userSetting]);

    return (
        <SafeAreaView
            style={{
                ...styles.container,
                backgroundColor: backgroundColor,
            }}
        >
            <View
                style={{
                    width: "100%",
                    maxHeight: "20%",
                    flex: 1,
                    alignItems: "center",
                }}
            >
                <Text
                    style={{
                        fontSize: 30,
                        fontWeight: "600",
                    }}
                >
                    Hi, {username} 😊
                </Text>
                <Text
                    style={{
                        fontSize: 14,
                        fontWeight: "500",
                        maxWidth: "80%",
                        textAlign: "center",
                    }}
                >
                    To enhance your app experience, we'd like to request a few
                    personalization details
                </Text>
            </View>
            <View
                style={{
                    width: "100%",
                    flex: 1,
                    alignItems: "center",
                }}
            >
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 50,
                    }}
                >
                    <View>
                        <Text
                            style={{
                                fontSize: 22,
                                fontWeight: "600",
                                textAlign: "center",
                            }}
                        >
                            Who can access your location?
                        </Text>
                        <Text
                            style={{
                                fontSize: 14,
                                fontWeight: "500",
                                marginTop: 10,
                                textAlign: "center",
                                maxWidth: "80%",
                            }}
                        >
                            Only for event discovery
                            within your location and never share it with
                            others third-party apps.
                        </Text>
                    </View>
                    <View
                        style={{
                            maxWidth: "80%",
                            marginTop: 10,
                        }}
                    >
                        <DropDownPicker
                            style={{
                                zIndex: 1,
                            }}
                            open={locPermOpen}
                            value={locPermvalue}
                            items={locPermItems}
                            setOpen={setlocPermOpen}
                            setValue={setlocPermValue}
                            setItems={setlocPermItems}
                            onPress={() => setTriggerLoc(true)}
                            disabled={!userSetting.location && triggerLocationReq ? true : false}
                        />
                    </View>
                </View>
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 50,
                        zIndex: -1,
                    }}
                >
                    <View>
                        <Text
                            style={{
                                fontSize: 22,
                                fontWeight: "600",
                                textAlign: "center",
                            }}
                        >
                            Who can invite you to events?
                        </Text>
                        <Text
                            style={{
                                fontSize: 14,
                                fontWeight: "500",
                                marginTop: 10,
                                textAlign: "center",
                                maxWidth: "80%",
                            }}
                        >
                            You can choose who invites you to events: just
                            friends or everyone nearby (parties/festivals).
                        </Text>
                    </View>
                    <View
                        style={{
                            maxWidth: "80%",
                            marginTop: 10,
                        }}
                    >
                        <DropDownPicker
                            open={eventPermOpen}
                            value={eventPermvalue}
                            items={eventPermItems}
                            setOpen={setEventPermOpen}
                            setValue={setEventPermValue}
                            setItems={setEventPermItems}
                        />
                    </View>
                </View>
                <View
                    style={{
                        marginTop: "auto",
                        alignItems: "flex-end",
                        width: "90%",
                        justifyContent: "flex-end",
                        paddingVertical: 30,
                    }}
                >
                    <Button
                        reference={() => navigation.push("EmailScreen", {
                            setting: {
                                location: locPermvalue,
                                event: eventPermvalue,
                            },
                            username
                        })}
                        placeholder="Continue"
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
    },
});
