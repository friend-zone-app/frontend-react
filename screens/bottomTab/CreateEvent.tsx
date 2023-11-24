import { useEffect, useState } from "react";
import TextInput2 from "../../components/textInput";
import { View, Text, GetColors } from "../../components/themed";
import { RootTabScreenProps } from "../../types/screens";
import { Platform, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { EventType } from "../../types/user";
import { useLazyQuery } from "@apollo/client";
import { GET_LOCATION_BY_ADDRESS } from "../../graphql/queries/getLocation";
import useUserLocalStorage from "../../hooks/useLocalStorage";
import { Location } from "../../types/user";
import * as Linking from "expo-linking";
import Button from "../../components/button";
import {
    DateTimePickerAndroid,
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import Toast from "react-native-root-toast";

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

    useEffect(() => {
        if (!called) return;
        if (loading) return;
        if (error) {
            console.error(error);
            Toast.show("Failed to get location, restart the app!", {
                duration: Toast.durations.LONG
            })
            return;
        }

        if (data.getLocationDataByAddress.name.length > 2) {
            setAddressExist(true);
            setLocationData(data.getLocationDataByAddress);
            setAddress(locationData?.name || address);
        }
    }, [called, loading, error, data, locationData, addressExist]);

    const [date, setDate] = useState<number>(0);
    const [endDate, setEndDate] = useState<number>(0);
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [startDate2, setStartDate2] = useState<Date>(new Date());

    const onChange = (
        event: DateTimePickerEvent,
        dateState: number,
        setDateState: React.Dispatch<React.SetStateAction<number>>,
        selectedDate?: Date
    ) => {
        if (!selectedDate || event.type != "set") {
            setDateState(0);
            setStartDate(new Date());
            setStartDate2(new Date());
            return;
        }
        const currentDate = selectedDate.valueOf();
        if (dateState == 0) {
            setDateState(currentDate);
        } else {
            const now = startDate.valueOf();
            const targetDate = currentDate - now + dateState;
            setDateState(targetDate);
        }
    };

    useEffect(() => {
        if (startDate.valueOf() == 0 || date == 0) return;
        showMode("time", date, setDate, startDate);
        setStartDate(new Date(0));
    }, [date, startDate]);

    useEffect(() => {
        if (startDate2.valueOf() == 0 || endDate == 0) return;
        showMode("time", endDate, setEndDate, date ? new Date(date) : new Date());
        setStartDate2(new Date(0));
    }, [endDate, startDate2]);

    const showMode = (
        currentMode: "date" | "time",
        targetDate: number,
        setTargetDate: React.Dispatch<React.SetStateAction<number>>,
        startDate: Date,
    ) => {
        DateTimePickerAndroid.open({
            value: startDate,
            onChange: (event: DateTimePickerEvent, selectedDate?: Date) => {
                onChange(event, targetDate, setTargetDate, selectedDate);
            },
            mode: currentMode,
            is24Hour: true,
        });
    };

    return (
        <View
            style={{
                ...styles.container,
                backgroundColor: backgroundColor,
            }}
        >
            <Text
                style={{
                    fontSize: 30,
                    fontWeight: "600",
                }}
            >
                Add new event 📌
            </Text>
            <View
                style={{
                    margin: 10,
                    width: "90%",
                    borderWidth: 1,
                    borderColor: secondaryColor,
                    borderRadius: 10,
                    justifyContent: "center",
                    marginTop: 32,
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
                    placeholderStyle={{ fontSize: 20, color: secondaryColor }}
                    onChangeText={setTitle}
                />
                <TextInput2
                    style={{
                        fontSize: 16,
                        color: textColor,
                        fontWeight: "500",
                        borderTopColor: secondaryColor,
                        borderWidth: 1,
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
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: "600",
                        margin: 10,
                    }}
                >
                    Event type
                </Text>
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
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: "600",
                        margin: 10,
                    }}
                >
                    Find your event's location
                </Text>
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
                            borderWidth: 1,
                            padding: 5,
                            paddingLeft: 10,
                            paddingVertical: 10,
                            marginTop: 10,
                            flex: 1,
                        }}
                        placeholder="Address"
                        placeholderTextColor={textColor}
                        autoCapitalize="sentences"
                        value={address}
                        placeholderStyle={{
                            fontSize: 16,
                            color: secondaryColor,
                            fontWeight: "400",
                        }}
                        onChangeText={setAddress}
                        onSubmitEditing={() => {
                            if (!address) return;
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

                            console.log(url);

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
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: "600",
                        margin: 10,
                        marginTop: 30,
                    }}
                >
                    Your event time/date
                </Text>
                <View
                    style={{
                        marginTop: 20,
                        borderWidth: 0.7,
                        borderColor: textColor,
                        padding: 8,
                        paddingTop: 0,
                        borderRadius: 10,
                        justifyContent: "center",
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: "600",
                            }}
                        >
                            {startDate.valueOf()
                                ? "Event date's start"
                                : new Date(date).toLocaleString()}
                        </Text>
                        <Button
                            placeholder="Start"
                            reference={() => {
                                showMode("date", date, setDate, startDate);
                            }}
                            style={{
                                minWidth: 90,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: "600",
                            }}
                        >
                            {startDate2.valueOf()
                                ? "Event date's end"
                                : new Date(endDate).toLocaleString()}
                        </Text>
                        <Button
                            placeholder="End"
                            reference={() => {
                                showMode("date", endDate, setEndDate, date ? new Date(date) : startDate2);
                            }}
                            style={{
                                minWidth: 90,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        />
                    </View>
                </View>
            </View>
        </View>
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
        height: "100%",
        width: "100%",
        alignItems: "center",
    },
});
