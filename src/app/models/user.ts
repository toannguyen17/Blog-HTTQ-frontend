import {UserRole} from './user-role';

export class User {
    id: number;
    email: string;
    lastName: string;
    firstName: string;
    avatar: string;
    phone: string;
    address: null;
    gender: string;
    roles: Array<UserRole>;
}
