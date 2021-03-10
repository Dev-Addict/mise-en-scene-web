import {Document} from 'mongoose';

export interface AnyModel extends Document {
	[key: string]: any;
}
