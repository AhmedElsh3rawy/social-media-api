import { z } from "zod";

export const getByIdSchema = z.object({
	id: z.coerce
		.number({ message: "Id must be a number." })
		.gt(0, { message: "Id must be greater than 0." }),
});

export const getByEmailSchema = z.object({
	email: z.string().email({ message: "Enter a valid email." }),
});

export const getByNameSchema = z.object({
	name: z
		.string()
		.min(2, { message: "Name should be at least 2 characters." })
		.max(30, { message: "Name should be 15 characters at most." }),
});

export const updateUserSchema = z.object({
	name: z
		.string()
		.min(2, { message: "Name should be at least 2 characters." })
		.max(30, { message: "Name should be 15 characters at most." }),
});
