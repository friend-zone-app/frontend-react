export interface AddAutomationInput {
    title: string;
    location: number[];
    description: string;
    startsAt: Date;
    endsAt?: Date | null;
    createdAt: Date;
    inviters?: InviteInput[];
    repeat?: WeekDays[];
}

export interface AddBadgeInput {
    type: BadgeType;
    value?: string | null;
    enabled: boolean;
}

export interface Badge {
    _id: string;
    type: BadgeType;
    value?: string | null;
    enabled: boolean;
    focused: boolean;
}

export interface CreateEventInput {
    title: string;
    description: string;
    location: number[];
    startsAt: Date;
    endsAt?: Date | null;
    inviters?: InviteInput[];
    type: EventType;
}

export interface CreatePostInput {
    title: string;
    time: number;
    inviters?: string[];
    cancelled?: boolean | null;
    expireIn?: number | null;
    location: number[];
}

export interface CreateUserArgs {
    username: string;
    password: string;
    email: string;
}

export interface EventAutomation {
    _id: string;
    title: string;
    location: Point;
    description: string;
    startsAt: Date;
    endsAt?: Date | null;
    createdAt: Date;
    inviters?: Invite[];
    repeat?: WeekDays[];
}

export interface EventPrivacy {
    whoCanJoin: WhoCanJoin;
    whoCanSee: WhoCanSee;
}

export interface FriendReq {
    createdAt: Date;
    status: boolean;
    user: string;
}

export interface Invite {
    status: boolean;
    inviteTo: string;
    createdAt: Date;
}

export interface InviteInput {
    inviteTo: string;
}

export interface Post {
    parentEvent: string;
    author: string;
    reactions?: Reaction[];
    imageUri: string;
    currentEmotion: ReactionType;
    title?: string | null;
}

export interface Privacy {
    shareLocation: UserPrivacy;
    reactionOnPost: UserPrivacy;
    joinPost: UserPrivacy;
    friendRequest: UserPrivacy;
}

export interface PrivacyInput {
    shareLocation: UserPrivacy;
    reactionOnPost: UserPrivacy;
    joinPost: UserPrivacy;
    friendRequest: UserPrivacy;
}

export interface Reaction {
    reactionType: ReactionType;
    createdAt: Date;
    author: string;
}

export interface User {
    _id: string;
    displayName: string;
    username: string;
    email: string;
    biography?: string | null;
    avatar?: string | null;
    createdAt: Date;
    events?: string[];
    posts?: string[];
    friendsReq?: FriendReq[];
    friendList?: string[];
    badges?: Badge[];
    level: number;
    setting: Setting;
}

export interface Setting {
    privacy: Privacy;
    colorMode: ColorMode;
    eventAutomation?: EventAutomation[];
}

export interface UserRes {
    user: User | null;
    token: Tokens | null;
}

export interface Tokens {
    accessToken: string;
    refreshToken: string;
}

export type Scalars = {
    ID: string
    String: string
    Boolean: boolean
    Int: number
    Float: number
  }
  
  /** Interception */
  export type Interception = {
    __typename?: "Interception"
    baseStreet: Scalars["String"]
    secondaryStreet1: Scalars["String"]
    intersectionType: Scalars["String"]
    displayName: Scalars["String"]
  }
  
  /** Address */
  export type Address = {
    __typename?: "Address"
    addressLine: Scalars["String"]
    adminDistrict: Scalars["String"]
    adminDistrict2: Scalars["String"]
    countryRegion: Scalars["String"]
    formattedAddress: Scalars["String"]
    intersection: Interception
    locality: Scalars["String"]
    postalCode: Scalars["String"]
    countryRegionIso2: Scalars["String"]
  }
  
  /** Geocodepoint */
  export type GeocodePoint = {
    __typename?: "GeocodePoint"
    type: Scalars["String"]
    coordinates: Array<Scalars["Float"]>
    calculationMethod: Scalars["String"]
    usageTypes: Array<Scalars["String"]>
  }
  
  /** Point */
  export type Point = {
    __typename?: "Point"
    type: Scalars["String"]
    coordinates: Array<Scalars["Float"]>
  }
  
  /** Location */
  export type Location = {
    __typename?: "Location"
    bbox: Array<Scalars["Float"]>
    name: Scalars["String"]
    point: Point
    address: Address
    confidence: Scalars["String"]
    entityType: Scalars["String"]
    geocodePoint: GeocodePoint
    matchCodes: Array<Scalars["String"]>
  }
  

export enum BadgeType {
    SPECIAL = "SPECIAL",
    ROLE = "ROLE",
    DAILY = "DAILY",
}

export enum ColorMode {
    LIGHT = "LIGHT",
    DARK = "DARK",
}

export enum EventType {
    SCHOOL = "SCHOOL",
    WORK = "WORK",
    PARTY = "PARTY",
    FESTIVAL = "FESTIVAL",
    DATE = "DATE",
    BIRTHDAY = "BIRTHDAY",
    CELEBRATION = "CELEBRATION",
}

export enum ReactionType {
    HAPPY = "HAPPY",
    HAHA = "HAHA",
    OMG = "OMG",
    WHAT = "WHAT",
    CONFUSE = "CONFUSE",
    SURPRISED = "SURPRISED",
}

export enum UserPrivacy {
    FRIENDS = "FRIENDS",
    EVERYONE = "EVERYONE",
    NOBODY = "NOBODY",
}

export enum WeekDays {
    MONDAY = "MONDAY",
    TUESDAY = "TUESDAY",
    WEDNESDAY = "WEDNESDAY",
    THURSDAY = "THURSDAY",
    FRIDAY = "FRIDAY",
    SATURDAY = "SATURDAY",
    SUNDAY = "SUNDAY",
}

export enum WhoCanJoin {
    LOCAL = "LOCAL",
    INVITE = "INVITE",
    APPROVAL = "APPROVAL",
}

export enum WhoCanSee {
    FRIENDS = "FRIENDS",
    FRIENDS_OF_FRIENDS = "FRIENDS_OF_FRIENDS",
    EVERYONE = "EVERYONE",
    PARTICIPANTS = "PARTICIPANTS",
    ONLY_FRIENDS = "ONLY_FRIENDS",
    ONLY_FRIENDS_OF_FRIENDS = "ONLY_FRIENDS_OF_FRIENDS",
}
