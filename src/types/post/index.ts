export interface AddPost {
    title: string,
    description: string,
    preview: string,
    thumbnail: string,
}

export interface IPost {
    id: number;
    title: string;
    preview: string;
    description: string;
    thumbnail: string;
    created_at: Date;
    updated_at?: Date;
    deleted_at?: any;
    comments_count?: number;
}
