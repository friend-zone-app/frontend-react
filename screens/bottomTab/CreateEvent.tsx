import { RefObject, useEffect, useRef, useState } from "react";
import TextInput2 from "../../components/textInput";
import { View, Text, GetColors } from "../../components/themed";
import { RootTabScreenProps } from "../../types/screens";
import {
	Image,
	Platform,
	Pressable,
	ScrollView,
	StyleSheet,
} from "react-native";
import { EventType } from "../../types/user";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
	GET_LOCATION_BY_ADDRESS,
	GET_LOCATION_BY_POINT,
} from "../../graphql/queries/getLocation";
import useUserLocalStorage from "../../hooks/useLocalStorage";
import { Location } from "../../types/user";
import * as Linking from "expo-linking";
import Button from "../../components/button";
import Toast from "react-native-root-toast";
import selfieUrl, { generateSelfieSequence } from "../../constants/selfieUrl";
import * as GeoLocation from "expo-location";
import useDropDownMenu from "../../hooks/useDropDownMenu";
import { Camera } from "react-native-vision-camera";
import { CREATE_EVENT } from "../../graphql/mutation/events";
import CameraComponent from "./_camera/Camera";
import CameraButton from "./_camera/CameraButton";

export default function CreateEvent({
	navigation,
}: RootTabScreenProps<"CreateEvent">) {
	const { textColor, backgroundColor, secondaryColor } = GetColors();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [address, setAddress] = useState("");
	const [startTakingPic, setStartTakingPic] = useState<null | boolean>(false);
	const [picUrl, setPicUrl] = useState("");
	const camera = useRef<Camera>(null);

	const { component: DropDownMenu, typeValue } = useDropDownMenu({
		items: [
			{ label: "School", value: "SCHOOL" },
			{ label: "Work", value: "WORK" },
			{ label: "Party", value: "Party" },
			{ label: "Festival", value: "FESTIVAL" },
			{ label: "Date", value: "DATE" },
			{ label: "Birthday", value: "BIRTHDAY" },
			{ label: "Celebration", value: "CELEBRATION" },
		],
		placeholder: "Event Type",
		defaultState: EventType.CELEBRATION,
		style: {
			zIndex: 1,
		},
		textStyle: {
			fontSize: 16,
			fontWeight: "500",
		},
		dropDownContainerStyle: {
			maxHeight: "400%",
		},
	});

	const { accessToken } = useUserLocalStorage().token;
	const [addressExist, setAddressExist] = useState(false);
	const [findAddress, { loading, error, data, called, refetch }] =
		useLazyQuery(GET_LOCATION_BY_ADDRESS, {
			context: {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			},
		});
	const [
		findPoint,
		{ loading: loading2, error: error2, data: data2, called: called2 },
	] = useLazyQuery(GET_LOCATION_BY_POINT, {
		context: {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		},
	});
	const [locationData, setLocationData] = useState<Location>();
	const [selfieSequence] = useState(generateSelfieSequence());

	useEffect(() => {
		if (!called) return;
		if (loading) return;
		if (error) {
			console.error(error);
			Toast.show("Failed to get location, restart the app!", {
				duration: Toast.durations.LONG,
			});
			return;
		}

		if (data.getLocationDataByAddress.name.length > 2) {
			setAddressExist(true);
			setLocationData(data.getLocationDataByAddress);
			setAddress(locationData?.name || address);
		}
	}, [called, loading, error, data]);

	useEffect(() => {
		if (!called2) return;
		if (loading2) return;
		if (error2) {
			console.error(error2);
			Toast.show("Failed to get location, restart the app!", {
				duration: Toast.durations.LONG,
			});
			return;
		}

		if (data2.getLocationDataByPoint) {
			setAddressExist(true);
			setLocationData(data2.getLocationDataByPoint);
			setAddress(locationData?.name || address);
		}
	}, [called2, loading2, error2, data2]);

	const [
		createEvent,
		{
			loading: createLoading,
			error: createError,
			data: createData,
			called: createCalled,
		},
	] = useMutation(CREATE_EVENT, {
		context: {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		},
	});

	return (
		<ScrollView
			contentContainerStyle={{
				alignItems: "center",
				height: "165%",
			}}
			style={{
				...styles.container,
				backgroundColor,
			}}
		>
			<View
				style={{
					minHeight: "60%",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<View
					style={{
						maxWidth: "90%",
						maxHeight: "60%",
						flex: 1,
						aspectRatio: 4 / 3,
						borderWidth: 3,
						borderColor: textColor,
						marginTop: 30,
						backgroundColor,
						flexDirection: "row",
					}}
				>
					<Pressable
						style={{
							maxWidth: "100%",
							maxHeight: "100%",
							borderRadius: 1,
							backgroundColor: "#000",
							display: startTakingPic ? "none" : "flex",
						}}
						onPress={() => {
							setStartTakingPic(true);
						}}
						disabled={startTakingPic == null}
					>
						<Image
							source={selfieUrl[selfieSequence]}
							style={{
								maxWidth: "100%",
								maxHeight: "100%",
								borderRadius: 1,
								objectFit: "cover",
								backgroundColor: "#000",
							}}
						/>
					</Pressable>

					{startTakingPic ? <CameraComponent camera={camera}/> : null}
				</View>
				<Text
					style={{
						textAlign: "center",
						color: secondaryColor,
						fontWeight: "500",
						fontSize: 18,
						marginTop: 6,
						maxWidth: "90%",
					}}
				>
					{startTakingPic != null
						? `This is a pose suggestion for today.${"\n"} Tap on the canvas to start taking picture`
						: "Scroll down, to fill event's information and share it to your friends."}
				</Text>
				<CameraButton camera={camera} setPicUrl={setPicUrl} setStartTakingPic={setStartTakingPic} />
			</View>
			<View
				style={{
					margin: 10,
					width: "90%",
					borderWidth: 2,
					borderColor: secondaryColor,
					borderRadius: 10,
					justifyContent: "center",
				}}
			>
				<TextInput2
					style={{
						fontSize: 20,
						color: textColor,
						fontWeight: "600",
						padding: 5,
						paddingLeft: 10,
					}}
					placeholder="Title"
					placeholderTextColor={textColor}
					autoCapitalize="sentences"
					value={title}
					placeholderStyle={{
						fontSize: 20,
						color: secondaryColor,
					}}
					onChangeText={setTitle}
				/>
				<TextInput2
					style={{
						fontSize: 16,
						color: textColor,
						fontWeight: "500",
						borderTopColor: secondaryColor,
						borderWidth: 2,
						padding: 5,
						paddingLeft: 10,
						borderBottomLeftRadius: 10,
						borderBottomRightRadius: 10,
						borderLeftWidth: 0,
						borderRightWidth: 0,
						borderBottomWidth: 0,
						marginBottom: 14,
					}}
					placeholder="Notes"
					placeholderTextColor={textColor}
					autoCapitalize="sentences"
					value={description}
					placeholderStyle={{
						fontSize: 16,
						color: secondaryColor,
						fontWeight: "400",
					}}
					onChangeText={setDescription}
				/>
			</View>
			<View
				style={{
					maxWidth: "90%",
					marginTop: 20,
				}}
			>
				<DropDownMenu />
			</View>
			<View
				style={{
					width: "90%",
					marginTop: 20,
					zIndex: -1,
				}}
			>
				<View
					style={{
						flexDirection: "row",
					}}
				>
					<TextInput2
						style={{
							fontSize: 14,
							color: textColor,
							fontWeight: "500",
							borderColor: secondaryColor,
							borderRadius: 10,
							borderWidth: 2,
							padding: 5,
							paddingLeft: 10,
							paddingVertical: 10,
							marginTop: 10,
							flex: 1,
						}}
						placeholder="Your events address"
						placeholderTextColor={textColor}
						autoCapitalize="sentences"
						value={address}
						placeholderStyle={{
							fontSize: 16,
							color: secondaryColor,
							fontWeight: "500",
						}}
						onChangeText={setAddress}
						onSubmitEditing={async () => {
							if (!address) return;
							if (address === "/here") {
								const location =
									await GeoLocation.getCurrentPositionAsync(
										{}
									);
								console.log(
									location.coords.accuracy,
									location.coords.latitude,
									location.coords.longitude
								);
								setAddress(
									location.coords.latitude +
										"," +
										location.coords.longitude
								);
								findPoint({
									variables: {
										lat: location.coords.latitude.toString(),
										long: location.coords.longitude.toString(),
									},
								});
							} else {
								if (!called && address.length > 4)
									findAddress({
										variables: {
											address,
										},
									});
								else {
									refetch({
										address,
									});
								}
							}
						}}
						onPressIn={() => {
							Toast.show("Type /here for current location :)", {
								duration: Toast.durations.SHORT,
							});
						}}
					/>
					<Button
						placeholder="Map"
						reference={() => {
							if (!locationData) return;
							const coors = locationData.point.coordinates;
							console.log(coors);
							const scheme = Platform.select({
								ios: "maps://0,0?q=",
								android: "geo:0,0?q=",
							});
							const latLng = `${coors[0]},${coors[1]}`;
							const label = title || "Your FriendZone event!";
							const url = Platform.select({
								ios: `${scheme}${label}@${latLng}`,
								android: `${scheme}${latLng}(${label})`,
							});
							url ? Linking.openURL(url) : null;
						}}
						style={{
							minWidth: 10,
							width: "auto",
							justifyContent: "center",
							marginLeft: 5,
							display: addressExist ? "flex" : "none",
						}}
					/>
				</View>
			</View>
			<View
				style={{
					maxWidth: "90%",
					marginTop: 24,
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					zIndex: -1,
				}}
			>
				<Text
					style={{
						fontSize: 16,
						fontWeight: "500",
						width: "78%",
						borderWidth: 2,
						borderRadius: 10,
						padding: 10,
						marginRight: "2%",
					}}
				>
					Add your friends
				</Text>
				<Button
					placeholder={"find"}
					reference={() => {}}
					style={{
						margin: 0,
						marginTop: 0,
						padding: 10,
					}}
					textStyle={{
						fontSize: 16,
						margin: 0,
					}}
				/>
			</View>
			<Button
				placeholder={"Straight to the internet!"}
				reference={() => {
					console.log({
						title,
						description,
						location: locationData
							? [
									locationData.point.coordinates[0],
									locationData.point.coordinates[1],
							  ]
							: [],
						inviters: [],
						type: typeValue,
						image: picUrl,
					});
					createEvent({
						variables: {
							Event: {
								title,
								description,
								location: locationData
									? [
											locationData.point.coordinates[0],
											locationData.point.coordinates[1],
									  ]
									: [0, 0],
								inviters: [],
								type: typeValue,
								image: picUrl,
							},
						},
					});
				}}
				style={{
					marginTop: 32,
					width: "90%",
					justifyContent: "center",
					alignItems: "center",
					padding: 10,
					zIndex: -1,
				}}
				textStyle={{
					width: "100%",
					textAlign: "center",
					fontSize: 14,
				}}
			/>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		height: "300%",
	},
});
