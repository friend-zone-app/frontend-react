import { MMKVLoader, useMMKVStorage } from "react-native-mmkv-storage";
import { User } from "../types/user";

const userCredentialsInstance = new MMKVLoader().initialize();
const userDataInstance = new MMKVLoader().initialize();
const settingDataInstance = new MMKVLoader().initialize();

interface UserSetting {
    colorMode: "light" | "dark" | "system",
    location: boolean,
    cameraDeviceId?: string
}

export default function useUserLocalStorage() {
    const [accessToken, setAccessToken] = useMMKVStorage<string | null>('accessToken', userCredentialsInstance, null);
    const [refreshToken, setRefreshToken] = useMMKVStorage<string | null>('refreshToken', userCredentialsInstance, null);
    const [userData, setUserData] = useMMKVStorage<User | null>('userData', userDataInstance, null)
    const [userSetting, setUserSetting] = useMMKVStorage<UserSetting>('userSetting', settingDataInstance, { colorMode: "system", location: false, })

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
        },
        setting: {
            userSetting,
            setUserSetting
        }
    }
}