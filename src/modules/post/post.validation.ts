import { z } from "zod";

export const createPostSchema = z.object({
	content: z
		.string()
		.min(1, { message: "Content should be at least 1 character." }),
});
