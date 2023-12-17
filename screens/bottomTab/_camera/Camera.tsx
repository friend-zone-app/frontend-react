import { useIsFocused } from "@react-navigation/native";
import { RefObject, useState, useEffect } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Camera, useCameraFormat } from "react-native-vision-camera";
import { useIsForeground } from "../../../hooks/useIsForeground";
import Reanimated, {
	interpolate,
	useAnimatedProps,
	useSharedValue,
} from "react-native-reanimated";
import useCamera from "../../../hooks/useCamera";
import { usePreferredCameraDevice } from "../../../hooks/usePreferredCameraDevice";
import { GetColors } from "../../../components/themed";

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);

export default function CameraComponent({
	camera,
}: {
	camera: RefObject<Camera>;
}) {
	const { textColor, backgroundColor, secondaryColor } = GetColors();
	const [cameraPosition, setCameraPosition] = useState<"front" | "back">(
		"back"
	);
	const [preferredDevice] = usePreferredCameraDevice();

	let device = useCamera({ camera: cameraPosition });
	if (!device) return null;

	if (
		preferredDevice != null &&
		preferredDevice.position === cameraPosition
	) {
		device = preferredDevice;
	}

	const format = useCameraFormat(device, [
		{
			photoHdr: true,
			photoResolution: { width: 1200, height: 1600 },
		},
	]);
	const zoom = useSharedValue(0);

	const isFocussed = useIsFocused();
	const isForeground = useIsForeground();
	const isActive = isFocussed && isForeground;
	const [enableNightMode, setEnableNightMode] = useState(false);
	const minZoom = device?.minZoom ?? 1;
	const maxZoom = Math.min(device?.maxZoom ?? 1, 10);

	const cameraAnimatedProps = useAnimatedProps(() => {
		const z = Math.max(Math.min(zoom.value, maxZoom), minZoom);
		console.log(z);
		return {
			zoom: 1,
		};
	}, [maxZoom, minZoom, zoom]);

	const neutralZoom = device?.neutralZoom ?? 1;
	useEffect(() => {
		// Run everytime the neutralZoomScaled value changes. (reset zoom when device changes)
		zoom.value = neutralZoom;
	}, [neutralZoom, zoom]);

	const pinch = Gesture.Pinch().onUpdate((event) => {
		const scale = interpolate(
			event.scale,
			[1 - 1 / 3, 1, 3],
			[-1, 0, 1],
			"clamp"
		);
		zoom.value = interpolate(
			scale,
			[-1, 0, 1],
			[minZoom, zoom.value, maxZoom],
			"clamp"
		);
		console.log(zoom.value);
	});

	const doubleTap = Gesture.Tap()
		.numberOfTaps(2)
		.onStart((event) => {
			setCameraPosition((p) => (p === "back" ? "front" : "back"));
		});

	const composed = Gesture.Simultaneous(pinch, doubleTap);

	return (
		<GestureDetector gesture={composed}>
			<Reanimated.View
				style={{
					position: "absolute",
					left: 0,
					right: 0,
					top: 0,
					bottom: 0,
					padding: 3,
					backgroundColor:textColor
				}}
			>
					<ReanimatedCamera
						style={{
							width: "100%",
							height: "100%",
							borderRadius: 18,
							borderWidth: 100
						}}
						ref={camera}
						device={device}
						isActive={isActive}
						format={format}
						photoHdr={true}
						lowLightBoost={
							device.supportsLowLightBoost && enableNightMode
						}
						video={false}
						photo={true}
						orientation={"portrait"}
						animatedProps={cameraAnimatedProps}
						enableZoomGesture={false}
						exposure={0}
					/>
				
			</Reanimated.View>
		</GestureDetector>
	);
}
