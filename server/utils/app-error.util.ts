export enum ErrorStatus {
	FAIL = 'fail',
	ERROR = 'error',
}

export class AppError extends Error {
	public status: ErrorStatus;
	public isOperational: boolean;

	constructor(public message: string, public statusCode: number) {
		super();
		this.status = `${statusCode}`.startsWith('4')
			? ErrorStatus.FAIL
			: ErrorStatus.ERROR;
		this.isOperational = true;
	}
}
