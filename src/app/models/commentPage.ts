import {Comment}                            from './comment';

export interface CommentPage {
    comments: Comment[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    size: number;
    totalElements: number;
    totalPages: number;
}
