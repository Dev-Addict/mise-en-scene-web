import {GraphQLError} from 'graphql';

import {AppError} from '../../utils';
import {ServerError, ServerErrorType} from '../../../types';

export const compileError = (error: GraphQLError): ServerError => {
	try {
		const err = error.extensions!.exception!;

		if (err.isOperational)
			return {
				message: (<AppError>err).message,
				code: (<AppError>err).statusCode,
				type: ServerErrorType.ONE,
			};
		if (err.name === 'CastError')
			return {
				message: '0xE00000E',
				detail: {
					value: err.value,
					path: err.path,
				},
				code: 400,
				type: ServerErrorType.THREE,
			};
		if (err.code === 11000) {
			return {
				field: Object.keys(err.keyValue)[0] as string,
				message: '0xE00000F',
				code: 400,
				type: ServerErrorType.FOUR,
			};
		}
		if (err.name === 'ValidationError')
			return {
				message: Object.values(err.errs).map(({errmsg}: any) =>
					errmsg.match(/0xE[A-F0-9]{6}/)
				),
				code: 400,
				type: ServerErrorType.TWO,
			};
		if (err.name === 'JsonWebTokenError')
			return {
				message: '0xE000010',
				code: 401,
				type: ServerErrorType.ONE,
			};
		if (err.name === 'TokenExpiredError')
			return {
				message: '0xE000011',
				code: 401,
				type: ServerErrorType.ONE,
			};
	} catch (e) {
		return {
			message: '0xE000012',
			code: 500,
			type: ServerErrorType.ONE,
		};
	}
	return {
		message: '0xE000012',
		code: 500,
		type: ServerErrorType.ONE,
	};
};
