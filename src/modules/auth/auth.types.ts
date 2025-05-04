export type RegisterBody = {
	name: string;
	email: string;
	password: string;
	imageUrl?: string;
};

export type LoginBody = {
	email: string;
	password: string;
};
