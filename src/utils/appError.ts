class AppError extends Error {
	statusCode: number;
	statusText: string;
	constructor(message: string, statusCode: number) {
		super(message);
		this.statusCode = statusCode;
		this.statusText =
			statusCode === 400
				? "Bad request"
				: statusCode === 401
					? "Unauthorized"
					: statusCode === 403
						? "Forbidden"
						: statusCode === 404
							? "Not Found"
							: "Internal Server Error";
	}
}

export default AppError;
