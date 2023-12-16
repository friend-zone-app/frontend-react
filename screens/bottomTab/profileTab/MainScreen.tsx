import { ProfileStackScreenProps } from "../../../types/screens";
import { GetColors, Text, View } from "../../../components/themed";
import {
	Image,
	Linking,
	Platform,
	StyleSheet,
	ScrollView,
	RefreshControl,
} from "react-native";
import useUserLocalStorage from "../../../hooks/useLocalStorage";
import { useQuery } from "@apollo/client";
import { GET_SELF_EVENTS } from "../../../graphql/queries/events";
import { useEffect, useState } from "react";
import { Event } from "../../../types/user";
import Button from "../../../components/button";

export default function MainScreen({
	navigation,
}: ProfileStackScreenProps<"MainScreen">) {
	const { backgroundColor, secondaryColor, textColor } = GetColors();
	const { userData } = useUserLocalStorage().user;
	const AVATAR_MAX_SIZE = 70;
	const { accessToken } = useUserLocalStorage().token;
	const [events, setEvents] = useState<Event[] | null>();
	const [refresh, setRefresh] = useState(false);

	const {
		data: eventsData,
		loading,
		error,
		refetch,
	} = useQuery(GET_SELF_EVENTS, {
		context: {
			headers: {
				Authorization: "Bearer " + accessToken,
			},
		},
		variables: {
			id: userData?._id,
		},
	});

	useEffect(() => {
		if (error) console.log(error);
		if (!eventsData || refresh) return;
		console.log(eventsData, error);
		setRefresh(false);
		setEvents(eventsData.getUserEvents);
	}, [loading, refresh]);

	return (
		<ScrollView
			style={{
				...styles.container,
				backgroundColor: backgroundColor,
			}}
			refreshControl={
				<RefreshControl
					refreshing={refresh}
					onRefresh={() => {
						setRefresh(true);
						refetch();
					}}
				/>
			}
		>
			{/* User header */}
			<View
				style={{
					width: "100%",
					height: "100%",
					flex: 1,
					justifyContent: "space-around",
					flexDirection: "row",
				}}
			>
				<View
					style={{
						flex: 1,
						flexDirection: "column",
						alignItems: "flex-start",
						padding: 16,
						height: "20%",
					}}
				>
					<Image
						source={
							userData?.avatar
								? { uri: userData.avatar }
								: require("../../../assets/avatar_placeholder.png")
						}
						style={{
							maxWidth: AVATAR_MAX_SIZE,
							maxHeight: AVATAR_MAX_SIZE,
						}}
					/>
					<View
						style={{
							marginTop: 10,
						}}
					>
						<Text
							style={{
								fontSize: 20,
								fontWeight: "600",
							}}
						>
							{userData?.displayName}
						</Text>
						<Text
							style={{
								fontSize: 14,
								color: secondaryColor,
								fontWeight: "500",
								marginLeft: 4,
							}}
						>
							{userData?.username.toLowerCase()}
						</Text>
					</View>
				</View>

				{/* Friends counts */}
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						width: "auto",
						maxHeight: "20%",
						flex: 1,
					}}
				>
					<View style={styles.userHeaderInformation}>
						<Text style={styles.userHeaderInformationTitle}>
							Friends
						</Text>
						<Text style={{ textAlign: "center" }}>
							{userData?.friendList?.length || 0}
						</Text>
					</View>
					<View style={styles.userHeaderInformation}>
						<Text style={styles.userHeaderInformationTitle}>
							Posts
						</Text>
						<Text style={{ textAlign: "center" }}>
							{userData?.posts?.length || 0}
						</Text>
					</View>
					<View
						style={{
							...styles.userHeaderInformation,
							marginRight: 0,
						}}
					>
						<Text style={styles.userHeaderInformationTitle}>
							Events
						</Text>
						<Text style={{ textAlign: "center" }}>
							{userData?.events?.length || 0}
						</Text>
					</View>
				</View>
			</View>

			{/* User events */}
			<View
				style={{
					maxWidth: "100%",
				}}
			>
				{events
					? events?.map((event, key) => {
							return (
								<View
									key={key}
									style={{
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<Image
										style={{
											objectFit: "cover",
											width: "80%",
											height: "auto",
											aspectRatio: 3 / 4,
										}}
										source={{
											uri:
												"https://cdn-worker.txzje.workers.dev/" +
												(event?.image || ""),
											method: "GET",
											headers: {
												Authorization:
													"Bearer " + accessToken,
											},
										}}
									/>
									<View
										style={{
											flexDirection: "row",
											justifyContent: "center",
											alignItems: "center",
											padding: 10,
											maxWidth: "70%",
											width: "70%",
										}}
									>
										<View
											style={{
												maxWidth: "80%",
											}}
										>
											<Text
												style={{
													fontSize: 20,
													color: textColor,
													marginLeft: 10,
													fontWeight: "600",
												}}
											>
												{event?.title}
											</Text>
											<View
												style={{
													justifyContent:
														"flex-start",
													alignItems: "center",
													flexDirection: "row",
													marginTop: 4,
												}}
											>
												<Image
													style={{
														maxWidth:
															AVATAR_MAX_SIZE -
															46,
														maxHeight:
															AVATAR_MAX_SIZE -
															46,
													}}
													source={
														userData?.avatar
															? {
																	uri: userData.avatar,
															}
															: require("../../../assets/avatar_placeholder.png")
													}
												/>
												<Text
													style={{
														fontWeight: "500",
														marginLeft: 6,
													}}
												>
													{userData?.displayName}
												</Text>
											</View>
										</View>

										<Button
											placeholder="Map"
											reference={() => {
												const scheme = Platform.select({
													ios: "maps://0,0?q=",
													android: "geo:0,0?q=",
												});
												const latLng = `${event.location.coordinates[0]},${event.location.coordinates[1]}`;
												const label =
													event.title ||
													"Your FriendZone event!";
												const url = Platform.select({
													ios: `${scheme}${label}@${latLng}`,
													android: `${scheme}${latLng}(${label})`,
												});
												url
													? Linking.openURL(url)
													: null;
											}}
											style={{
												margin: 0,
											}}
										/>
									</View>
								</View>
							);
					  })
					: null}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		height: "100%",
		width: "100%",
	},
	userHeaderInformation: {
		flexDirection: "column",
		marginRight: 14,
	},
	userHeaderInformationTitle: {
		fontSize: 16,
		fontWeight: "600",
	},
});
