import { MMKVLoader, useMMKVStorage } from "react-native-mmkv-storage";

const userCredentials = new MMKVLoader().initialize();

export default function useUserLocalStorage() {
    const [token, setToken] = useMMKVStorage<string | null>('token', userCredentials, null);

    return {
        token: {
            token,
            setToken
        }
    }
}