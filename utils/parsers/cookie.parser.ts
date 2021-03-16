export const cookieParser = (cookie: string) =>
	cookie
		.split(';')
		.map((cookie) => cookie.split('='))
		.reduce(
			(result, current) => {
				result[decodeURIComponent(current[0].trim())] = decodeURIComponent(
					current[1].trim()
				);

				return result;
			},
			{} as {
				[key: string]: string;
			}
		);
