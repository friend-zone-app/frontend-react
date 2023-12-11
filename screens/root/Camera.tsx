import { useIsFocused } from "@react-navigation/native";
import { GetColors, Text, View } from "../../components/themed";
import useCamera from "../../hooks/useCamera";
import { RootStackScreenProps } from "../../types/screens";
import {
    Camera,
    CameraDevice,
    useCameraFormat,
    useFrameProcessor,
} from "react-native-vision-camera";
import { useEffect, useRef, useState } from "react";
import { useIsForeground } from "../../hooks/useIsForeground";
import { usePreferredCameraDevice } from "../../hooks/usePreferredCameraDevice";
import Button from "../../components/button";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";

export default function CameraScreen({
    route,
}: RootStackScreenProps<"Camera">) {
    const { textColor, backgroundColor } = GetColors();



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
        </View>
    );
}

