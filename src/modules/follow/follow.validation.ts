import { z } from "zod";

export const followSchema = z.object({
	id: z.coerce
		.number({ message: "Id must be a number." })
		.gt(0, { message: "Id must be greater than 0." }),
});
