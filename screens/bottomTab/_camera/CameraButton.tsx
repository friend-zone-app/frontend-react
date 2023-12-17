import { RefObject } from "react";
import Button from "../../../components/button";
import { GetColors, View } from "../../../components/themed";
import UploadImage from "../../../lib/upload";
import { Camera } from "react-native-vision-camera";
import useUserLocalStorage from "../../../hooks/useLocalStorage";

export default function CameraButton({ camera, setPicUrl, setStartTakingPic }: { setPicUrl: Function, setStartTakingPic: Function,camera: RefObject<Camera> }) {
	const { accessToken } = useUserLocalStorage().token;
	const { textColor, backgroundColor } = GetColors();

	return (
		<View
			style={{
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Button
				placeholder={""}
				reference={async () => {
					const file = await camera.current?.takePhoto();
					if (!file) return;
					const result = await fetch(`file://${file.path}`);
					const data = await result.blob();
					const url = await UploadImage(data, accessToken || "");
					setPicUrl(url || "");
					setStartTakingPic(null);
				}}
				style={{
					backgroundColor,
					borderWidth: 4,
					aspectRatio: 3 / 5,
					borderRadius: 100,
					borderColor: textColor,
					width: 30,
					height: 50,
					padding: 0,
				}}
			/>
		</View>
	);
}
