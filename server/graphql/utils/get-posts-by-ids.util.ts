import {Model} from 'mongoose';

import {IPost} from '../../models';

export const getPostsByIds = async (Post: Model<IPost>, ids: string[]) => {
	const posts: IPost[] = [];

	for (const id of ids) {
		const post = await Post.findById(id);

		if (post) posts.push(post);
	}

	return posts;
};
