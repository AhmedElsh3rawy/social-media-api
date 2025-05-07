import { z } from "zod";

export const getByIdSchema = z.object({
	id: z.coerce
		.number({ message: "Id must be a number." })
		.gt(0, { message: "Id must be greater than 0." }),
});

export const getByEmailSchema = z.object({
	email: z.string().email({ message: "Enter a valid email." }),
});
