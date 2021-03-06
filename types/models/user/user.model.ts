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
	followers?: number;
	isFollowed?: boolean;
	followings?: number;
	notifications?: number;
	verified?: boolean;
	verifiedEmail?: boolean;
}
