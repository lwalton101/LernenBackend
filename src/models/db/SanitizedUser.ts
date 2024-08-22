import {User} from "./User";

export interface SanitizedUser {
    user_id?: number;
    username: string;
    account_creation_date?: Date;
    profile_pic?: string;
}

export function sanitizeUser(user: User): SanitizedUser {
    return {
        user_id: user.user_id,
        username: user.username,
        account_creation_date: user.account_creation_date,
        profile_pic: user.profile_pic
    };
}