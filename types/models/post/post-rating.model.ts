import {Post} from './post.model';
import {User} from '../user';

export interface PostRating {
	id?: string;
	post?: string;
	postData?: Post;
	user?: string;
	userData?: User;
	rating?: number;
	ratedAt?: Date;
}
