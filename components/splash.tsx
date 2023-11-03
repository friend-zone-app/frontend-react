import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../components/themed';
import { StyleSheet } from 'react-native';


export default function Splash() {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Why not Not loading!</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})