import {IUser} from '../../server/models';
import {UserDetail} from '../../types';

declare global {
	declare namespace Express {
		export interface Request {
			userDetail?: UserDetail;
			user?: IUser;
			clientIp?: string;
		}
	}
}
