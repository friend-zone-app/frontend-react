import { FontAwesome } from "@expo/vector-icons";
import { TextStyle } from "react-native";

export default function Icon(props: {
    name: React.ComponentProps<typeof FontAwesome>["name"];
    color: string;
    size?: number;
    style?: TextStyle;
}) {
    return (
        <FontAwesome
            size={props.size ? props.size : 30}
            style={{ marginBottom: -3 }}
            {...props}
        />
    );
}
