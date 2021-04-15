export const nameValidator = (value: any, throwError = true) => {
	if (typeof value !== 'string') {
		if (throwError) throw new TypeError(`Value is not string: ${value}`);
		else return undefined;
	}

	if (!/^(?!.*\d)[a-z\u0600-\u06FF\s]+$/iu.test(value)) {
		if (throwError) throw new TypeError(`Value is not a valid email: ${value}`);
		else return undefined;
	}

	return value;
};
