export const integerValidator = (value: any, throwError = true) => {
	if (typeof value !== 'number') {
		if (throwError) throw new TypeError(`Value is not number: ${value}`);
		else return undefined;
	}

	if (Math.floor(value) !== value) {
		if (throwError)
			throw new TypeError(`Value is not a valid integer: ${value}`);
		else return undefined;
	}

	return value;
};
