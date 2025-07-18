import { z } from "zod";

export const createShareSchema = z.object({
	authorId: z.coerce
		.number({ message: "authorId must be a number." })
		.gt(0, { message: "authorId must be greater than 0." }),

	postId: z.coerce
		.number({ message: "postId must be a number." })
		.gt(0, { message: "postId must be greater than 0." }),
});
