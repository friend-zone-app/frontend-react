export interface User {
    _id: string;
    username: string;
    displayName: string;
    email: string;
    biography?: string;
    avatar?: string;
    createdAt: string;
    events: string[];
    lastSignedIn: string;
}