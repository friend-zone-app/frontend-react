import { GestureResponderEvent, TouchableOpacity } from "react-native";
import { GetColors, Text } from "./themed";

export default function Button({ reference, placeholder }: { placeholder: string, reference: ((event: GestureResponderEvent) => void) }) {
    const { textColor, backgroundColor } = GetColors();

    return (
        <TouchableOpacity
            onPress={reference}
            style={{
                marginTop: 10,
                backgroundColor: textColor,
                padding: 5,
                paddingHorizontal: 20,
                borderRadius: 10,
            }}
        >
            <Text
                style={{
                    fontSize: 20,
                    color: backgroundColor,
                    fontWeight: "600",
                }}
            >
                {placeholder}
            </Text>
        </TouchableOpacity>
    );
}
