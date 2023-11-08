import { RootStackScreenProps } from "../../types/screens";
import { Text, View } from "../../components/themed";

export default function NotFoundScreen({
    navigation,
}: RootStackScreenProps<"NotFound">) {
    return (
        <View>
            <Text>Not Found!</Text>
        </View>
    );
}
