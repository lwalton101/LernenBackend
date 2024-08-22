export interface User {
    user_id?: number;
    username: string;
    email: string;
    password: string;
    account_creation_date?: Date;
    profile_pic?: string;
}