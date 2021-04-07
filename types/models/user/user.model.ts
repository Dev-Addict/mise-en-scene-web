import {Gender} from '../../enums';

export interface User {
	id?: string;
	firstname?: string;
	lastname?: string;
	email?: string;
	password?: string;
	avatar?: string;
	birthday?: number;
	gender?: Gender;
	username?: string;
	bio?: string;
	displayName?: string;
}
