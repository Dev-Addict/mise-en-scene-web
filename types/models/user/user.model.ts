import {Gender} from '../../enums';
import {None} from '../../none.type';

export interface User {
	id?: string;
	firstname?: None<string>;
	lastname?: None<string>;
	email?: string;
	avatar?: string;
	birthday?: None<number>;
	gender?: None<Gender>;
	username?: string;
	bio?: None<string>;
	displayName?: None<string>;
}
