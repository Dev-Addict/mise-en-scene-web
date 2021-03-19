import {compileError} from './compile-error.util';
import {ApolloError} from 'apollo-server-errors';
import {ErrorStatus} from '../../utils';

export const formatError = (error: any) => {
	if (process.env.NODE_ENV !== 'production')
		console.log(JSON.stringify(error, null, 2));

	const formattedError = compileError(error);

	const message =
		formattedError.message instanceof Array
			? formattedError.message.join(' ')
			: formattedError.message;

	const status = `${formattedError.code}`.startsWith('4')
		? ErrorStatus.FAIL
		: ErrorStatus.ERROR;

	return new ApolloError(message, status, formattedError);
};
