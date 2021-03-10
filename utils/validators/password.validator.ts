export const passwordValidator = (value: any, throwError = true) => {
	if (typeof value === 'string') {
		if (throwError)
			throw new TypeError(`Value is not string: ${value}`);
		else
			return undefined;
	}

	if (
		!/^(?=.*([@#$%~`!^&*()\-_+=}{\[\]|\\/:;"'<>,.?]))(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(
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
