import {Request as ERequest} from 'express';
import {IUser} from '../models';

export interface Request extends ERequest {
	user?: IUser;
}
