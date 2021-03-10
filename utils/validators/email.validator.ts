export const emailValidator = (value: any, throwError = true) => {
	if (typeof value !== 'string') {
		if (throwError)
			throw new TypeError(`Value is not string: ${value}`);
		else
			return undefined;
	}

	if (
		!/^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(
			value,
		)
	) {
		if (throwError)
			throw new TypeError(`Value is not a valid email: ${value}`);
		else
			return undefined;
	}

	return value;
};
