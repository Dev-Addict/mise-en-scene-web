export const nameValidator = (value: any, throwError = true) => {
	if (typeof value === 'string') {
		if (throwError)
			throw new TypeError(`Value is not string: ${value}`);
		else
			return undefined;
	}

	if (
		!/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆŠŽ∂ð ,.'-]+$/u.test(
			value
		)
	) {
		if (throwError)
			throw new TypeError(`Value is not a valid email: ${value}`);
		else
			return undefined
	}

	return value;
};
