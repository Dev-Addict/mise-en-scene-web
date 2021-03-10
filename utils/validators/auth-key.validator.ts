export const authKeyValidator = (value: any, throwError = true) => {
	if (typeof value !== 'string') {
		if (throwError)
			throw new TypeError(`Value is not string: ${value}`);
		else
			return undefined;
	}

	if (
		!/^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(
			value,
		) &&
		!/^[a-z0-9_]{4,}$/.test(
			value,
		)
	) {
		if (throwError)
			throw new TypeError(`Value is not a valid auth key: ${value}`);
		else
			return undefined;
	}

	return value;
};
