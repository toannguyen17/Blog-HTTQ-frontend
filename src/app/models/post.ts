import {Tag}      from './tag';
import {PostAuth} from './post-auth';

export class Post {
    id?: number;
    auth?: PostAuth;
    title: string;
    subTitle?: string;
    content: string;
    contentPlainText: string;
    status: string;
    tags?: Tag[];
}
