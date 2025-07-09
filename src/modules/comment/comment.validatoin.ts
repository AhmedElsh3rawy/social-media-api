import { z } from "zod";

const allowed = ["post", "share", "comment"];

export const createCommentSchema = z.object({
	authorId: z.coerce
		.number({ message: "Author Id must be a number." })
		.gt(0, { message: "Author Id must be greater than 0." }),
	targetId: z.coerce
		.number({ message: "Target Id must be a number." })
		.gt(0, { message: "Target Id must be greater than 0." }),
	type: z.string().refine((val) => allowed.includes(val), {
		message: `Must be one of: ${allowed.join(", ")}`,
	}),
});
