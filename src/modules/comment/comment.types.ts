export type CreateCommentBody = {
	imageUrl?: string;
	content?: string;
	authorId: number;
	targetId: number;
	type: string;
	parantCommentId?: number;
};
