import { useState } from "react";
import TextInput2 from "../../components/textInput";
import { View, Text, GetColors } from "../../components/themed";
import { RootTabScreenProps } from "../../types/screens";
import { StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { EventType } from "../../types/user";
import useColorScheme from "../../hooks/useColorScheme";

export default function CreateEvent({
    navigation,
}: RootTabScreenProps<"CreateEvent">) {
    const { textColor, backgroundColor, secondaryColor } = GetColors();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [typeOpen, setTypeOpen] = useState(false);
    const [typeValue, setTypeValue] = useState<EventType>(EventType.CELEBRATION);
    const [typeItems, setTypeItems] = useState([
        { label: "School", value: "SCHOOL" },
        { label: "Work", value: "WORK" },
        { label: "Party", value: "Party" },
        { label: "Festival", value: "FESTIVAL" },
        { label: "Date", value: "DATE" },
        { label: "Birthday", value: "BIRTHDAY" },
        { label: "Celebration", value: "CELEBRATION" },
    ]);

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

            <View style={{
                maxWidth: "90%",
                marginTop: 20,
            }}>
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: "600",
                        margin: 10,
                    }}
                >Event type</Text>
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
                />
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
