import {errors} from '../../data';

export enum ErrorStatus {
	FAIL = 'fail',
	ERROR = 'error',
}

export class AppError extends Error {
	public status: ErrorStatus;
	public isOperational: boolean;

	constructor(public message: keyof typeof errors, public statusCode: number) {
		super();
		this.status = `${statusCode}`.startsWith('4')
			? ErrorStatus.FAIL
			: ErrorStatus.ERROR;
		this.isOperational = true;
	}
}
