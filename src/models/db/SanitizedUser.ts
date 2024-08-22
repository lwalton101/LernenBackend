import {User} from "./User";

export interface SanitizedUser {
    userID?: number;
    username: string;
    accountCreationDate?: Date;
    profilePic?: string;
}

export function sanitizeUser(user: User): SanitizedUser {
    return {
        userID: user.userID,
        username: user.username,
        accountCreationDate: user.accountCreationDate,
        profilePic: user.profilePic
    };
}