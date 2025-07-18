export type CreateShareBody = {
	content?: string;
	imageUrl?: string;
	authorId: number;
	postId: number;
};

export type UpdateShareBody = {
	content?: string;
	imageUrl?: string;
};
