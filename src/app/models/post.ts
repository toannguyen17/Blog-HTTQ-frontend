import {Tag}        from './tag';
import {PostAuth}   from './post-auth';
import {PostStatus} from './post-status';

export class Post {
    id?: number;
    auth?: PostAuth;
    title: string;
    subTitle?: string;
    content: string;
    contentPlainText: string;
    status: PostStatus;
    tags?: Tag[];
    createdAt: Date;
    updatedAt: Date;
}
