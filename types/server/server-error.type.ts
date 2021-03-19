import {ServerErrorType} from './enums';
import {errors} from '../../data';

export type ServerError = {
	code: number;
} & (
	| {
			message: keyof typeof errors;
			type: typeof ServerErrorType.ONE;
	  }
	| {
			message: (keyof typeof errors)[];
			type: typeof ServerErrorType.TWO;
	  }
	| {
			message: keyof typeof errors;
			detail: {
				value: string;
				path: string;
			};
			type: typeof ServerErrorType.THREE;
	  }
	| {
			message: keyof typeof errors;
			field: string;
			type: typeof ServerErrorType.FOUR;
	  }
);
