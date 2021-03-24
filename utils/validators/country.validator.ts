import {countries} from '../../data';

export const countryValidator = (value: any, throwError = true) => {
	if (typeof value !== 'string') {
		if (throwError) throw new TypeError(`Value is not string: ${value}`);
		else return undefined;
	}

	if (!countries.map(({countryCode}) => countryCode).includes(value)) {
		if (throwError)
			throw new TypeError(`Value is not a valid country: ${value}`);
		else return undefined;
	}

	return value;
};
