export type CreatePostBody = {
	content?: string;
	imageUrl?: string;
	authorId: number;
};

export type updatePostBody = {
	content?: string;
	imageUrl: string;
};
