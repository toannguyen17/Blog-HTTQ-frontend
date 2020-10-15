import {PostAuth}   from './post-auth';

export interface Comment {
    id?: number;
    auth?: PostAuth;
    content: string;
    like?: number;
    createdAt: Date;
    updatedAt: Date;
}
