import { z } from "zod";
import { db } from "../../config/database/db";
import { users } from "../../config/database/schema/user";
import { eq } from "drizzle-orm";

export const registerSchema = z.object({
	name: z
		.string()
		.min(2, { message: "Name should be at least 2 characters." })
		.max(30, { message: "Name should be 15 characters at most." }),
	email: z
		.string()
		.email({ message: "Enter a valid email." })
		.refine(
			async (email) => {
				const res = await db.select().from(users).where(eq(users.email, email));
				return res.length === 0;
			},
			{ message: "Email is used by another user." },
		),
	password: z
		.string()
		.min(8, { message: "Password must be 8 characters at least." })
		.max(20, { message: "Password must be 20 characters at most." }),
});

export const loginSchema = z.object({
	email: z.string().email({ message: "Enter a valid email." }),
	password: z
		.string()
		.min(8, { message: "Password must be 8 characters at least." })
		.max(20, { message: "Password must be 20 characters at most." }),
});
