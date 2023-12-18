import { Image, Linking, Platform } from "react-native";
import { Event } from "../types/user";
import { View, Text, GetColors } from "./themed";
import useUserLocalStorage from "../hooks/useLocalStorage";
import Button from "./button";
import Icon from "./icons";

export default function PostCard({ event }: { event: Event }) {
	const { textColor, backgroundColor, secondaryColor } = GetColors();
	const { accessToken } = useUserLocalStorage().token;
	const { userData } = useUserLocalStorage().user;
	const AVATAR_MAX_SIZE = 70;

	return (
		<View
			style={{
				justifyContent: "center",
				alignItems: "center",
				marginTop: 30,
			}}
		>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					padding: 10,
					width: "100%",
					backgroundColor: textColor,
				}}
			>
				<View
					style={{
						maxWidth: "70%",
						backgroundColor: "",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "row",
					}}
				>
					<Image
						style={{
							maxWidth: AVATAR_MAX_SIZE - 26,
							maxHeight: AVATAR_MAX_SIZE - 26,
						}}
						source={
							userData?.avatar
								? {
										uri: userData.avatar,
								  }
								: require("../assets/avatar_placeholder.png")
						}
					/>
					<View
						style={{
							justifyContent: "center",
							alignItems: "flex-start",
							flexDirection: "column",
							backgroundColor: "",
							marginLeft: 10,
						}}
					>
						<Text
							style={{
								fontWeight: "500",
								fontSize: 18,
								color: backgroundColor,
							}}
						>
							{userData?.displayName}
						</Text>
                        <Text
                            style={{
                                color: backgroundColor,
                                fontSize: 12,
                                marginTop: 4
                            }}
                        >
                            { new Date(event.createdAt).toLocaleTimeString().split(":").slice(0, 2).join(":") } - { new Date(event.createdAt).toLocaleDateString() }
                        </Text>
					</View>
				</View>

				<Button
					placeholder={
						<Icon name="map" color={textColor} size={26} />
					}
					reference={() => {
						const scheme = Platform.select({
							ios: "maps://0,0?q=",
							android: "geo:0,0?q=",
						});
						const latLng = `${event.location.coordinates[0]},${event.location.coordinates[1]}`;
						const label = event.title || "Your FriendZone event!";
						const url = Platform.select({
							ios: `${scheme}${label}@${latLng}`,
							android: `${scheme}${latLng}(${label})`,
						});
						url ? Linking.openURL(url) : null;
					}}
					style={{
						margin: 0,
						marginTop: 0,
						backgroundColor: backgroundColor,
						aspectRatio: 1 / 1,
						padding: 0,
						paddingHorizontal: 10,
						justifyContent: "center",
						alignItems: "center",
					}}
					textStyle={{
						color: textColor,
					}}
				/>
			</View>
			<View
				style={{
					justifyContent: "center",
					alignItems: "flex-start",
					flexDirection: "column",
					backgroundColor: textColor,
                    width: "100%",
                    padding: 10,
				}}
			>
				<Text
					style={{
						fontSize: 20,
						fontWeight: "600",
						color: backgroundColor,
					}}
				>
					{event?.title}
				</Text>
				<Text
					style={{
						fontSize: 12,
						fontWeight: "600",
						color: backgroundColor,
                        marginTop: 6,
					}}
				>
					{event?.description}
				</Text>
			</View>
			<Image
				style={{
					objectFit: "cover",
					width: "100%",
					height: "auto",
					aspectRatio: 3 / 4,
				}}
				source={{
					uri:
						"https://cdn-worker.txzje.workers.dev/" +
						(event.image || ""),
					method: "GET",
					headers: {
						Authorization: "Bearer " + accessToken,
					},
				}}
			/>
		</View>
	);
}
