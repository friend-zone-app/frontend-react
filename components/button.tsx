import { GestureResponderEvent, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import { GetColors, Text } from "./themed";

export default function Button({ reference, placeholder, style, textStyle }: { style?: ViewStyle, textStyle?: TextStyle, placeholder: any, reference: ((event: GestureResponderEvent) => void) }) {
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
                ...style
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
