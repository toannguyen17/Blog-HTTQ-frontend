export interface UserDetail {
    id?: number;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    birthday?: any;
    gender?: string;
    address?: string;
    user_id?: number;
    avatar?: number;
    createdAt?: Date;
    updateAt?: Date;
    attempts?: number;
    enabled?: boolean;
    accountNonExpired?: boolean;
    credentialsNonExpired?: boolean;
    accountNonLocked?: boolean;
}
