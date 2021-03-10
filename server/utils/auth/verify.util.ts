import {verify as jwtVerify} from 'jsonwebtoken';

export const verify = <
	T extends {
		[key: string]: any;
	}
>(
	token: string,
	key: string
): Promise<T> =>
	new Promise((resolve, reject) => {
		jwtVerify(token, key, (err, decoded) => {
			if (err) reject(err);
			resolve(<T>decoded);
		});
	});
