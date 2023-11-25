import { useEffect, useState } from "react";
import TextInput2 from "../../components/textInput";
import { View, Text, GetColors } from "../../components/themed";
import { RootTabScreenProps } from "../../types/screens";
import { Image, Platform, ScrollView, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { EventType } from "../../types/user";
import { useLazyQuery } from "@apollo/client";
import { GET_LOCATION_BY_ADDRESS } from "../../graphql/queries/getLocation";
import useUserLocalStorage from "../../hooks/useLocalStorage";
import { Location } from "../../types/user";
import * as Linking from "expo-linking";
import Button from "../../components/button";
import Toast from "react-native-root-toast";
import selfieUrl, { generateSelfieSequence } from "../../constants/selfieUrl";

export default function CreateEvent({
    navigation,
}: RootTabScreenProps<"CreateEvent">) {
    const { textColor, backgroundColor, secondaryColor } = GetColors();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [typeOpen, setTypeOpen] = useState(false);
    const [typeValue, setTypeValue] = useState<EventType>(
        EventType.CELEBRATION
    );
    const [typeItems, setTypeItems] = useState([
        { label: "School", value: "SCHOOL" },
        { label: "Work", value: "WORK" },
        { label: "Party", value: "Party" },
        { label: "Festival", value: "FESTIVAL" },
        { label: "Date", value: "DATE" },
        { label: "Birthday", value: "BIRTHDAY" },
        { label: "Celebration", value: "CELEBRATION" },
    ]);
    const { accessToken } = useUserLocalStorage().token;
    const [addressExist, setAddressExist] = useState(false);
    const [findAddress, { loading, error, data, called, refetch }] =
        useLazyQuery(GET_LOCATION_BY_ADDRESS, {
            context: {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        });
    const [locationData, setLocationData] = useState<Location>();
    const [selfieSequence] = useState(generateSelfieSequence())

    useEffect(() => {
        if (!called) return;
        if (loading) return;
        if (error) {
            console.error(error);
            Toast.show("Failed to get location, restart the app!", {
                duration: Toast.durations.LONG,
            });
            return;
        }

        if (data.getLocationDataByAddress.name.length > 2) {
            setAddressExist(true);
            setLocationData(data.getLocationDataByAddress);
            setAddress(locationData?.name || address);
        }
    }, [called, loading, error, data]);

    return (
        <ScrollView
            contentContainerStyle={{
                alignItems: "center",
                height: "150%",
            }}
            style={{
                ...styles.container,
                backgroundColor,
            }}
        >
            <View
                style={{
                    minHeight: "60%",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <View
                    style={{
                        maxWidth: "90%",
                        maxHeight: 332,
                        flex: 1,
                        aspectRatio: 1 / 1,
                        borderWidth: 3,
                        borderColor: textColor,
                        borderRadius: 18,
                        marginTop: 30,
                        backgroundColor: textColor,
                    }}
                >
                    <Image
                        source={selfieUrl[selfieSequence]}
                        style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            borderRadius: 18,
                            objectFit: "contain",
                            backgroundColor: "#000",
                        }}
                    />
                </View>
                <Text
                    style={{
                        textAlign: "center",
                        color: secondaryColor,
                        fontWeight: "500",
                        fontSize: 18,
                        marginTop: 6,
                    }}
                >
                    This is a pose suggestion for today.
                </Text>
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Button
                        placeholder={""}
                        reference={() => {
                            console.log("call camera");
                        }}
                        style={{
                            backgroundColor,
                            borderWidth: 4,
                            aspectRatio: 1 / 1,
                            borderRadius: 100,
                        }}
                    />
                </View>
            </View>
            <View
                style={{
                    margin: 10,
                    width: "90%",
                    borderWidth: 2,
                    borderColor: secondaryColor,
                    borderRadius: 10,
                    justifyContent: "center",
                }}
            >
                <TextInput2
                    style={{
                        fontSize: 20,
                        color: textColor,
                        fontWeight: "600",
                        padding: 5,
                        paddingLeft: 10,
                    }}
                    placeholder="Title"
                    placeholderTextColor={textColor}
                    autoCapitalize="sentences"
                    value={title}
                    placeholderStyle={{
                        fontSize: 20,
                        color: secondaryColor,
                    }}
                    onChangeText={setTitle}
                />
                <TextInput2
                    style={{
                        fontSize: 16,
                        color: textColor,
                        fontWeight: "500",
                        borderTopColor: secondaryColor,
                        borderWidth: 2,
                        padding: 5,
                        paddingLeft: 10,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        borderLeftWidth: 0,
                        borderRightWidth: 0,
                        borderBottomWidth: 0,
                        marginBottom: 14,
                    }}
                    placeholder="Notes"
                    placeholderTextColor={textColor}
                    autoCapitalize="sentences"
                    value={description}
                    placeholderStyle={{
                        fontSize: 16,
                        color: secondaryColor,
                        fontWeight: "400",
                    }}
                    onChangeText={setDescription}
                />
            </View>
            <View
                style={{
                    maxWidth: "90%",
                    marginTop: 20,
                }}
            >
                <DropDownPicker
                    style={{
                        zIndex: 1,
                    }}
                    textStyle={{
                        fontSize: 16,
                        fontWeight: "500",
                    }}
                    placeholder="Event type"
                    open={typeOpen}
                    value={typeValue}
                    items={typeItems}
                    setOpen={setTypeOpen}
                    setValue={setTypeValue}
                    setItems={setTypeItems}
                    listMode="SCROLLVIEW"
                    dropDownContainerStyle={{
                        maxHeight: "400%",
                    }}
                />
            </View>
            <View
                style={{
                    width: "90%",
                    marginTop: 20,
                    zIndex: -1,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                    }}
                >
                    <TextInput2
                        style={{
                            fontSize: 14,
                            color: textColor,
                            fontWeight: "500",
                            borderColor: secondaryColor,
                            borderRadius: 10,
                            borderWidth: 2,
                            padding: 5,
                            paddingLeft: 10,
                            paddingVertical: 10,
                            marginTop: 10,
                            flex: 1,
                        }}
                        placeholder="Your events address"
                        placeholderTextColor={textColor}
                        autoCapitalize="sentences"
                        value={address}
                        placeholderStyle={{
                            fontSize: 16,
                            color: secondaryColor,
                            fontWeight: "500",
                        }}
                        onChangeText={setAddress}
                        onSubmitEditing={() => {
                            if (!address) return;
                            if(address === "/here") {
                                setAddressExist(true);
                            }
                            if (!called && address.length > 4)
                                findAddress({
                                    variables: {
                                        address,
                                    },
                                });
                            else {
                                refetch({
                                    address,
                                });
                            }
                        }}
                        onPressIn={() => {
                            Toast.show("Type /here for current location :)", {
                                duration: Toast.durations.SHORT
                            })
                        }}
                    />
                    <Button
                        placeholder="Map"
                        reference={() => {
                            if (!locationData) return;
                            const coors = locationData.point.coordinates;
                            console.log(coors);
                            const scheme = Platform.select({
                                ios: "maps://0,0?q=",
                                android: "geo:0,0?q=",
                            });
                            const latLng = `${coors[0]},${coors[1]}`;
                            const label = title || "Your FriendZone event!";
                            const url = Platform.select({
                                ios: `${scheme}${label}@${latLng}`,
                                android: `${scheme}${latLng}(${label})`,
                            });
                            url ? Linking.openURL(url) : null;
                        }}
                        style={{
                            minWidth: 10,
                            width: "auto",
                            justifyContent: "center",
                            marginLeft: 5,
                            display: addressExist ? "flex" : "none",
                        }}
                    />
                </View>
            </View>
            <View
                style={{
                    maxWidth: "90%",
                    marginTop: 24,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Text
                    style={{
                        fontSize: 16,
                        fontWeight: "500",
                        width: "78%",
                        borderWidth: 2,
                        borderRadius: 10,
                        padding: 10,
                        marginRight: "2%",
                    }}
                >
                    Add your friends
                </Text>
                <Button
                    placeholder={"find"}
                    reference={() => {}}
                    style={{
                        margin: 0,
                        marginTop: 0,
                        padding: 10,
                    }}
                    textStyle={{
                        fontSize: 16,
                        margin: 0,
                    }}
                />
            </View>
            <Button
                placeholder={"Straight to the internet!"}
                reference={() => {}}
                style={{
                    marginTop: 32,
                    width: "90%",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 10,
                }}

                textStyle={{
                    width: "100%",
                    textAlign: "center",
                    fontSize: 14,
                }}
            />
        </ScrollView>
    );
}

const event = {
    title: "Hello World!",
    description: "This is the first post",
    location: [1.2345, 0.45567],
    startsAt: "2023-11-16T08:45:12.123456789Z",
    endsAt: "2023-11-16T09:45:12.123456789Z",
    inviters: [],
    type: "SCHOOL",
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "300%",
    },
});
