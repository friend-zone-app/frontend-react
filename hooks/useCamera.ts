import { useEffect } from "react";
import { useCameraDevice, useCameraPermission } from "react-native-vision-camera";

export default function useCamera({ camera }: { camera: "back" | "front" }) {
    const { hasPermission, requestPermission } = useCameraPermission();

    useEffect(() => {
        if(!hasPermission) {
            requestPermission();
        }
    }, [hasPermission])

    return useCameraDevice(camera);
}