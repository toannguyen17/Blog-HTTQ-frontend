﻿import {UserRole} from './user-role';

export class User {
    id: number;
    email: string;
    lastName: string;
    firstName: string;
    phone: string;
    address: null;
    roles: Array<UserRole>;
}
