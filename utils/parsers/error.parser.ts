import {ServerError, ServerErrorType} from '../../types';
import {errorFields, errors} from '../../data';

export const errorParser = (serverErrors: ServerError[]): string[] => {
	const parsedErrors: string[] = [];

	for (const error of serverErrors)
		switch (error.type) {
			case ServerErrorType.ONE:
				parsedErrors.push(errors[error.message]);
				break;
			case ServerErrorType.TWO:
				parsedErrors.push(...error.message.map((error) => errors[error]));
				break;
			case ServerErrorType.THREE:
				parsedErrors.push(`متاسفانه نوع وارد شده نامناسب است.`);
				break;
			case ServerErrorType.FOUR:
				parsedErrors.push(
					`${errorFields[error.field] || error.field} تکراری است.`
				);
				break;
			default:
				parsedErrors.push('خظایی نامشخص رخ داده است.');
		}

	return parsedErrors;
};
