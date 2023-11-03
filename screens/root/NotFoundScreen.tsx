import { RootStackScreenProps } from "../../types/screens";
import { Text } from '../../components/themed';

export default function NotFoundScreen({ navigation }: RootStackScreenProps<'NotFound'>) {
    return (
        <Text>Not Found!</Text>
    )
}