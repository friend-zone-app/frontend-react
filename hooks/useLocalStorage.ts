import { MMKVLoader, useMMKVStorage } from "react-native-mmkv-storage";
import { User } from "../types/user";

const userCredentialsInstance = new MMKVLoader().initialize();

const userDataInstance = new MMKVLoader().initialize();

export default function useUserLocalStorage() {
    const [accessToken, setAccessToken] = useMMKVStorage<string | null>('accessToken', userCredentialsInstance, null);
    const [refreshToken, setRefreshToken] = useMMKVStorage<string | null>('refreshToken', userCredentialsInstance, null);
    const [userData, setUserData] = useMMKVStorage<User | null>('userData', userDataInstance, null)

    return {
        token: {
            accessToken,
            refreshToken,
            setAccessToken,
            setRefreshToken,
        },
        user: {
            userData,
            setUserData
        }
    }
}