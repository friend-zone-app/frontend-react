import { FontAwesome } from "@expo/vector-icons";

export default function Icon(props: {
    name: React.ComponentProps<typeof FontAwesome>["name"];
    color: string;
    size?: number;
  }) {
    return <FontAwesome size={props.size ? props.size : 30} style={{ marginBottom: -3 }} {...props} />;
  }