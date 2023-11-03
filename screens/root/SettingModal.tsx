import {
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
  } from "react-native";
  import { useContext } from "react";
  
  import { Text, View } from "../../components/themed";
  import { RootStackScreenProps } from "../../types/screens";
  import { AuthContext } from "../../constants/AuthContext";
  
  export default function SettingModal({
    navigation,
  }: RootStackScreenProps<"Setting">) {
    const { signOut } = useContext(AuthContext);
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />
        <Text style={styles.title}>This is the setting modal</Text>
        <TouchableOpacity onPress={() => signOut()} style={styles.link}>
          <Text style={styles.linkText}>LogOut</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
    link: {
      marginTop: 15,
      paddingVertical: 15,
    },
    linkText: {
      fontSize: 14,
      color: "#2e78b7",
    },
  });