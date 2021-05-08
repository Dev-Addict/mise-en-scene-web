import {Request as ERequest} from 'express';

import {IUser} from '../models';
import {UserDetail} from '../../types';

export interface Request extends ERequest {
	userDetail?: UserDetail;
	user?: IUser;
	clientIp?: string;
}
