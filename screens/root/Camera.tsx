import { useIsFocused } from "@react-navigation/native";
import { GetColors, Text, View } from "../../components/themed";
import useCamera from "../../hooks/useCamera";
import { RootStackScreenProps } from "../../types/screens";
import {
    Camera,
    CameraDevice,
    useCameraFormat,
} from "react-native-vision-camera";
import { useEffect, useRef, useState } from "react";
import { useIsForeground } from "../../hooks/useIsForeground";
import { usePreferredCameraDevice } from "../../hooks/usePreferredCameraDevice";
import Button from "../../components/button";

export default function CameraScreen({
    route,
}: RootStackScreenProps<"Camera">) {
    const { textColor, backgroundColor } = GetColors();

    const [cameraPosition, setCameraPosition] = useState<"front" | "back">(
        "back"
    );
    const [preferredDevice] = usePreferredCameraDevice();

    let device = useCamera({ camera: cameraPosition });

    if (
        preferredDevice != null &&
        preferredDevice.position === cameraPosition
    ) {
        device = preferredDevice;
    }

    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                width: "100%",
            }}
        >
            {device ? <CameraComponent device={device} /> : null}
        </View>
    );
}

function CameraComponent({ device }: { device: CameraDevice }) {
    const { textColor, backgroundColor } = GetColors();

    const camera = useRef<Camera>(null);

    const format = useCameraFormat(device, [
        { photoAspectRatio: 4 / 3 },
        { photoResolution: "max" },
    ]);

    const isFocussed = useIsFocused();
    const isForeground = useIsForeground();
    const isActive = isFocussed && isForeground;

    useEffect(() => {
        console.log(device);
    }, []);

    return (
        <View
            style={{
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                height: "100%",
            }}
        >
            <Text
                style={{
                    color: backgroundColor
                }}
            >Capture your Picture</Text>
            <View
                style={{
                    maxWidth: "92%",
                    maxHeight: "60%",
                    flex: 1,
                    aspectRatio: 3 / 4,
                    marginTop: 30,
                    backgroundColor: textColor,
                }}
            >
                <Camera
                    style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 18,
                    }}
                    ref={camera}
                    device={device}
                    isActive={isActive}
                    format={format}
                    photoHdr={true}
                    video={false}
                    photo={true}
                />
            </View>
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 20,
                }}
            >
                <Button
                    placeholder={""}
                    reference={async () => {
                        const image = await camera.current?.takePhoto();
                        console.log(image)
                    }}
                    style={{
                        backgroundColor,
                        borderWidth: 4,
                        aspectRatio: 1 / 1,
                        borderRadius: 100,
                        borderColor: textColor,
                    }}
                />
            </View>
        </View>
    );
}
