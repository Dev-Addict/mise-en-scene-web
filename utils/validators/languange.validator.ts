import {languageCodes} from '../../data';

export const languageValidator = (value: any, throwError = true) => {
	if (typeof value !== 'string') {
		if (throwError) throw new TypeError(`Value is not string: ${value}`);
		else return undefined;
	}

	if (!languageCodes.includes(value)) {
		if (throwError)
			throw new TypeError(`Value is not a valid language: ${value}`);
		else return undefined;
	}

	return value;
};
